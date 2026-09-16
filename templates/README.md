# Boston Car Wash — V3

Esta versão volta para a identidade visual original do primeiro site e foca em gestão real do lava rápido.

## O que foi removido
- Não existe módulo de estoque.
- Não existe controle de quantidade de produtos.

Compras de shampoo, cera, panos, produtos de limpeza e outros materiais entram simplesmente como **despesas** no financeiro, na categoria "Produtos / insumos".

## Site público
- Visual original escuro/azul do primeiro site
- Serviços e preços
- Diferenciais
- Endereço
- Área do cliente
- Área administrativa

## Área do cliente
- Cadastro e login
- Cadastro de vários veículos
- Agendamento
- Histórico
- Status dos atendimentos

## Administração
### Visão geral
- Entradas de hoje
- Gastos de hoje
- Resultado de hoje
- Faturamento do mês
- Despesas do mês
- Lucro líquido
- Número de clientes
- Agendamentos em aberto e futuros

### Caixa diário
- Valor de abertura
- Entradas
- Saídas
- Saldo esperado
- Fechamento
- Diferença entre sistema e dinheiro contado
- Observações

### Financeiro
- Receitas manuais
- Despesas
- Produtos / insumos como despesa
- Água, energia, aluguel, manutenção, marketing, impostos etc.
- Forma de pagamento
- Filtro por mês
- Lucro líquido
- Lançamentos automáticos de serviços concluídos

### Clientes
- Nome
- Telefone e e-mail
- Veículos
- Quantidade de visitas
- Total gasto em serviços concluídos

### Funcionários
- Nome, função e telefone
- Porcentagem de comissão
- Valor gerado no mês
- Comissão do mês
- Ativar / desativar funcionário

### Agendamentos
- Funcionário responsável
- Status do atendimento
- Ao concluir:
  - receita entra automaticamente
  - comissão do funcionário entra automaticamente como despesa

### Relatórios
- Faturamento
- Gastos
- Lucro
- Serviços concluídos
- Ticket médio
- Receita por serviço
- Gastos por categoria
- Comissões
- Exportação para Excel (.xlsx)

## Login inicial do administrador
E-mail: `admin@bostoncarwash.local`
Senha: `TroqueEssaSenha123!`

Troque a senha antes de publicar.

## Rodar no Windows

```bash
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

Abra:
`http://127.0.0.1:5000`

## Observação
Esta V3 usa uma estrutura de banco diferente da V1/V2. Para testar do zero, use a pasta nova e deixe o sistema criar um novo `boston.db`.


## V4 — efeitos visuais adicionados
- Cursor personalizado com ponto + aro suave
- Halo de luz acompanhando o mouse
- Efeito de clique em forma de onda
- Cards com efeito 3D/tilt e luz seguindo o mouse
- Botões com efeito magnético
- Animações suaves ao rolar a página
- Hero com parallax do mouse
- Navbar que muda ao rolar
- Brilho/reflexo animado em botões e imagem principal
- Fundo com iluminação ambiente animada
- Hover premium em tabelas, métricas, cards e imagens
- Respeita `prefers-reduced-motion`
- Efeitos de cursor desativados automaticamente em celular/touch


## V5 — edição rápida de valores
Na administração, em **Serviços**, cada preço agora tem uma caneta `✎` ao lado.
Clique na caneta, digite o novo valor e pressione **Salvar**. O preço novo passa a aparecer automaticamente no site e é usado nos próximos agendamentos.


## V6 — Minha Área mais completa + conclusão financeira
- A página principal da administração virou uma central de operação diária.
- Mostra entradas, gastos, resultado do dia e dinheiro físico em caixa.
- Mostra recebimentos separados por Pix, Dinheiro, Cartão e Outros.
- Atendimentos do dia aparecem direto na tela inicial.
- É possível informar:
  - valor final do serviço
  - forma de pagamento
  - funcionário responsável
- Botão **Concluir + lançar no dia**:
  - muda o atendimento para concluído
  - registra a receita automaticamente
  - aumenta o movimento financeiro daquele dia
  - atualiza o resultado diário
  - se for pagamento em Dinheiro, aumenta também o saldo físico esperado do caixa
  - calcula e registra comissão do funcionário, quando configurada
- O Caixa Diário agora separa:
  - movimento total do negócio
  - dinheiro físico em espécie
  - Pix
  - cartão
  - outros meios
- A agenda completa também permite concluir e lançar qualquer atendimento sem precisar voltar ao dashboard.

Isso evita misturar dinheiro físico com Pix/cartão e deixa o fechamento diário mais correto.


## V7 — valores por pagamento editáveis + clientes recorrentes

### Pagamentos clicáveis
No painel principal e no Caixa Diário:
- clique em **Pix, Dinheiro, Cartão, Transferência ou Outro**
- aparece um campo para editar o valor manual daquele meio de pagamento
- enquanto digita, a prévia do total é recalculada na tela
- ao salvar, receitas, resultado do dia e dinheiro físico são recalculados automaticamente
- em **Dinheiro**, o lançamento também entra no saldo físico esperado
- valor `0` remove aquele lançamento manual do dia

Os serviços concluídos continuam sendo lançados automaticamente e ficam separados dos ajustes manuais.

### Cadastro manual de clientes
A administração pode cadastrar um cliente mesmo que ele ainda não tenha criado conta pelo site:
- nome
- telefone / WhatsApp
- e-mail opcional

### Clientes semanais / mensais
Ao cadastrar ou editar um cliente, é possível criar planos:
- semanal
- quinzenal
- mensal
- bimestral
- serviço vinculado
- valor combinado
- próxima data
- observações

O botão **Avançar data** calcula a próxima visita automaticamente de acordo com a frequência.
Também é possível pausar e reativar o plano.


## V8 — pronto para Render + PostgreSQL

Esta versão está preparada para produção no Render.

### O que mudou
- suporte a PostgreSQL
- `render.yaml` incluído
- `gunicorn` configurado para produção
- `SECRET_KEY` via variável de ambiente
- login inicial da administração via:
  - `ADMIN_EMAIL`
  - `ADMIN_PASSWORD`
- cookies seguros quando estiver em produção
- mantém SQLite somente para teste local
- todos os dados reais (clientes, caixa, pagamentos, planos, serviços, funcionários) ficam no PostgreSQL em produção

### Importante
No Render, configure:
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`

O `SECRET_KEY` e o `DATABASE_URL` podem ser provisionados automaticamente pelo Blueprint incluído.
