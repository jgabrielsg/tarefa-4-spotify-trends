import { Q as fallback, F as ensure_array_like, G as attr, J as escape_html, R as bind_props, C as pop, z as push, P as head } from "../../../chunks/index.js";
import * as d3 from "d3";
/* empty css                                                  */
function Chart($$payload, $$props) {
  push();
  let data = fallback($$props["data"], () => [], true);
  let limit = fallback($$props["limit"], 10);
  let nodes = [];
  let hoveredId = null;
  let selectedId = null;
  const width = 1e3;
  const height = 600;
  if (data.length > 0) {
    const parsed = data.map((d) => ({ ...d, total_streams: +d.total_streams })).filter((d) => !isNaN(d.total_streams) && d.total_streams > 0).sort((a, b) => b.total_streams - a.total_streams);
    const grouped = d3.group(parsed, (d) => d.artist);
    const treeData = {
      children: Array.from(grouped, ([artist, songs]) => ({ name: artist, children: songs }))
    };
    const root = d3.hierarchy(treeData).sum((d) => d.total_streams).sort((a, b) => b.value - a.value);
    d3.treemap().size([width, height]).paddingInner(2).paddingOuter(4)(root);
    nodes = root.leaves().slice(0, limit);
  }
  const each_array = ensure_array_like(nodes);
  const each_array_1 = ensure_array_like(nodes);
  const each_array_2 = ensure_array_like(Array.from(new Set(nodes.map((n) => n.parent))));
  $$payload.out += `<svg${attr("width", width)}${attr("height", height)} xmlns="http://www.w3.org/2000/svg" class="svelte-b2alrm"><defs><!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let node = each_array[$$index];
    $$payload.out += `<clipPath${attr("id", `clip-${node.data.trackId}`)}><rect x="0" y="0"${attr("width", node.x1 - node.x0)}${attr("height", node.y1 - node.y0)}></rect></clipPath>`;
  }
  $$payload.out += `<!--]--></defs><!--[-->`;
  for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
    let node = each_array_1[$$index_1];
    $$payload.out += `<g${attr("transform", `translate(${node.x0},${node.y0})`)} style="cursor: pointer;"${attr("clip-path", `url(#clip-${node.data.trackId})`)}><rect${attr("width", node.x1 - node.x0)}${attr("height", node.y1 - node.y0)} fill="#222"${attr("stroke", hoveredId === node.data.trackId || selectedId === node.data.trackId ? "#1DB954" : "#aaa")}${attr("stroke-width", hoveredId === node.data.trackId || selectedId === node.data.trackId ? 3 : 1)} style="transition: all 0.2s ease;"></rect><image${attr("href", node.data.imageUrl)}${attr("width", node.x1 - node.x0)}${attr("height", node.y1 - node.y0)} preserveAspectRatio="xMidYMid slice"></image><rect${attr("width", node.x1 - node.x0)}${attr("height", node.y1 - node.y0)}${attr("fill", hoveredId === node.data.trackId || selectedId === node.data.trackId ? "rgba(0,0,0,0.2)" : "rgba(0,0,0,0.7)")} style="transition: all 0.2s ease;"></rect>`;
    if (node.x1 - node.x0 > 60 && node.y1 - node.y0 > 40) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<text${attr("x", (node.x1 - node.x0) / 2)}${attr("y", (node.y1 - node.y0) / 2 - 5)} fill="white" font-size="10" text-anchor="middle" font-weight="bold" style="text-shadow: 0 1px 2px rgba(0,0,0,0.8);">${escape_html(node.data.title)}</text><text${attr("x", (node.x1 - node.x0) / 2)}${attr("y", (node.y1 - node.y0) / 2 + 10)} fill="#1DB954" font-size="9" text-anchor="middle" style="text-shadow: 0 1px 2px rgba(0,0,0,0.8);">${escape_html(node.data.total_streams.toLocaleString())} streams</text>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></g>`;
  }
  $$payload.out += `<!--]--><!--[-->`;
  for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
    let parent = each_array_2[$$index_2];
    if (parent) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<g${attr("transform", `translate(${parent.x0},${parent.y0})`)}><rect${attr("width", parent.x1 - parent.x0)}${attr("height", parent.y1 - parent.y0)} fill="none" stroke="#1DB954" stroke-width="3" style="transition: all 0.3s ease;"></rect>`;
      if (parent.x1 - parent.x0 > 100 && parent.y1 - parent.y0 > 40 && parent.children.length > 1) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<text${attr("x", (parent.x1 - parent.x0) / 2)} y="15" fill="#1DB954" font-size="12" font-weight="bold" text-anchor="middle" style="text-shadow: 0 1px 2px black;">${escape_html(parent.data.name)}</text>`;
      } else {
        $$payload.out += "<!--[!-->";
      }
      $$payload.out += `<!--]--></g>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]-->`;
  }
  $$payload.out += `<!--]--></svg>`;
  bind_props($$props, { data, limit });
  pop();
}
function _page($$payload, $$props) {
  push();
  let start = "";
  let end = "";
  let title = "";
  let artist = "";
  let region = "";
  let rank = "";
  let limit = 10;
  let datajson = [];
  let datagraph = [];
  function formatDate(str) {
    return str.split("T")[0];
  }
  head($$payload, ($$payload2) => {
    $$payload2.title = `<title>Charts Top</title>`;
  });
  $$payload.out += `<div class="filters svelte-10oxxhb"><input type="date"${attr("value", start)} placeholder="Data início" class="svelte-10oxxhb"> <input type="date"${attr("value", end)} placeholder="Data fim" class="svelte-10oxxhb"> <input placeholder="Música"${attr("value", title)} class="svelte-10oxxhb"> <input placeholder="Artista"${attr("value", artist)} class="svelte-10oxxhb"> <input placeholder="Região"${attr("value", region)} class="svelte-10oxxhb"> <input placeholder="Rank (intervalo '1-50')"${attr("value", rank)} class="svelte-10oxxhb"> <input placeholder="Qtd. Músicas" type="number" min="1"${attr("value", limit)} class="svelte-10oxxhb"></div> `;
  {
    $$payload.out += "<!--[!-->";
    const each_array = ensure_array_like(datajson);
    $$payload.out += `<div class="chart-container svelte-10oxxhb"><h2>Top Músicas por Streams</h2> `;
    Chart($$payload, { data: datagraph, limit });
    $$payload.out += `<!----></div> <div class="grid svelte-10oxxhb"><!--[-->`;
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let {
        date,
        rank: rank2,
        title: title2,
        artist: artist2,
        region: region2,
        trackId
      } = each_array[$$index];
      $$payload.out += `<div class="card svelte-10oxxhb"><small>${escape_html(formatDate(date))} – #${escape_html(rank2)}</small><br> <strong>${escape_html(title2)}</strong><br> <small>${escape_html(artist2)};</small> <small>${escape_html(region2)}</small></div>`;
    }
    $$payload.out += `<!--]--></div>`;
  }
  $$payload.out += `<!--]--> `;
  {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  pop();
}
export {
  _page as default
};
