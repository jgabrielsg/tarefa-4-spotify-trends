import { Database } from 'duckdb';

const db = new Database('charts.duck.db');

// escapa aspas simples
function esc(str) {
  return str.replace(/'/g, "''");
}

// NOVO: Função para buscar thumbnail no servidor
async function fetchThumbnailServer(trackId) {
  try {
    const response = await fetch(`https://open.spotify.com/oembed?url=https://open.spotify.com/track/${trackId}`);
    if (response.ok) {
      const json = await response.json();
      return json.thumbnail_url;
    }
  } catch (error) {
    console.error('Erro buscando thumbnail no servidor:', error);
  }
  return null;
}

export async function GET({ url }) {
  const p = url.searchParams;

  if (p.get('thumbnail') === 'true') {
    const trackId = p.get('trackId');
    if (!trackId) {
      return new Response('trackId é obrigatório', { status: 400 });
    }

    const thumbnail = await fetchThumbnailServer(trackId);

    if (thumbnail) {
      return new Response(JSON.stringify({ thumbnail }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    } else {
      return new Response('Thumbnail não encontrada', { status: 404 });
    }
  }
  else{

    const start  = p.get('start');
    const end    = p.get('end');
    const title  = p.get('title');
    const artist = p.get('artist');
    const region = p.get('region');
    const rank   = p.get('rank');
    const limit  = parseInt(p.get('limit') || '50', 10);
    const limitGraph  = limit;

    const where = [];

    if (start && end) {
      where.push(`date BETWEEN '${esc(start)}' AND '${esc(end)}'`);
    } else if (start) {
      where.push(`date >= '${esc(start)}'`);
    } else if (end) {
      where.push(`date <= '${esc(end)}'`);
    }

    if (title) {
      where.push(`LOWER(title) LIKE '${esc(title.toLowerCase())}%'`);
    }
    if (artist) {
      where.push(`LOWER(artist) LIKE '${esc(artist.toLowerCase())}%'`);
    }
    if (region) {
      where.push(`LOWER(region) LIKE '${esc(region.toLowerCase())}%'`);
    } else {
      where.push(`LOWER(region) = 'global'`);
    }
    if (rank) {
      if (rank.includes('-')) {
        const [min, max] = rank.split('-').map(r => parseInt(r.trim(), 10));
        if (!isNaN(min) && !isNaN(max)) {
          where.push(`rank BETWEEN ${min} AND ${max}`);
        }
      } else {
        const r = parseInt(rank.trim(), 10);
        if (!isNaN(r)) {
          where.push(`rank <= ${r}`);
        }
      }
    }

    const whereClause = where.length ? ' WHERE ' + where.join(' AND ') : '';
    
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
      LIMIT ${limitGraph}
    `.trim();

    return new Promise(resolve => {
      db.all(sqlData, (err1, rowsData) => {
        if (err1) {
          console.error('DuckDB error on sqlData:', err1);
          return resolve(new Response('Erro no DB (data)', { status: 500 }));
        }

        db.all(sqlGraph, (err2, rowsGraph) => {
          if (err2) {
            console.error('DuckDB error on sqlGraph:', err2);
            return resolve(new Response('Erro no DB (graph)', { status: 500 }));
          }

          const body = JSON.stringify({
            data: rowsData,
            graph: rowsGraph
          }, (_, v) => typeof v === 'bigint' ? Number(v) : v);

          resolve(new Response(body, {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
          }));
        });
      });
    });
  }
}
