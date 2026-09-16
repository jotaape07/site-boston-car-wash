# V12 — correção do login do administrador

Problema corrigido:
se o administrador já existia no Neon, mudar `ADMIN_PASSWORD` no Render não alterava
a senha já salva no banco.

Agora, em cada inicialização/deploy:
- o usuário definido em `ADMIN_EMAIL` é garantido como administrador;
- a senha salva no banco é atualizada para o valor atual de `ADMIN_PASSWORD`.

Passos:
1. No Render, confirme `ADMIN_EMAIL` e `ADMIN_PASSWORD`.
2. Envie este `app.py` para o GitHub substituindo o anterior.
3. Faça Manual Deploy -> Deploy latest commit.
4. Entre com exatamente o email e senha configurados no Render.
