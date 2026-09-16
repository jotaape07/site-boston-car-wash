# PUBLICAR GRÁTIS — Render Free + Neon Free

Use esta versão para o plano gratuito.

## 1. Neon
Crie um projeto PostgreSQL gratuito.
No painel do projeto clique em **Connect** e copie a **connection string**.
Prefira a opção com **Connection pooling** ligada.

Ela se parece com:
`postgresql://usuario:senha@ep-xxxx-pooler....neon.tech/neondb?sslmode=require`

Guarde esse texto. Ele será usado como `DATABASE_URL` no Render.

## 2. GitHub
Crie um repositório e envie TODOS os arquivos desta pasta para ele.

## 3. Render
Crie um **Web Service** no plano **Free** usando o repositório.

Configuração:
- Language: Python 3
- Build Command: `pip install -r requirements.txt`
- Start Command: `gunicorn app:app --bind 0.0.0.0:$PORT --workers 2 --threads 4 --timeout 120`

Variáveis de ambiente:
- `APP_ENV` = `production`
- `DATABASE_URL` = cole a connection string do Neon
- `SECRET_KEY` = gere uma sequência grande e aleatória
- `ADMIN_EMAIL` = seu e-mail de administrador
- `ADMIN_PASSWORD` = uma senha forte

Depois clique para criar/deployar o Web Service.

## Importante
O Render Free dorme depois de 15 minutos sem acesso. Quando alguém entrar novamente, ele acorda; o primeiro carregamento pode levar aproximadamente um minuto.

Os dados NÃO ficam no Render. Eles ficam no PostgreSQL do Neon, então reiniciar ou dormir o Web Service não apaga clientes, caixa, pagamentos ou mensalistas.
