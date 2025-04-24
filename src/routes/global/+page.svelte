<script>
  import { onMount } from 'svelte';

  let globalData = []; // Para armazenar
  let loading = true;  // Para controlar o estado de carregamento

  // Função para buscar os dados do servidor
  const fetchCSVData = async () => {
    try {
      const response = await fetch('/global');
      if (!response.ok) throw new Error('Falha ao carregar os dados');
      const data = await response.json();

      globalData = data;
      loading = false;
    } catch (error) {
      console.error(error);
      loading = false;
    }
  };

  // Chama a função quando o componente é montado
  onMount(() => {
    fetchCSVData();
  });
</script>

<svelte:head>
  <title>Ler CSV diretamente</title>
</svelte:head>

<h1>As 5 Primeiras Linhas do CSV</h1>

{#if loading}
  <p>Carregando...</p>
{:else}
  <ul>
    {#each globalData as line}
      <li>
        {Object.values(line).join(' | ')}
      </li>
    {/each}
  </ul>
{/if}

<style>
  h1 {
    color: #333;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    margin: 10px 0;
  }
</style>
