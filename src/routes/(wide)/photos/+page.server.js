export async function load(event) {
    const photosData = await event.locals.sanityClient.fetch("*[_type == 'photo']{ 'url': photo.asset->url, 'preview': photo.asset->metadata.lqip , 'width': photo.asset->metadata.dimensions.width, 'height': photo.asset->metadata.dimensions.height, 'sha1': photo.asset->sha1hash}");

    return {
        title: "photos i took",
        photos: photosData.map((photo) => ({
            url: photo.url,
            preview: photo.preview,
            width: photo.width,
            height: photo.height,
            id: photo.sha1
        }))
    }
}