<script>
    import { page } from "$app/stores";
    let { label } = $props();
</script>

<a
    href="/{label}"
    class="text-base font-medium font-display border-b-2 border-transparent
        text-gray-750 dark:text-gray-150
        hover:text-secondary-500 dark:hover:text-secondary-400
           flex-1
           hover:cursor-pointer
           hover:border-b-2 hover:text-secondary-50"
    aria-current={$page.url.pathname === `/${label}`}>{label}</a
>
