# V11 — correção de conexão Neon no Render Free

O deploy já ficava LIVE, mas uma requisição recebeu:
`SSL error: decryption failed or bad record mac`.

Esta versão:
- ativa `pool_pre_ping`
- recicla conexões antigas
- usa LIFO no pool
- limita o pool do banco
- recomenda 1 worker + 4 threads no Render Free

No Render, altere também manualmente o Start Command para:

gunicorn app:app --bind 0.0.0.0:$PORT --workers 1 --threads 4 --timeout 120

Depois faça Manual Deploy -> Deploy latest commit.
