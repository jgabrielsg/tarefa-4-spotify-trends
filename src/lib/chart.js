import * as duckdb from '@duckdb/duckdb-wasm';
import fs from 'fs/promises';

let _db;

export async function GET({ url }) {
  try {
    if (!_db) {
      const jsdelivr = duckdb.getJsDelivrBundles();
      const bundle = await duckdb.selectBundle(jsdelivr);
      const logger = new duckdb.ConsoleLogger();
      _db = new duckdb.AsyncDuckDB(logger);

      const buf = await fs.readFile(new URL('./charts.duck.db', import.meta.url));
      if (!buf) throw new Error('Arquivo de banco de dados não carregado corretamente');

      await _db.registerFileBuffer('charts.duck.db', buf);
      await _db.instantiate(bundle.mainModule, bundle.pthreadWorker);
    }

    const db = _db;
    const p = url.searchParams;
    let limit = parseInt(p.get('limit'), 10) || 50;
    if (limit < 1) limit = 1;
    if (limit > 50) limit = 50;

    const where = [];
    if (p.get('start')) where.push(`date >= '${p.get('start')}'`);
    if (p.get('end')) where.push(`date <= '${p.get('end')}'`);
    if (p.get('title')) where.push(`LOWER(title) LIKE '${p.get('title').toLowerCase()}%'`);
    if (p.get('artist')) where.push(`LOWER(artist) LIKE '${p.get('artist').toLowerCase()}%'`);
    if (p.get('region')) where.push(`LOWER(region) LIKE '${p.get('region').toLowerCase()}%'`);

    const whereClause = where.length ? ' WHERE ' + where.join(' AND ') : '';

    const sqlData = `
      SELECT title, artist, date, rank, region, url AS trackId
      FROM charts${whereClause}
      ORDER BY date, rank
      LIMIT ${limit};
    `.trim();

    const sqlGraph = `
      SELECT title, artist, url AS trackId, SUM(streams) AS total_streams
      FROM charts${whereClause}
      GROUP BY title, artist, url
      ORDER BY total_streams DESC
      LIMIT ${limit};
    `.trim();

    const conn = await db.connect();
    const tableData = await conn.query(sqlData);
    const rowsData = tableData.toArray();

    const tableGraph = await conn.query(sqlGraph);
    const rowsGraph = tableGraph.toArray();

    await conn.close();

    return new Response(JSON.stringify({ data: rowsData, graph: rowsGraph }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
