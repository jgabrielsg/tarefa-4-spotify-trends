<script>
    import { page } from "$app/stores";
    import { base } from "$app/paths";

    let pages = [
        { url: "/", title: "Home" },
        { url: "/global", title: "Global" },
        { url: "/brasil", title: "Brasil" },
        { url: "https://github.com/FGV-VIS-2025/tarefa-4-spotify-trends", title: "Github" }
    ];

    let localStorage = globalThis.localStorage ?? {};
    let colorScheme = localStorage.colorScheme ?? "light";
    let root = globalThis?.document?.documentElement;

    $: root?.style.setProperty("color-scheme", colorScheme);

    $: localStorage.colorScheme = colorScheme;

    let currentPage = $page.route.id;

    $: currentPage = $page.route.id;
</script>

<aside class="sidebar">
    <div class="logo">
        <img src="images/spotifylogo.png" alt="Logo" />
    </div>

    <nav>
        <ul>
            {#each pages as page}
                <li>
                    <a href={page.url.startsWith("http") ? page.url : `${base}${page.url}`} class:current={currentPage === page.url}>
                        {page.title}
                    </a>
                </li>
            {/each}
        </ul>
    </nav>

    <div class="socioHome">
        <p>Seja sócio!</p>
    </div>
</aside>

<main class="content">
    <slot></slot>
</main>

<style>
    .content {
        margin-left: 18%; /* conteúdo começa depois do sidebar */
        width: 82%; /* Ocupa os 82% restantes da largura */
    }

    .sidebar {
        position: fixed;
        display: flex;
        flex-direction: column;
        box-shadow: 5px -5px 5px rgba(0, 0, 0, 0.2); 
        top: 0;
        left: 0;
        height: 100%;
        width: 18%;
        padding-top: 4%;
        padding-bottom: 4%;
        background-color: var(--clube-logo-azul-4);
        color: white;
    }

    .logo {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 130px;
    }

    .logo img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }

    nav {
        display: flex;
        flex-direction: column;
    }

    nav ul {
        list-style-type: none;
        padding-left: 0;
        margin: 0;
    }

    nav ul li {
        display: flex;
        margin: 10% 14px;
        text-align: center;
    }

    nav ul li a {
        display: block;
        width: max-content;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        font-weight: 100;
        font-size: 1.3rem;
        letter-spacing: 1px;
        text-decoration: none;
        color: inherit;
        transition: color 300ms ease, transform 300ms ease;
    }

    /* Links ativos */
    nav ul li a.current {
        font-weight: bold;
    }

    nav ul li a::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 0.04em;
        background-color: rgba(255, 255, 255, 0.467);
        opacity: 0;
        transition: opacity 300ms, transform 300ms;
    }

    nav ul li a:hover::after,
    nav ul li a:focus::after {
        opacity: 1;
        transform: translate3d(0, 0.2em, 0);
    }

    .socioHome {
        margin-top: auto;
        text-align: center;
    }

    /* Responsividade */
    @media screen and (max-width: 920px) {
        .sidebar {
            width: 200px;
        }

        nav ul li a {
            font-size: 14px;
        }
    }

    @media screen and (max-width: 560px) {
        /* Adapte conforme necessário */
    }
</style>