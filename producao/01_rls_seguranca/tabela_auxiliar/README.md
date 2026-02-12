# Tabela Auxiliar — dSeguranca

## O que é essa tabela

A tabela `dSeguranca` é o coração do RLS dinâmico. Ela define quem pode ver os dados de quem. Cada linha da tabela representa uma permissão: "o e-mail X pode ver os dados do consultor Y".

## Estrutura da tabela

| Coluna | Tipo | Descrição |
|--------|------|-----------|
| Email | Texto | E-mail corporativo da pessoa (o que ela usa para logar no Power BI) |
| Consultor_Visivel | Texto | Nome do consultor cujos dados essa pessoa pode ver (deve bater exatamente com a coluna `Nome Consultor` da tabela dVendedor) |
| Nivel | Texto | Nível hierárquico da pessoa (Consultor, Gerente Micro, Gerente Regional, Diretor Canal, Diretoria, Planejamento) |
| Acesso_Total | Verdadeiro/Falso | Se TRUE, a pessoa vê todos os dados — a fórmula DAX ignora o filtro de Consultor_Visivel |

## Relacionamento no modelo de dados

A tabela `dSeguranca` **NÃO precisa de relacionamento direto** com nenhuma outra tabela no modelo. A fórmula DAX no RLS faz a ponte entre `dSeguranca[Consultor_Visivel]` e `dVendedor[Nome Consultor]` usando o operador `IN`.

Isso é intencional — mantemos a tabela isolada para não interferir nos filtros e cálculos do modelo.

## Como a tabela é preenchida — exemplos por nível

### Consultor

O consultor João só pode ver seus próprios dados — uma única linha:

| Email | Consultor_Visivel | Nivel | Acesso_Total |
|-------|-------------------|-------|-------------|
| joao@empresa.com | João Silva | Consultor | FALSE |

### Gerente de Microrregião

A gerente Maria gerencia 3 consultores — ela precisa de uma linha para cada:

| Email | Consultor_Visivel | Nivel | Acesso_Total |
|-------|-------------------|-------|-------------|
| maria@empresa.com | João Silva | Gerente Micro | FALSE |
| maria@empresa.com | Ana Pereira | Gerente Micro | FALSE |
| maria@empresa.com | Carlos Lima | Gerente Micro | FALSE |

### Gerente Regional

O gerente Pedro gerencia 2 microrregiões (6 consultores no total):

| Email | Consultor_Visivel | Nivel | Acesso_Total |
|-------|-------------------|-------|-------------|
| pedro@empresa.com | João Silva | Gerente Regional | FALSE |
| pedro@empresa.com | Ana Pereira | Gerente Regional | FALSE |
| pedro@empresa.com | Carlos Lima | Gerente Regional | FALSE |
| pedro@empresa.com | Roberto Dias | Gerente Regional | FALSE |
| pedro@empresa.com | Lucia Ramos | Gerente Regional | FALSE |
| pedro@empresa.com | Marcos Souza | Gerente Regional | FALSE |

### Diretor de Canal e Diretoria Comercial

Mesmo padrão: uma linha para cada consultor que a pessoa pode ver. Quanto mais alto o nível hierárquico, mais linhas essa pessoa terá.

### Planejamento de Vendas (acesso total)

As 14 pessoas do planejamento precisam ver tudo. Em vez de criar centenas de linhas (uma para cada consultor), usamos a flag `Acesso_Total`:

| Email | Consultor_Visivel | Nivel | Acesso_Total |
|-------|-------------------|-------|-------------|
| planejamento01@empresa.com | (pode deixar vazio ou qualquer valor) | Planejamento | TRUE |
| planejamento02@empresa.com | (pode deixar vazio ou qualquer valor) | Planejamento | TRUE |
| ... | ... | ... | TRUE |

Com `Acesso_Total = TRUE`, a fórmula DAX pula o filtro de Consultor_Visivel e mostra todos os dados. Uma linha por pessoa é suficiente.

## Onde essa tabela deve ficar (fonte de dados)

| Opção | Onde fica | Vantagem | Desvantagem |
|-------|----------|----------|-------------|
| **Excel no SharePoint** | Planilha compartilhada no SharePoint | Fácil de editar por qualquer gestor | Risco de edição acidental |
| **Tabela no SQL Server** | Banco de dados relacional | Controle total, auditoria, histórico | Precisa de alguém com acesso ao banco |
| **Tabela no próprio Power BI** | Inserida manualmente no Power Query | Rápida para projetos pequenos | Precisa republicar a cada mudança |

**Recomendação para produção:** use uma **tabela no SQL Server** ou um **Excel no SharePoint**. Assim a manutenção não depende de republicar o relatório — basta atualizar a tabela e esperar o próximo refresh dos dados.

## Cenário de férias — como funciona na prática

**Situação:** a gerente Maria (`maria@empresa.com`) saiu de férias. O gerente Lucas (`lucas@empresa.com`) vai cobrir a microrregião dela.

**O que fazer:** adicione na tabela dSeguranca as mesmas linhas da Maria, mas com o e-mail do Lucas:

| Email | Consultor_Visivel | Nivel | Acesso_Total |
|-------|-------------------|-------|-------------|
| lucas@empresa.com | João Silva | Gerente Micro (cobertura) | FALSE |
| lucas@empresa.com | Ana Pereira | Gerente Micro (cobertura) | FALSE |
| lucas@empresa.com | Carlos Lima | Gerente Micro (cobertura) | FALSE |

**Não precisa remover as linhas da Maria** — ela continua com acesso caso precise consultar algo. Se quiser bloquear temporariamente, aí sim remova.

**Quando a Maria voltar:** remova as linhas de cobertura do Lucas (se ele não deve mais ver aqueles dados).

**O que NÃO precisa fazer em nenhum desses cenários:**
- Não mexe na fórmula DAX
- Não mexe no Power BI Service
- Não precisa republicar o relatório
- Basta atualizar a tabela e aguardar o próximo refresh
