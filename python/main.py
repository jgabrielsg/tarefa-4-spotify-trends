import pandas as pd

df = pd.read_csv('python/charts.csv', low_memory=False)

# Para criar o charts_global:
#df_global = df[df["region"]=="Global"]

#df_global.to_csv('charts_global.csv', index=False)

# Para criar o charts_top:
# Tira os virais e deleta a coluna chart e trend
df = df[df['chart'] != 'viral50']
df = df.drop(columns=['chart'])
df = df.drop(columns=['trend'])

df.to_csv('python/charts_top.csv', index=False)