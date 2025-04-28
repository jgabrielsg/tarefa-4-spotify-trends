<script>
  import { onMount } from 'svelte';
    import Chart from '../../lib/Chart.svelte';

  let start = '';
  let end = '';
  let title = '';
  let artist = '';
  let region = '';
  let rank = '';
  let datajson = [];
  let datagraph = []; 
  let loading = false;
  let currentTrack = '';
  let controller;

  function formatDate(str) {
    return str.split('T')[0];
  }

  async function fetchData() {
    controller?.abort();
    controller = new AbortController();
    loading = true;

    const qs = new URLSearchParams({ limit: '10' });
    if (start)    qs.set('start', start);
    if (end)      qs.set('end', end);
    if (title)    qs.set('title', title);
    if (artist)   qs.set('artist', artist);
    if (region)   qs.set('region', region);
    if (rank)     qs.set('rank', rank);

    try {
      const res = await fetch(`/global?${qs}`, { signal: controller.signal });
      if (res.ok) {
        const responseData = await res.json();
        datajson = responseData.data || []; // Extrai os dados da tabela
        datagraph = responseData.graph || []; // Extrai os dados do gráfico
        console.log('Dados da tabela:', datajson);
        console.log('Dados do gráfico:', datagraph);
        
        datajson.sort((a, b) => new Date(a.date) - new Date(b.date));
      } else {
        datajson = [];
        datagraph = [];
      }
    } catch (e) {
      if (e.name !== 'AbortError') console.error(e);
      datajson = [];
      datagraph = [];
    } finally {
      loading = false;
    }
  }

  function onStart(e)  { start  = e.target.value; fetchData(); }
  function onEnd(e)    { end    = e.target.value; fetchData(); }
  function onTitle(e)  { title  = e.target.value; fetchData(); }
  function onArtist(e) { artist = e.target.value; fetchData(); }
  function onRegion(e) { region = e.target.value; fetchData(); }
  function onRank(e) { rank = e.target.value; fetchData(); }

  function play(id) {
    currentTrack = `https://open.spotify.com/embed/track/${id}`;
  }

  onMount(fetchData);
</script>

<svelte:head>
  <title>Charts Top</title>
</svelte:head>

<div class="filters">
  <input type="date" bind:value={start}  on:input={onStart}  placeholder="Data início" />
  <input type="date" bind:value={end}    on:input={onEnd}    placeholder="Data fim" />
  <input placeholder="Música"  bind:value={title}  on:input={onTitle}  />
  <input placeholder="Artista" bind:value={artist} on:input={onArtist} />
  <input placeholder="Região" bind:value={region} on:input={onRegion} />
  <input placeholder="Rank (intervalo '1-50')" bind:value={rank} on:input={onRank} />
</div>

{#if loading}
  <p>Carregando…</p>
{:else}
  <!-- Seção do gráfico -->
  <div class="chart-container">
    <h2>Top Músicas por Streams</h2>
    <!-- Aqui você incluiria seu componente de treemap, passando datagraph como prop -->
    <Chart data={datagraph} />
  </div>

  <!-- Seção da tabela (mantida como estava) -->
  <div class="grid">
    {#each datajson as { date, rank, title, artist, region, trackId }}
      <div class="card" on:click={() => play(trackId)}>
        <small>{formatDate(date)} – #{rank}</small><br/>
        <strong>{title}</strong><br/>
        <small>{artist};</small>
        <small>{region}</small>
      </div>
    {/each}
  </div>
{/if}

{#if currentTrack}
  <iframe
    src={currentTrack}
    width="300"
    height="80"
    frameborder="0"
    allowtransparency="true"
    allow="encrypted-media"
    style="position: fixed; bottom: 10px; left: 10px;"
  ></iframe>
{/if}

<style>
  .filters {
    display: flex;
    gap: 10px;
    margin-bottom: 1rem;
    align-items: center;
    flex-wrap: wrap;
  }

  .filters input {
    flex: 1;
    padding: 0.75rem 1rem;
    background-color: #121212;
    color: white;
    border: none;
    border-radius: 500px; /* igualzinho ao Spotify */
    font-size: 14px;
    outline: none;
    min-width: 200px;
  }

  .filters input::placeholder {
    color: #b3b3b3; /* cor do placeholder do Spotify */
  }

  .filters input:focus {
    background-color: #2a2a2a;
  }

  /* Opcional: adicionar uma pequena sombra igual ao Spotify */
  .filters input {
    box-shadow: inset 0 0 0 1px #535353;
  }
</style>
