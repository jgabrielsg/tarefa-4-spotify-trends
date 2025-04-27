<script>
    import { onMount } from 'svelte';
    import { json } from '@sveltejs/kit';

    const clientId = import.meta.env.VITE_CLIENT_ID;
    const clientSecret = import.meta.env.VITE_CLIENT_SECRET;

    // Função para obter o Access Token
    async function getAccessToken() {
      const tokenUrl = 'https://accounts.spotify.com/api/token';
  
      const response = await fetch(tokenUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + btoa(`${clientId}:${clientSecret}`),
        },
        body: new URLSearchParams({
          'grant_type': 'client_credentials',
        }),
      });
  
      const data = await response.json();
      if (data.access_token) {
        return data.access_token;
      } else {
        throw new Error('Erro ao obter o access token.');
      }
    }
  
    let tracks = [];
    let loading = true; 
    let errorMessage = '';

    const top100BrasilPlaylistId = '5YRmjoCTiI6uPGJAevX87A'; // Playlist "Top 100 Brasil"
  
    // Função para buscar as faixas da playlist "Top 100 Brasil"
    async function getTopTracks() {
      try {
        const accessToken = await getAccessToken();
        const playlistUrl = `https://api.spotify.com/v1/playlists/${top100BrasilPlaylistId}/tracks`;
  
        const response = await fetch(playlistUrl, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        });
  
        const data = await response.json();
        //console.log(data)
        if (data.items) {
            // Pega o nome da música e do artista para cada faixa
            tracks = data.items.map(item => ({
            trackName: item.track.name,
            artistName: item.track.artists.map(artist => artist.name).join(', '),
          }));
        } else {
          throw new Error('Não foi possível obter as faixas.');
        }
      } catch (error) {
        errorMessage = error.message;
      } finally {
        loading = false;
      }
    }
  
    // Chama a função para pegar as faixas quando o componente for montado
    onMount(() => {
      getTopTracks();
    });
  </script>
  
  <svelte:head>
    <title>Top 100 Brasil - Spotify</title>
  </svelte:head>
  
  <h1>Top 100 Brasil</h1>
  
  {#if loading}
    <p>Carregando...</p>
  {:else if errorMessage}
    <p style="color: red;">Erro: {errorMessage}</p>
  {:else}
    <ul>
      {#each tracks as track}
        <li>{track.trackName} - {track.artistName}</li>
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
  