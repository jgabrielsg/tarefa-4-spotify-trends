<script>
  import { onMount } from 'svelte';
  import * as d3 from 'd3';

  export let data = [];

  let nodes = [];

  const width = 800;
  const height = 600;

  $: if (data.length > 0) {
    nodes = [];
    console.log('Dados recebidos:', data);

    const parsed = data
      .map(d => ({
        ...d,
        total_streams: +d.total_streams // Note o plural 'streams' aqui
      }))
      .filter(d => !isNaN(d.total_streams) && d.total_streams > 0) 
      .sort((a, b) => b.total_streams - a.total_streams)
      .slice(0, 10); // Aumentei para 10 itens para melhor visualização

    const root = d3.hierarchy({ children: parsed })
      .sum(d => d.total_streams);

    d3.treemap()
      .size([width, height])
      .padding(2)
      (root);

    nodes = root.leaves();
  }
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
      <text
        x="4"
        y="32"
        fill="white"
        font-size="10"
        style="pointer-events: none;"
      >
        {node.data.title} 
      </text>
      <text
        x="4"
        y="48"
        fill="white"
        font-size="10"
        style="pointer-events: none;"
      >
        {node.data.total_streams.toLocaleString()} streams
      </text>
    </g>
  {/each}
</svg>