import { c as create_ssr_component } from "../../chunks/ssr.js";
import "d3";
/* empty css                                                */const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: ".home-container.svelte-188acc2{display:flex;align-items:center;justify-content:center;height:75vh;background:linear-gradient(135deg, #1DB954 0%, #191414 100%);color:white;text-align:center}.welcome.svelte-188acc2{display:flex;flex-direction:column;align-items:center;gap:1rem}h1.svelte-188acc2{font-size:3rem;margin-bottom:0.5rem}p.svelte-188acc2{font-size:1.5rem;max-width:800px}.start-button.svelte-188acc2{margin-top:2rem;padding:1rem 2rem;background-color:#191414;color:#1DB954;border:2px solid #1DB954;border-radius:9999px;font-size:1.2rem;transition:all 0.3s ease;text-decoration:none}.start-button.svelte-188acc2:hover{background-color:#1DB954;color:#191414}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `${$$result.head += `<!-- HEAD_svelte-9m6xbh_START -->${$$result.title = `<title>Spotify Trends - Home</title>`, ""}<!-- HEAD_svelte-9m6xbh_END -->`, ""} <section class="home-container svelte-188acc2" data-svelte-h="svelte-i583hu"><div class="welcome svelte-188acc2"><h1 class="svelte-188acc2">Spotify Trends</h1> <p class="svelte-188acc2">Descubra as músicas mais ouvidas no mundo e no Brasil!</p> <a href="/chart" class="start-button svelte-188acc2">Explorar Rankings</a></div> </section>`;
});
export {
  Page as default
};
