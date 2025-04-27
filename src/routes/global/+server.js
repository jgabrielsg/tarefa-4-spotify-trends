import fs from 'fs';
import path from 'path';
import csv from 'csv-parser'; 

// Função para ler o arquivo CSV
export async function GET() {
  const filePath = path.resolve('static', 'charts_global.csv');

  const rows = [];
  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => {
        rows.push(row);
        if (rows.length === 100) {  // Limita a 100 linhas
          resolve(new Response(JSON.stringify(rows), { status: 200 }));
        }
      })
      .on('end', () => {
        if (rows.length < 100) {
          resolve(new Response(JSON.stringify(rows), { status: 200 }));
        }
      })
      .on('error', (err) => {
        reject(new Response('Erro ao ler o CSV', { status: 500 }));
      });
  });
}
