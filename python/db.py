import duckdb

# Conecta (ou cria) o arquivo charts.duck.db
con = duckdb.connect('charts.duck.db')

con.execute("""
  CREATE TABLE IF NOT EXISTS charts AS
  SELECT * FROM read_csv_auto('python/charts_top.csv')
""")

con.close()
