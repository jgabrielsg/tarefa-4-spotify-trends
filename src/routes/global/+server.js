import { Database } from 'duckdb';

const db = new Database('charts.duck.db');

// escapa apenas aspas simples pra evitar SQL injection básica
function esc(str) {
  return str.replace(/'/g, "''");
}

export async function GET({ url }) {
  const p      = url.searchParams;
  const start  = p.get('start');    // “YYYY-MM-DD” ou null
  const end    = p.get('end');      // “YYYY-MM-DD” ou null
  const title  = p.get('title');    // prefixo ou null
  const artist = p.get('artist');   // prefixo ou null
  const region = p.get('region');   // prefixo ou null
  const rank = p.get('rank');   // topN ou null
  const limit  = parseInt(p.get('limit') || '100', 10);

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
    LIMIT ${limit}
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