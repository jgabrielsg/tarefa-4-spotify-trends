<script>
  import Chart from "$lib/Chart.svelte"; // Deixe preparado caso queira usar depois
</script>

<svelte:head>
  <title>Spotify Trends - Home</title>
</svelte:head>

<section class="home-container">
  <div class="welcome">
      <h1>Spotify Trends</h1>
      <p>Descubra as músicas mais ouvidas no mundo e no Brasil!</p>
      <a href="/charts" class="start-button">Explorar Rankings</a>
  </div>
</section>

<style>
  .home-container {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 75vh;
      background: linear-gradient(135deg, #1DB954 0%, #191414 100%);
      color: white;
      text-align: center;
    }

  .welcome {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
  }

  h1 {
      font-size: 3rem;
      margin-bottom: 0.5rem;
  }

  p {
      font-size: 1.5rem;
      max-width: 800px;
  }

  .start-button {
      margin-top: 2rem;
      padding: 1rem 2rem;
      background-color: #191414;
      color: #1DB954;
      border: 2px solid #1DB954;
      border-radius: 9999px;
      font-size: 1.2rem;
      transition: all 0.3s ease;
      text-decoration: none;
  }

  .start-button:hover {
      background-color: #1DB954;
      color: #191414;
  }
</style>
