import { c as create_ssr_component, h as createEventDispatcher, d as add_attribute, e as each, f as escape, v as validate_component } from "../../../chunks/ssr.js";
import * as d3 from "d3";
/* empty css                                                   */const css$1 = {
  code: "svg.svelte-b2alrm{border-radius:8px;box-shadow:0 4px 12px rgba(0,0,0,0.1);background:#121212;transition:background 0.3s ease}",
  map: null
};
const width = 1e3;
const height = 600;
const Chart = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data = [] } = $$props;
  let { limit = 10 } = $$props;
  let nodes = [];
  let images = {};
  let hoveredId = null;
  let selectedId = null;
  createEventDispatcher();
  async function fetchThumbnail(trackId) {
    if (!trackId)
      return null;
    if (images[trackId])
      return images[trackId];
    try {
      const response = await fetch(`/chart?thumbnail=true&trackId=${trackId}`);
      if (response.ok) {
        const json = await response.json();
        images[trackId] = json.thumbnail;
        return json.thumbnail;
      }
    } catch (error) {
      console.error("Erro ao buscar thumbnail:", error);
    }
    return null;
  }
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  if ($$props.limit === void 0 && $$bindings.limit && limit !== void 0)
    $$bindings.limit(limit);
  $$result.css.add(css$1);
  {
    if (data.length > 0) {
      const parsed = data.map((d) => ({ ...d, total_streams: +d.total_streams })).filter((d) => !isNaN(d.total_streams) && d.total_streams > 0).sort((a, b) => b.total_streams - a.total_streams);
      const grouped = d3.group(parsed, (d) => d.artist);
      const treeData = {
        children: Array.from(grouped, ([artist, songs]) => ({ name: artist, children: songs }))
      };
      const root = d3.hierarchy(treeData).sum((d) => d.total_streams).sort((a, b) => b.value - a.value);
      d3.treemap().size([width, height]).paddingInner(2).paddingOuter(4)(root);
      Promise.all(root.leaves().map(async (node) => {
        const thumbnail = await fetchThumbnail(node.data.trackId);
        if (thumbnail) {
          node.data.thumbnail = thumbnail;
        }
        return node;
      })).then((finalNodes) => {
        nodes = finalNodes.slice(0, limit);
      });
    }
  }
  return `<svg${add_attribute("width", width, 0)}${add_attribute("height", height, 0)} xmlns="http://www.w3.org/2000/svg" class="svelte-b2alrm"><defs>${each(nodes, (node) => {
    return `<clipPath${add_attribute("id", `clip-${node.data.trackId}`, 0)}><rect x="0" y="0"${add_attribute("width", node.x1 - node.x0, 0)}${add_attribute("height", node.y1 - node.y0, 0)}></rect></clipPath>`;
  })}</defs>${each(nodes, (node) => {
    return `<g${add_attribute("transform", `translate(${node.x0},${node.y0})`, 0)} style="cursor: pointer;"${add_attribute("clip-path", `url(#clip-${node.data.trackId})`, 0)}><rect${add_attribute("width", node.x1 - node.x0, 0)}${add_attribute("height", node.y1 - node.y0, 0)} fill="#222"${add_attribute(
      "stroke",
      hoveredId === node.data.trackId || selectedId === node.data.trackId ? "#1DB954" : "#aaa",
      0
    )}${add_attribute(
      "stroke-width",
      hoveredId === node.data.trackId || selectedId === node.data.trackId ? 3 : 1,
      0
    )} style="transition: all 0.2s ease;"></rect>${node.data.thumbnail ? `<image${add_attribute("href", node.data.thumbnail, 0)}${add_attribute("width", node.x1 - node.x0, 0)}${add_attribute("height", node.y1 - node.y0, 0)} preserveAspectRatio="xMidYMid slice"></image>` : ``}<rect${add_attribute("width", node.x1 - node.x0, 0)}${add_attribute("height", node.y1 - node.y0, 0)}${add_attribute(
      "fill",
      hoveredId === node.data.trackId || selectedId === node.data.trackId ? "rgba(0,0,0,0.2)" : "rgba(0,0,0,0.7)",
      0
    )} style="transition: all 0.2s ease;"></rect>${node.x1 - node.x0 > 60 && node.y1 - node.y0 > 40 ? `<text${add_attribute("x", (node.x1 - node.x0) / 2, 0)}${add_attribute("y", (node.y1 - node.y0) / 2 - 5, 0)} fill="white" font-size="10" text-anchor="middle" font-weight="bold" style="text-shadow: 0 1px 2px rgba(0,0,0,0.8);">${escape(node.data.title)}</text> <text${add_attribute("x", (node.x1 - node.x0) / 2, 0)}${add_attribute("y", (node.y1 - node.y0) / 2 + 10, 0)} fill="#1DB954" font-size="9" text-anchor="middle" style="text-shadow: 0 1px 2px rgba(0,0,0,0.8);">${escape(node.data.total_streams.toLocaleString())} streams
        </text>` : ``}</g>`;
  })}${each(Array.from(new Set(nodes.map((n) => n.parent))), (parent) => {
    return `${parent ? `<g${add_attribute("transform", `translate(${parent.x0},${parent.y0})`, 0)}><rect${add_attribute("width", parent.x1 - parent.x0, 0)}${add_attribute("height", parent.y1 - parent.y0, 0)} fill="none" stroke="#1DB954" stroke-width="3" style="transition: all 0.3s ease;"></rect>${parent.x1 - parent.x0 > 100 && parent.y1 - parent.y0 > 40 && parent.children.length > 1 ? `<text${add_attribute("x", (parent.x1 - parent.x0) / 2, 0)} y="15" fill="#1DB954" font-size="12" font-weight="bold" text-anchor="middle" style="text-shadow: 0 1px 2px black;">${escape(parent.data.name)}</text>` : ``}</g>` : ``}`;
  })}</svg>`;
});
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: ".filters.svelte-10oxxhb.svelte-10oxxhb{display:flex;gap:10px;margin-bottom:1rem;align-items:center;flex-wrap:wrap}.filters.svelte-10oxxhb input.svelte-10oxxhb{flex:1;padding:0.75rem 1rem;background-color:#121212;color:white;border:none;border-radius:500px;font-size:14px;outline:none;min-width:200px}.filters.svelte-10oxxhb input.svelte-10oxxhb::placeholder{color:#b3b3b3}.filters.svelte-10oxxhb input.svelte-10oxxhb:focus{background-color:#2a2a2a}.filters.svelte-10oxxhb input.svelte-10oxxhb{box-shadow:inset 0 0 0 1px #535353}.grid.svelte-10oxxhb.svelte-10oxxhb{display:flex;flex-wrap:wrap;gap:10px}.card.svelte-10oxxhb.svelte-10oxxhb{width:150px;padding:10px;border:1px solid #ddd;border-radius:8px;text-align:center;cursor:pointer;transition:.2s}.card.svelte-10oxxhb.svelte-10oxxhb:hover{background:#f0f0f0}.chart-container.svelte-10oxxhb.svelte-10oxxhb{margin-bottom:2rem;padding:1rem;border:1px solid #eee;border-radius:8px}",
  map: null
};
function formatDate(str) {
  return str.split("T")[0];
}
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let start = "";
  let end = "";
  let title = "";
  let artist = "";
  let region = "";
  let rank = "";
  let limit = 10;
  let datajson = [];
  let datagraph = [];
  $$result.css.add(css);
  return `${$$result.head += `<!-- HEAD_svelte-pxk7jv_START -->${$$result.title = `<title>Charts Top</title>`, ""}<!-- HEAD_svelte-pxk7jv_END -->`, ""} <div class="filters svelte-10oxxhb"><input type="date" placeholder="Data início" class="svelte-10oxxhb"${add_attribute("value", start, 0)}> <input type="date" placeholder="Data fim" class="svelte-10oxxhb"${add_attribute("value", end, 0)}> <input placeholder="Música" class="svelte-10oxxhb"${add_attribute("value", title, 0)}> <input placeholder="Artista" class="svelte-10oxxhb"${add_attribute("value", artist, 0)}> <input placeholder="Região" class="svelte-10oxxhb"${add_attribute("value", region, 0)}> <input placeholder="Rank (intervalo '1-50')" class="svelte-10oxxhb"${add_attribute("value", rank, 0)}> <input placeholder="Qtd. Músicas" type="number" min="1" class="svelte-10oxxhb"${add_attribute("value", limit, 0)}></div> ${` <div class="chart-container svelte-10oxxhb"><h2 data-svelte-h="svelte-1grg27v">Top Músicas por Streams</h2> ${validate_component(Chart, "Chart").$$render($$result, { data: datagraph, limit }, {}, {})}</div>  <div class="grid svelte-10oxxhb">${each(datajson, ({ date, rank: rank2, title: title2, artist: artist2, region: region2, trackId }) => {
    return `<div class="card svelte-10oxxhb"><small>${escape(formatDate(date))} – #${escape(rank2)}</small><br> <strong>${escape(title2)}</strong><br> <small>${escape(artist2)};</small> <small>${escape(region2)}</small> </div>`;
  })}</div>`} ${``}`;
});
export {
  Page as default
};
