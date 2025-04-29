// netlify/functions/chart.js
import * as duckdb from '@duckdb/duckdb-wasm';
import { Worker } from 'web-worker';
import fs from 'fs/promises';
import fetch from 'node-fetch';

// instância global (speed)
let _db;

export async function handler(event) {
  // Instanciar DuckDB-WASM só na primeira chamada
  if (!_db) {
    // escolher bundle CDN
    const jsdelivr = duckdb.getJsDelivrBundles();
    const bundle  = await duckdb.selectBundle(jsdelivr);

    // criar Worker WASM
    // gera um Blob p/ o worker
    const blob = new Blob(
      [`importScripts("${bundle.mainWorker}")`],
      { type: 'text/javascript' }
    );
    const workerUrl = URL.createObjectURL(blob);
    const worker    = new Worker(workerUrl);

    // logger e instância DB
    const logger = new duckdb.ConsoleLogger();
    const db     = new duckdb.AsyncDuckDB(logger, worker);
    await db.instantiate(bundle.mainModule, bundle.pthreadWorker);

    // “montar” o arquivo charts.duck.db no FS do WASM
    const buf = await fs.readFile(
      new URL('./charts.duck.db', import.meta.url)
    );
    await db.registerFileBuffer('charts.duck.db', buf);

    _db = db;  // salvar instância
  }

  const db = _db;
  const p  = event.queryStringParameters || {};

  // rota de thumbnail
  if (p.thumbnail === 'true') {
    if (!p.trackId) {
      return { statusCode: 400, headers: CORS, body: 'trackId é obrigatório' };
    }
    const res = await fetch(
      `https://open.spotify.com/oembed?url=https://open.spotify.com/track/${p.trackId}`
    );
    if (res.ok) {
      const { thumbnail_url: thumbnail } = await res.json();
      return {
        statusCode: 200,
        headers: CORS_JSON,
        body: JSON.stringify({ thumbnail })
      };
    } else {
      return { statusCode: 404, headers: CORS, body: 'Thumbnail não encontrada' };
    }
  }

  // 3) parâmetros de filtro
  const start  = p.start;
  const end    = p.end;
  const title  = p.title;
  const artist = p.artist;
  const region = p.region;
  const rank   = p.rank;
  let   limit  = parseInt(p.limit, 10) || 50;
  if (limit < 1) limit = 1;
  if (limit > 50) limit = 50;

  // montar WHERE 
  const esc = s => s.replace(/'/g, "''");
  const where = [];
  if (start && end) where.push(`date BETWEEN '${esc(start)}' AND '${esc(end)}'`);
  else if (start)   where.push(`date >= '${esc(start)}'`);
  else if (end)     where.push(`date <= '${esc(end)}'`);
  if (title)  where.push(`LOWER(title) LIKE '${esc(title.toLowerCase())}%'`);
  if (artist) where.push(`LOWER(artist) LIKE '${esc(artist.toLowerCase())}%'`);
  if (region) where.push(`LOWER(region) LIKE '${esc(region.toLowerCase())}%'`);
  else        where.push(`LOWER(region) = 'global'`);
  if (rank) {
    if (rank.includes('-')) {
      const [min,max] = rank.split('-').map(n => parseInt(n,10));
      if (!isNaN(min)&&!isNaN(max)) where.push(`rank BETWEEN ${min} AND ${max}`);
    } else {
      const r = parseInt(rank,10);
      if (!isNaN(r)) where.push(`rank <= ${r}`);
    }
  }
  const wc = where.length ? ' WHERE ' + where.join(' AND ') : '';

  // SQL data & graph
  const sqlData = `
    SELECT title, artist, date, rank, region, url AS trackId
      FROM charts${wc}
     ORDER BY date, rank
     LIMIT ${limit};
  `.trim();

  const sqlGraph = `
    SELECT title, artist, url AS trackId, SUM(streams) AS total_streams
      FROM charts${wc}
  GROUP BY title, artist, url
     ORDER BY total_streams DESC
     LIMIT ${limit};
  `.trim();

  // 6) rodar as queries
  // AsyncDuckDBConnection.query() retorna um Arrow Table
  const conn       = await db.connect();
  const tableData  = await conn.query(sqlData);
  const rowsData   = tableData.toArray();
  const tableGraph = await conn.query(sqlGraph);
  const rowsGraph  = tableGraph.toArray();
  await conn.close();

  // 7) resposta final
  return {
    statusCode: 200,
    headers: CORS_JSON,
    body: JSON.stringify({ data: rowsData, graph: rowsGraph })
  };
}

// cabeçalhos CORS
const CORS = { 'Access-Control-Allow-Origin': '*' };
const CORS_JSON = {
  ...CORS,
  'Content-Type': 'application/json'
};
