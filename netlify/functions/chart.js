import pkg from 'duckdb';
const { Database } = pkg;

// CERTIFIQUE-SE de copiar 'charts.duck.db' para esta mesma pasta
const db = new Database('charts.duck.db');

// escapa aspas simples
function esc(str) {
  return str.replace(/'/g, "''");
}

// busca thumbnail do Spotify
async function fetchThumbnailServer(trackId) {
  try {
    const res = await fetch(
      `https://open.spotify.com/oembed?url=https://open.spotify.com/track/${trackId}`
    );
    if (res.ok) {
      const json = await res.json();
      return json.thumbnail_url;
    }
  } catch (e) {
    console.error('Erro buscando thumbnail:', e);
  }
  return null;
}

export async function handler(event) {
  const p = event.queryStringParameters || {};

  // rota de thumbnail
  if (p.thumbnail === 'true') {
    if (!p.trackId) {
      return {
        statusCode: 400,
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: 'trackId é obrigatório'
      };
    }
    const thumb = await fetchThumbnailServer(p.trackId);
    return {
      statusCode: thumb ? 200 : 404,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: thumb
        ? JSON.stringify({ thumbnail: thumb })
        : 'Thumbnail não encontrada'
    };
  }

  // parâmetros de filtro
  const {
    start,
    end,
    title,
    artist,
    region,
    rank,
    limit: limitStr
  } = p;
  const limit = parseInt(limitStr, 10) || 50;
  const where = [];

  if (start && end) {
    where.push(`date BETWEEN '${esc(start)}' AND '${esc(end)}'`);
  } else if (start) {
    where.push(`date >= '${esc(start)}'`);
  } else if (end) {
    where.push(`date <= '${esc(end)}'`);
  }
  if (title)  where.push(`LOWER(title) LIKE '${esc(title.toLowerCase())}%'`);
  if (artist) where.push(`LOWER(artist) LIKE '${esc(artist.toLowerCase())}%'`);
  if (region) where.push(`LOWER(region) LIKE '${esc(region.toLowerCase())}%'`);
  else        where.push(`LOWER(region) = 'global'`);
  if (rank) {
    if (rank.includes('-')) {
      const [min, max] = rank.split('-').map(r => parseInt(r, 10));
      if (!isNaN(min) && !isNaN(max)) {
        where.push(`rank BETWEEN ${min} AND ${max}`);
      }
    } else {
      const r = parseInt(rank, 10);
      if (!isNaN(r)) where.push(`rank <= ${r}`);
    }
  }

  const whereClause = where.length
    ? ' WHERE ' + where.join(' AND ')
    : '';

  const sqlData = `
    SELECT title, artist, date, rank, region, url AS trackId
      FROM charts${whereClause}
     ORDER BY date ASC, rank ASC
     LIMIT ${limit}
  `.trim();

  const sqlGraph = `
    SELECT title, artist, url AS trackId, SUM(streams) AS total_streams
      FROM charts${whereClause}
  GROUP BY title, artist, url
     ORDER BY total_streams DESC
     LIMIT ${limit}
  `.trim();

  // executa as queries
  return new Promise(resolve => {
    db.all(sqlData, (err1, rowsData) => {
      if (err1) {
        console.error('DuckDB error (data):', err1);
        return resolve({
          statusCode: 500,
          headers: { 'Access-Control-Allow-Origin': '*' },
          body: 'Erro no DB (data)'
        });
      }
      db.all(sqlGraph, (err2, rowsGraph) => {
        if (err2) {
          console.error('DuckDB error (graph):', err2);
          return resolve({
            statusCode: 500,
            headers: { 'Access-Control-Allow-Origin': '*' },
            body: 'Erro no DB (graph)'
          });
        }
        const body = JSON.stringify(
          { data: rowsData, graph: rowsGraph },
          (_, v) => (typeof v === 'bigint' ? Number(v) : v)
        );
        resolve({
          statusCode: 200,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          },
          body
        });
      });
    });
  });
}
