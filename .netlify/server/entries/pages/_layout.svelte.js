import { c as create_ssr_component, b as subscribe, e as each, d as add_attribute, f as escape } from "../../chunks/ssr.js";
import { p as page } from "../../chunks/stores.js";
import { b as base } from "../../chunks/paths.js";
const _layout_svelte_svelte_type_style_lang = "";
const css = {
  code: ".content.svelte-1anvl6.svelte-1anvl6{margin-left:18%;width:82%}.sidebar.svelte-1anvl6.svelte-1anvl6{position:fixed;display:flex;flex-direction:column;justify-content:flex-start;top:0;left:0;height:100%;width:18%;padding:2rem 1rem;background-color:#000000;color:white;box-shadow:5px -5px 5px rgba(0, 0, 0, 0.2)}.logo.svelte-1anvl6.svelte-1anvl6{display:flex;justify-content:center;align-items:center;height:130px}.logo.svelte-1anvl6 img.svelte-1anvl6{width:100%;height:100%;object-fit:contain}.nav-links.svelte-1anvl6.svelte-1anvl6{display:flex;flex-direction:column;align-items:center}.nav-links.svelte-1anvl6 a.svelte-1anvl6{text-decoration:none;font-size:1.3rem;color:inherit;margin:1rem 0}.nav-links.svelte-1anvl6 a.current.svelte-1anvl6{font-weight:bold;border-bottom:2px solid white;padding-bottom:5px}.themeSwitcher.svelte-1anvl6.svelte-1anvl6{text-align:center;margin-top:2rem}.themeSwitcher.svelte-1anvl6 button.svelte-1anvl6{background:none;border:1px solid white;color:white;padding:0.5rem 1rem;border-radius:10px;cursor:pointer;transition:background-color 0.3s;font-size:1rem}.themeSwitcher.svelte-1anvl6 button.svelte-1anvl6:hover{background-color:rgba(255, 255, 255, 0.1)}.themeSwitcher.svelte-1anvl6 button.svelte-1anvl6{background:none;border:1px solid white;color:white;padding:0.5rem 1rem;border-radius:10px;cursor:pointer;transition:background-color 0.3s}.themeSwitcher.svelte-1anvl6 button.svelte-1anvl6:hover{background-color:rgba(255, 255, 255, 0.1)}@media(max-width: 920px){.sidebar.svelte-1anvl6.svelte-1anvl6{width:200px}}@media(max-width: 560px){.sidebar.svelte-1anvl6.svelte-1anvl6{width:100%;height:auto;position:relative}.content.svelte-1anvl6.svelte-1anvl6{margin-left:0;width:100%}}",
  map: null
};
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let pages = [
    { url: "/", title: "Home" },
    { url: "/chart", title: "Chart" },
    {
      url: "https://github.com/FGV-VIS-2025/tarefa-4-spotify-trends",
      title: "Github"
    }
  ];
  let currentPage = $page.route.id;
  let colorScheme = "light";
  if (typeof localStorage !== "undefined") {
    colorScheme = localStorage.getItem("colorScheme") ?? "light";
  }
  function applyTheme() {
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-theme", colorScheme);
      document.documentElement.style.colorScheme = colorScheme;
    }
  }
  applyTheme();
  $$result.css.add(css);
  currentPage = $page.route.id;
  $$unsubscribe_page();
  return `<aside class="sidebar svelte-1anvl6"><div class="logo svelte-1anvl6" data-svelte-h="svelte-11nl4vp"><img src="images/spotifylogo.png" alt="Logo" class="svelte-1anvl6"></div> <nav class="nav-links svelte-1anvl6">${each(pages, (page2) => {
    return `<a${add_attribute(
      "href",
      page2.url.startsWith("http") ? page2.url : `${base}${page2.url}`,
      0
    )} class="${["svelte-1anvl6", currentPage === page2.url ? "current" : ""].join(" ").trim()}">${escape(page2.title)} </a>`;
  })}</nav> <div class="themeSwitcher svelte-1anvl6"><button class="svelte-1anvl6">${colorScheme === "light" ? `☀️ Light` : `🌙 Dark`}</button></div></aside> <main class="content svelte-1anvl6">${slots.default ? slots.default({}) : ``} </main>`;
});
export {
  Layout as default
};
