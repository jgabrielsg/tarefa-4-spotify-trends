import * as duckdb from '@duckdb/duckdb-wasm';
import fs from 'fs/promises';
import fetch from 'node-fetch';

// Instância global para o banco de dados
let _db;

export async function handler(event) {
  try {
    console.log('Iniciando handler...');
    
    if (!_db) {
      console.log('Instanciando o DuckDB...');
      const jsdelivr = duckdb.getJsDelivrBundles();
      const bundle = await duckdb.selectBundle(jsdelivr);
      
      const logger = new duckdb.ConsoleLogger();
      _db = new duckdb.AsyncDuckDB(logger);

      // Carregar o banco de dados
      console.log('Lendo o arquivo de banco de dados...');
      const buf = await fs.readFile(new URL('./charts.duck.db', import.meta.url));
      if (!buf) {
        console.log('Erro ao ler o arquivo de banco de dados.');
        throw new Error('Arquivo de banco de dados não carregado corretamente');
      }
      console.log('Arquivo de banco de dados carregado com sucesso.');

      await _db.registerFileBuffer('charts.duck.db', buf);
      await _db.instantiate(bundle.mainModule, bundle.pthreadWorker);
      console.log('Banco de dados instanciado.');
    }

    const db = _db;
    const p = event.queryStringParameters || {};
    let limit = parseInt(p.limit, 10) || 50;

    if (limit < 1) limit = 1;
    if (limit > 50) limit = 50;

    console.log(`Limit definido como: ${limit}`);

    // Montar a cláusula WHERE
    const where = [];
    if (p.start) where.push(`date >= '${p.start}'`);
    if (p.end) where.push(`date <= '${p.end}'`);
    if (p.title) where.push(`LOWER(title) LIKE '${p.title.toLowerCase()}%'`);
    if (p.artist) where.push(`LOWER(artist) LIKE '${p.artist.toLowerCase()}%'`);
    if (p.region) where.push(`LOWER(region) LIKE '${p.region.toLowerCase()}%'`);

    const whereClause = where.length ? ' WHERE ' + where.join(' AND ') : '';
    console.log(`Cláusula WHERE gerada: ${whereClause}`);

    // Consultas SQL
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

    console.log('Consultas SQL geradas:', sqlData, sqlGraph);

    // Rodar as consultas no banco de dados
    const conn = await db.connect();
    console.log('Conexão com o banco de dados estabelecida.');
    const tableData = await conn.query(sqlData);
    const rowsData = tableData.toArray();
    console.log('Tabela de dados carregada:', rowsData);

    const tableGraph = await conn.query(sqlGraph);
    const rowsGraph = tableGraph.toArray();
    console.log('Tabela de gráfico carregada:', rowsGraph);

    await conn.close();
    console.log('Consultas executadas e conexão fechada.');

    // Retornar os resultados
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: rowsData, graph: rowsGraph })
    };
  } catch (error) {
    console.error('Erro no handler:', error);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: error.message })
    };
  }
}
