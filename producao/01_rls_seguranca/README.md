# RLS — Row Level Security (Segurança em Nível de Linha)

## O que é e por que usar

RLS é um recurso do Power BI que restringe quais linhas de dados cada usuário pode ver no mesmo dashboard. Em vez de criar um relatório para cada pessoa, você publica um único relatório e o Power BI filtra automaticamente os dados conforme o e-mail de quem está logado.

Pense assim: é como se o dashboard fosse um prédio. Todo mundo entra pela mesma porta, mas o crachá de cada pessoa só abre as salas que ela tem permissão para acessar.

## Nossa hierarquia de acesso

```
Diretoria Comercial ──→ vê TUDO
  └── Diretor de Canal ──→ vê todos os dados do seu canal
        └── Gerente Regional ──→ vê todos os dados da sua regional
              └── Gerente Microrregião ──→ vê os dados da sua microrregião
                    └── Consultor ──→ vê apenas os próprios dados

Planejamento de Vendas (14 pessoas) ──→ vê TUDO
```

## Por que escolhemos o RLS Dinâmico

Existem duas formas de configurar o RLS:

**RLS Estático:** você cria uma função para cada nível (Consultor, Gerente, Diretor...) e adiciona manualmente os e-mails de cada pessoa em cada função no Power BI Service. Funciona, mas é trabalhoso de manter — toda vez que alguém entra, sai, troca de cargo ou cobre férias, você precisa mexer nas configurações do Power BI Service.

**RLS Dinâmico (nossa escolha):** você cria UMA única função no Power BI Desktop e toda a lógica de "quem vê o quê" fica em uma tabela auxiliar dentro do próprio modelo de dados. Quando alguém muda de cargo, cobre férias ou é desligado, você só atualiza a tabela — sem precisar mexer no Power BI Service nunca mais.

## Como funciona na prática

A mágica está em dois elementos trabalhando juntos:

1. **Uma tabela auxiliar** chamada `dSeguranca` (veja a subpasta `tabela_auxiliar/`)
2. **Uma única fórmula DAX** configurada no Power BI Desktop

### A fórmula DAX (única função no Gerenciar Funções)

No Power BI Desktop, vá em **Modelagem → Gerenciar Funções → Nova Função**.

Nome da função: **Acesso Dinamico**

Selecione a tabela **dVendedor** (ou a tabela que contém a coluna com o nome do consultor) e insira a seguinte expressão DAX:

```dax
[Nome Consultor] IN
CALCULATETABLE(
    VALUES( dSeguranca[Consultor_Visivel] ),
    FILTER(
        dSeguranca,
        dSeguranca[Email] = USERPRINCIPALNAME()
        ||
        dSeguranca[Acesso_Total] = TRUE()
    )
)
```

### Como essa fórmula funciona — explicação linha por linha

Vamos ler a fórmula de dentro para fora:

1. **`USERPRINCIPALNAME()`** — essa função retorna automaticamente o e-mail da pessoa que está logada no Power BI Service. Se a Maria abriu o dashboard, retorna `maria@empresa.com`.

2. **`dSeguranca[Email] = USERPRINCIPALNAME()`** — filtra a tabela dSeguranca para encontrar apenas as linhas onde o e-mail bate com o da pessoa logada.

3. **`dSeguranca[Acesso_Total] = TRUE()`** — o operador `||` (OU) garante que, se a pessoa tiver a flag de acesso total marcada como TRUE, ela vê tudo — sem precisar ter uma linha para cada consultor.

4. **`VALUES( dSeguranca[Consultor_Visivel] )`** — pega a lista distinta de consultores que aquela pessoa pode ver.

5. **`CALCULATETABLE(...)`** — executa essa lógica toda e retorna uma tabela virtual com os nomes dos consultores permitidos.

6. **`[Nome Consultor] IN ...`** — filtra a tabela dVendedor para mostrar apenas os consultores que estão nessa lista.

**Resultado:** cada pessoa vê apenas os dados dos consultores que ela tem permissão para ver, conforme definido na tabela dSeguranca.

### O que NÃO precisa mexer na fórmula DAX

Essa fórmula é definitiva. Você nunca mais vai precisar alterar ela. Toda a manutenção é feita na tabela auxiliar dSeguranca.

Situações que NÃO exigem alteração na fórmula:
- Consultor novo entrou na empresa
- Consultor foi desligado
- Gerente saiu de férias e outro está cobrindo
- Nova regional foi criada
- Pessoa do planejamento de vendas mudou

Todas essas situações são resolvidas apenas atualizando a tabela dSeguranca.

## Configuração no Power BI Service (online)

Depois de publicar o relatório:

1. Acesse **app.powerbi.com**
2. Vá no **Workspace** → encontre o **conjunto de dados (dataset)**
3. Clique nos **três pontinhos (...) → Segurança**
4. Você verá a função **"Acesso Dinamico"**
5. Adicione **TODOS os usuários** que acessam o dashboard nessa única função:
   - Todos os consultores
   - Todos os gerentes (micro, regional)
   - Todos os diretores
   - Toda a equipe de planejamento de vendas (14 pessoas)
6. Pronto — a tabela dSeguranca cuida do resto

**Importante:** diferente do RLS estático, aqui você NÃO precisa criar funções separadas. Todo mundo vai na mesma função "Acesso Dinamico". Quem vê o quê é controlado exclusivamente pela tabela dSeguranca.

## Como testar no Power BI Desktop

1. Vá em **Modelagem → Exibir como Funções**
2. Selecione **"Acesso Dinamico"**
3. Em **"Outro usuário"**, digite um e-mail de teste (ex: `joao.consultor@empresa.com`)
4. Clique em **OK**
5. Verifique se o dashboard mostra apenas os dados daquele consultor
6. Repita com e-mails de gerente, diretor e planejamento para validar cada nível

## Cenários comuns de manutenção

| Situação | O que fazer | Onde fazer |
|----------|-------------|------------|
| Novo consultor entrou | Adicionar linhas na dSeguranca com o e-mail de cada gestor que deve vê-lo | Tabela dSeguranca |
| Consultor saiu da empresa | Remover todas as linhas dele na dSeguranca | Tabela dSeguranca |
| Gerente saiu de férias | Adicionar o e-mail do substituto nas linhas dos consultores daquele gerente | Tabela dSeguranca |
| Gerente voltou de férias | Remover o e-mail do substituto (ou manter se quiser acesso compartilhado) | Tabela dSeguranca |
| Novo membro no Planejamento | Adicionar uma linha com o e-mail e Acesso_Total = TRUE | Tabela dSeguranca |
| Alguém mudou de cargo | Atualizar as linhas conforme o novo nível de acesso | Tabela dSeguranca |

Nenhum desses cenários exige alterar a fórmula DAX ou mexer nas configurações do Power BI Service.
