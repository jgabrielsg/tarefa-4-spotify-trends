import { P as head } from "../../chunks/index.js";
import "d3";
/* empty css                                               */
function _page($$payload) {
  head($$payload, ($$payload2) => {
    $$payload2.title = `<title>Spotify Trends - Home</title>`;
  });
  $$payload.out += `<section class="home-container svelte-188acc2"><div class="welcome svelte-188acc2"><h1 class="svelte-188acc2">Spotify Trends</h1> <p class="svelte-188acc2">Descubra as músicas mais ouvidas no mundo e no Brasil!</p> <a href="./chart" class="start-button svelte-188acc2">Explorar Rankings</a></div></section>`;
}
export {
  _page as default
};
