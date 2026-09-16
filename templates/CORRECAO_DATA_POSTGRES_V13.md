# V13 — correção do erro 500 após login

O login estava funcionando: o POST /entrar retornou redirecionamento 302 para /admin.

O erro acontecia ao abrir o painel porque o PostgreSQL comparava:
DATE = VARCHAR

Trecho corrigido:
- antes: db.func.date(Appointment.completed_at) == today.isoformat()
- agora: db.func.date(Appointment.completed_at) == today

Também foi corrigida a mesma lógica no Caixa Diário.

Passos:
1. Substitua `app.py` no GitHub.
2. Commit changes.
3. Render -> Manual Deploy -> Deploy latest commit.
4. Quando ficar Live, tente entrar novamente.
