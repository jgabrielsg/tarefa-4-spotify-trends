<script>
  import { onMount } from 'svelte';
  import * as d3 from 'd3';
  import { createEventDispatcher } from 'svelte';

  export let data = [];

  let nodes = [];
  let images = {};

  const width = 1000;
  const height = 600;

  async function fetchThumbnail(trackId) {
    if (!trackId) return null;
    if (images[trackId]) return images[trackId];
    
    try {
      const response = await fetch(`/global?thumbnail=true&trackId=${trackId}`);
      if (response.ok) {
        const json = await response.json();
        console.log('Thumbnail URL:', json.thumbnail); // DEBUG
        images[trackId] = json.thumbnail;
        return json.thumbnail;
      }
    } catch (error) {
      console.error('Erro ao buscar thumbnail:', error);
    }
    return null;
  }

  $: if (data.length > 0) {
    console.log('Dados recebidos:', data);

    const parsed = data
      .map(d => ({
        ...d,
        total_streams: +d.total_streams
      }))
      .filter(d => !isNaN(d.total_streams) && d.total_streams > 0)
      .sort((a, b) => b.total_streams - a.total_streams)
      .slice(0, 10);

    const root = d3.hierarchy({ children: parsed })
      .sum(d => d.total_streams);

    d3.treemap()
      .size([width, height])
      .padding(2)
      (root);

    Promise.all(
      root.leaves().map(async node => {
        const thumbnail = await fetchThumbnail(node.data.trackId);
        if (thumbnail) {
          node.data.thumbnail = thumbnail;
        }
        return node;
      })
    ).then(finalNodes => {
      nodes = finalNodes; 
    });
  }

  const dispatch = createEventDispatcher();

  function play(trackId) {
    const trackUrl = `https://open.spotify.com/embed/track/${trackId}`;
    dispatch('playtrack', trackUrl);
  }
</script>

<svg width={width} height={height} xmlns="http://www.w3.org/2000/svg">
  {#each nodes as node}
  <g 
    transform={`translate(${node.x0},${node.y0})`} 
    on:click={() => play(node.data.trackId)}
    style="cursor: pointer;"
  >
      <!-- Fundo com cor mais escura -->
      <rect
        width={node.x1 - node.x0}
        height={node.y1 - node.y0}
        fill="#222"
        stroke="#555"
      />
      
      <!-- Imagem - note que usamos href em vez de xlink:href -->
      {#if node.data.thumbnail}
        <image
          href={node.data.thumbnail}
          width={node.x1 - node.x0}
          height={node.y1 - node.y0}
          preserveAspectRatio="xMidYMid cover"
        />
      {:else}
        <text x="10" y="20" fill="white" font-size="12">
          Carregando: {node.data.trackId}
        </text>
      {/if}

      <!-- Overlay escuro semi-transparente -->
      <rect
        width={node.x1 - node.x0}
        height={node.y1 - node.y0}
        fill="rgba(0,0,0,0.7)"
      />
      
      <!-- Texto com sombra e posicionamento elegante -->
      <text 
        x={(node.x1 - node.x0) / 2}
        y="30"
        fill="white"
        font-size="14"
        font-weight="bold"
        text-anchor="middle"
        style="text-shadow: 0 1px 3px rgba(0,0,0,0.8);"
      >
        {node.data.artist}
      </text>

      <text 
        x={(node.x1 - node.x0) / 2}
        y="50"
        fill="white"
        font-size="12"
        text-anchor="middle"
        style="text-shadow: 0 1px 3px rgba(0,0,0,0.8);"
      >
        {node.data.title}
      </text>

      <text 
        x={(node.x1 - node.x0) / 2}
        y="70"
        fill="#1DB954"
        font-size="11"
        text-anchor="middle"
        style="text-shadow: 0 1px 2px rgba(0,0,0,0.5);">
        {node.data.total_streams.toLocaleString()} streams
      </text>
      
    </g>
  {/each}
</svg>

<style>
  /* Estilos adicionais para melhorar a aparência */
  svg {
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    background: #121212; /* Fundo escuro estilo Spotify */
  }
</style>