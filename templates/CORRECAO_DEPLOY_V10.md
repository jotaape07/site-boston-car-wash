# CORREÇÃO DO DEPLOY V10

O deploy anterior instalava `psycopg` v3, mas a URL `postgresql://`
fazia o SQLAlchemy tentar carregar `psycopg2`, causando:

`ModuleNotFoundError: No module named 'psycopg2'`

Esta versão converte automaticamente a URL do Neon para:

`postgresql+psycopg://...`

Assim SQLAlchemy usa o driver que já está instalado.

Também foi fixada a versão do Python em 3.13.7 para evitar mudanças do
runtime padrão do Render.

No Render, mantenha a mesma DATABASE_URL do Neon. Não altere a senha,
não mande a string para ninguém e não precisa recriar o banco.
