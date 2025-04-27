<script>
    import { base } from "$app/paths";

    let localStorage = globalThis.localStorage ?? {};
    let colorScheme = localStorage.colorScheme ?? "dark";
    let root = globalThis?.document?.documentElement;

    $: root?.style.setProperty("color-scheme", colorScheme);
    $: localStorage.colorScheme = colorScheme;
</script>

<aside class="sidebar">
    <div class="logo">
        <img src="images/spotifylogo.png" alt="Logo" />
    </div>
</aside>

<main class="content">
    <slot></slot>
</main>

<style>
    :root {
        --spotify-green: #1DB954;
        --sidebar-bg: #000000;
        --text-color: #b3b3b3;
        --text-color-hover: #ffffff;
    }

    body {
        margin: 0;
        background-color: #121212;
        color: var(--text-color);
        font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    }

    .content {
        margin-left: 240px; /* Sidebar fixo 240px */
        padding: 20px;
    }

    .sidebar {
        position: fixed;
        display: flex;
        flex-direction: column;
        top: 0;
        left: 0;
        height: 100%;
        width: 240px;
        background-color: var(--sidebar-bg);
        padding: 20px 0;
        box-sizing: border-box;
    }

    .logo {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 20px;
        padding: 0 20px;
    }

    .logo img {
        width: 70%;
        object-fit: contain;
    }

    nav ul {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    nav ul li {
        padding: 12px 20px;
    }

    nav ul li a {
        display: block;
        text-decoration: none;
        font-size: 1rem;
        color: var(--text-color);
        font-weight: 600;
        transition: color 0.3s;
    }

    nav ul li a:hover,
    nav ul li a.current {
        color: var(--text-color-hover);
    }

    nav ul li a.current::after {
        content: '';
        display: block;
        margin-top: 6px;
        width: 30px;
        height: 2px;
        background-color: var(--spotify-green);
    }

    .socioHome {
        margin-top: auto;
        text-align: center;
        padding: 20px;
        font-size: 0.9rem;
        color: var(--text-color);
    }

    /* Responsividade */
    @media screen and (max-width: 768px) {
        .sidebar {
            width: 200px;
        }

        .content {
            margin-left: 200px;
        }
    }

    @media screen and (max-width: 560px) {
        .sidebar {
            width: 100%;
            height: auto;
            position: relative;
            flex-direction: row;
            justify-content: space-around;
        }

        .content {
            margin-left: 0;
            padding-top: 100px;
        }
    }
</style>
