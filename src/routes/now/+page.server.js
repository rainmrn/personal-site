import { LASTFM_API_KEY, LASTFM_USERNAME } from '$env/static/private';

export async function load(event) {

    async function fetchLastFM(method, period, limit) {
        try {
            const response = await fetch(
                `https://ws.audioscrobbler.com/2.0/?method=${method}&user=${LASTFM_USERNAME}&period=${period}&limit=${limit}&api_key=${LASTFM_API_KEY}&format=json`,
            );
            if (!response.ok) {
                const data = await response.json();
                throw new Error(`${data.error}: ${data.message}`);
            }
            const data = await response.json();
            return data.topalbums.album;
        } catch (err) {
            console.log(err.message);
        }
    }

    const nowUpdateData = await event.locals.sanityClient
        .fetch("*[_type == 'nowUpdate'] | order(_createdAt desc)[0]")
        .catch((err) => { console.log("Fetch now update failed: ", err.message) });
    const topAlbumsData = await fetchLastFM("user.getTopAlbums", "7day", 6);

    if (!nowUpdateData || !topAlbumsData) {
        return {
            status: 404,
            error: new Error("Failed to fetch data!")
        }
    }

    return {
        nowUpdate: { date: nowUpdateData.date, content: nowUpdateData.updates, location: nowUpdateData.location },
        topAlbums: topAlbumsData.map(album => ({
            name: album.name,
            url: album.url,
            image: album.image[2]['#text']
        }))
    }
}

