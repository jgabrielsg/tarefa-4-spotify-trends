<script>
    import { page } from "$app/stores";
    import { base } from "$app/paths";

    let pages = [
        { url: "/", title: "Home" },
        { url: "/global", title: "Global" },
        { url: "/brasil", title: "Brasil" },
        { url: "https://github.com/FGV-VIS-2025/tarefa-4-spotify-trends", title: "Github" }
    ];

    let currentPage = $page.route.id;
    $: currentPage = $page.route.id;

    let colorScheme = 'light';
    
    if (typeof localStorage !== 'undefined') {
        colorScheme = localStorage.getItem('colorScheme') ?? 'light';
    }

    function applyTheme() {
        if (typeof document !== 'undefined') {
            document.documentElement.setAttribute('data-theme', colorScheme);
            document.documentElement.style.colorScheme = colorScheme;
        }
    }

    function toggleTheme() {
        colorScheme = colorScheme === 'light' ? 'dark' : 'light';
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem('colorScheme', colorScheme);
        }
        applyTheme();
    }

    applyTheme();
</script>

<aside class="sidebar">
    <div class="logo">
        <img src="images/spotifylogo.png" alt="Logo" />
    </div>

    <nav class="nav-links">
        {#each pages as page}
            <a href={page.url.startsWith("http") ? page.url : `${base}${page.url}`} class:current={currentPage === page.url}>
                {page.title}
            </a>
        {/each}
    </nav>

    <div class="themeSwitcher">
        <button on:click={toggleTheme}>
            {#if colorScheme === 'light'}
                ☀️ Light
            {:else}
                🌙 Dark
            {/if}
        </button>
    </div>
</aside>

<main class="content">
    <slot></slot>
</main>

<style>
    .content {
        margin-left: 18%;
        width: 82%;
    }

    .sidebar {
        position: fixed;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        top: 0;
        left: 0;
        height: 100%;
        width: 18%;
        padding: 2rem 1rem;
        background-color: #000000;
        color: white;
        box-shadow: 5px -5px 5px rgba(0, 0, 0, 0.2);
    }

    .logo {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 130px;
    }

    .logo img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }

    .nav-links {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .nav-links a {
        text-decoration: none;
        font-size: 1.3rem;
        color: inherit;
        margin: 1rem 0;
    }

    .nav-links a.current {
        font-weight: bold;
        border-bottom: 2px solid white;
        padding-bottom: 5px;
    }

    .themeSwitcher {
        text-align: center;
        margin-top: 2rem;
    }

    .themeSwitcher button {
        background: none;
        border: 1px solid white;
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 10px;
        cursor: pointer;
        transition: background-color 0.3s;
        font-size: 1rem;
    }

    .themeSwitcher button:hover {
        background-color: rgba(255, 255, 255, 0.1);
    }


    .themeSwitcher button {
        background: none;
        border: 1px solid white;
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 10px;
        cursor: pointer;
        transition: background-color 0.3s;
    }

    .themeSwitcher button:hover {
        background-color: rgba(255, 255, 255, 0.1);
    }

    /* Responsivo */
    @media (max-width: 920px) {
        .sidebar {
            width: 200px;
        }
    }

    @media (max-width: 560px) {
        .sidebar {
            width: 100%;
            height: auto;
            position: relative;
        }
        .content {
            margin-left: 0;
            width: 100%;
        }
    }
</style>
