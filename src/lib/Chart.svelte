<script>
  import { onMount } from 'svelte';
  import * as d3 from 'd3';

  let nodes = [];

  const width = 800;
  const height = 600;

  onMount(async () => {
    const response = await fetch('/charts_global.csv');
    const text = await response.text();
    const parsed = d3.csvParse(text, d => ({
      title: d.title,
      rank: +d.rank,
      date: d.date,
      artist: d.artist,
      streams: +d.streams
    }));

    // Filtrar para o dia 2019-02-02
    const filtered = parsed
      .filter(d => d.date === '2019-02-02')
      .sort((a, b) => a.rank - b.rank)
      .slice(0, 10);

    const root = d3.hierarchy({ children: filtered })
      .sum(d => d.streams);

    d3.treemap()
      .size([width, height])
      .padding(2)
      (root);

    nodes = root.leaves();
  });
</script>

<svg width={width} height={height}>
  {#each nodes as node}
    <g transform={`translate(${node.x0},${node.y0})`}>
      <rect
        width={node.x1 - node.x0}
        height={node.y1 - node.y0}
        fill="steelblue"
        stroke="white"
      />
      <text
        x="4"
        y="16"
        fill="white"
        font-size="12"
        style="pointer-events: none;"
      >
        {node.data.title}
      </text>
    </g>
  {/each}
</svg>
