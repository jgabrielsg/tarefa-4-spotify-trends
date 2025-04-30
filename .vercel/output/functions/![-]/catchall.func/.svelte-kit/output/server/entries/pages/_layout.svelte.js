import { D as getContext, E as store_get, F as ensure_array_like, G as attr, I as attr_class, J as escape_html, K as slot, M as unsubscribe_stores, C as pop, z as push } from "../../chunks/index.js";
import "../../chunks/client.js";
import { b as base } from "../../chunks/paths.js";
const getStores = () => {
  const stores$1 = getContext("__svelte__");
  return {
    /** @type {typeof page} */
    page: {
      subscribe: stores$1.page.subscribe
    },
    /** @type {typeof navigating} */
    navigating: {
      subscribe: stores$1.navigating.subscribe
    },
    /** @type {typeof updated} */
    updated: stores$1.updated
  };
};
const page = {
  subscribe(fn) {
    const store = getStores().page;
    return store.subscribe(fn);
  }
};
function _layout($$payload, $$props) {
  push();
  var $$store_subs;
  let pages = [
    { url: "/", title: "Home" },
    { url: "/chart", title: "Chart" },
    {
      url: "https://github.com/FGV-VIS-2025/tarefa-4-spotify-trends",
      title: "Github"
    }
  ];
  let currentPage = store_get($$store_subs ??= {}, "$page", page).route.id;
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
  currentPage = store_get($$store_subs ??= {}, "$page", page).route.id;
  const each_array = ensure_array_like(pages);
  $$payload.out += `<aside class="sidebar svelte-1anvl6"><div class="logo svelte-1anvl6"><img src="/images/coldplaylogo.jpg" alt="Logo" class="svelte-1anvl6"></div> <nav class="nav-links svelte-1anvl6"><!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let page2 = each_array[$$index];
    $$payload.out += `<a${attr("href", page2.url.startsWith("http") ? page2.url : `${base}${page2.url}`)}${attr_class("svelte-1anvl6", void 0, { "current": currentPage === page2.url })}>${escape_html(page2.title)}</a>`;
  }
  $$payload.out += `<!--]--></nav> <div class="themeSwitcher svelte-1anvl6"><button class="svelte-1anvl6">`;
  if (colorScheme === "light") {
    $$payload.out += "<!--[-->";
    $$payload.out += `☀️ Light`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `🌙 Dark`;
  }
  $$payload.out += `<!--]--></button></div></aside> <main class="content svelte-1anvl6"><!---->`;
  slot($$payload, $$props, "default", {});
  $$payload.out += `<!----></main>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
export {
  _layout as default
};
