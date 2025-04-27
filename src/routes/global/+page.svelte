<script>
  import { onMount } from 'svelte';

  let start = '';
  let end = '';
  let title = '';
  let artist = '';
  let data = [];
  let loading = false;
  let currentTrack = '';
  let controller;

  function formatDate(str) {
    return str.split('T')[0];  // mantém só “YYYY-MM-DD”
  }

  async function fetchData() {
    controller?.abort();
    controller = new AbortController();
    loading = true;

    const qs = new URLSearchParams({ limit: '100' });
    if (start)    qs.set('start', start);
    if (end)      qs.set('end', end);
    if (title)    qs.set('title', title);
    if (artist)   qs.set('artist', artist);

    try {
      const res = await fetch(`/global?${qs}`, { signal: controller.signal });
      data = res.ok ? await res.json() : [];
      // já vem ordenado, mas garante de novo
      data.sort((a, b) => new Date(a.date) - new Date(b.date));
    } catch (e) {
      if (e.name !== 'AbortError') console.error(e);
      data = [];
    } finally {
      loading = false;
    }
  }

  function onStart(e)  { start  = e.target.value; fetchData(); }
  function onEnd(e)    { end    = e.target.value; fetchData(); }
  function onTitle(e)  { title  = e.target.value; fetchData(); }
  function onArtist(e) { artist = e.target.value; fetchData(); }

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
</div>

{#if loading}
  <p>Carregando…</p>
{:else}
  <div class="grid">
    {#each data as { date, rank, title, artist, trackId }}
      <div class="card" on:click={() => play(trackId)}>
        <small>{formatDate(date)} – #{rank}</small><br/>
        <strong>{title}</strong><br/>
        <small>{artist}</small>
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
  }
  .filters input {
    flex: 1;
    padding: .5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  .grid {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
  .card {
    width: 150px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 8px;
    text-align: center;
    cursor: pointer;
    transition: .2s;
  }
  .card:hover {
    background: #f0f0f0;
  }
</style>
