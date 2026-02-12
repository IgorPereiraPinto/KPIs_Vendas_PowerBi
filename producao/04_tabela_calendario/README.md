# Tabela dCalendario — Calendário para Análises Temporais

## O problema que queremos resolver

Toda análise temporal no Power BI — comparação com o ano anterior (YOY), acumulado do mês (MTD), acumulado do trimestre (QTD), acumulado do ano (YTD) — depende de uma tabela de calendário bem construída.

Sem ela, funções como `SAMEPERIODLASTYEAR`, `DATEADD`, `TOTALYTD` e `DATESYTD` simplesmente não funcionam. O Power BI precisa de uma tabela de datas contínua (sem "buracos") e marcada como tabela de datas para que a inteligência temporal funcione corretamente.

## Por que não usar a tabela de datas automática do Power BI

O Power BI cria uma tabela de datas oculta automaticamente para cada coluna de data. O problema é que:

- Ela é oculta — você não consegue customizá-la
- Ela não tem campos úteis como trimestre, semestre, dia útil, flag de data com venda
- Ela pode gerar comportamentos inesperados em medidas DAX
- Profissionais de BI sempre criam sua própria tabela — é uma boa prática consolidada no mercado

## A fórmula DAX — tabela dCalendario completa

No Power BI Desktop, vá em **Modelagem → Nova Tabela** e cole a seguinte fórmula:

```dax
dCalendario =
VAR DataMinima = MIN( fVendas[Data Venda] )
VAR DataMaxima = MAX( fVendas[Data Venda] )
VAR TabelaBase = CALENDAR( DATE( YEAR(DataMinima), 1, 1 ), DATE( YEAR(DataMaxima), 12, 31 ) )
RETURN
    ADDCOLUMNS(
        TabelaBase,

        -- ══════════════════════════════════
        -- IDENTIFICADORES
        -- ══════════════════════════════════
        "Id Data", [Date],
        "Ano", YEAR( [Date] ),
        "Mês Número", MONTH( [Date] ),
        "Dia", DAY( [Date] ),
        "Dia do Ano", DATEDIFF( DATE( YEAR([Date]), 1, 1 ), [Date], DAY ) + 1,

        -- ══════════════════════════════════
        -- NOMES E RÓTULOS
        -- ══════════════════════════════════
        "Mês Nome", FORMAT( [Date], "MMMM" ),
        "Mês Nome Curto", FORMAT( [Date], "MMM" ),
        "Ano-Mês", FORMAT( [Date], "YYYY-MM" ),
        "Dia da Semana Número", WEEKDAY( [Date], 2 ),
        "Dia da Semana Nome", FORMAT( [Date], "DDDD" ),
        "Dia da Semana Curto", FORMAT( [Date], "DDD" ),

        -- ══════════════════════════════════
        -- AGRUPAMENTOS TEMPORAIS
        -- ══════════════════════════════════
        "Trimestre Número", QUARTER( [Date] ),
        "Trimestre", "T" & FORMAT( QUARTER( [Date] ), "0" ),
        "Ano-Trimestre", YEAR( [Date] ) & "-T" & FORMAT( QUARTER( [Date] ), "0" ),
        "Semestre Número", IF( MONTH( [Date] ) <= 6, 1, 2 ),
        "Semestre", "S" & IF( MONTH( [Date] ) <= 6, "1", "2" ),
        "Semana ISO", WEEKNUM( [Date], 21 ),

        -- ══════════════════════════════════
        -- FLAGS ÚTEIS PARA FILTROS
        -- ══════════════════════════════════
        "É Dia Útil", IF( WEEKDAY( [Date], 2 ) <= 5, TRUE(), FALSE() ),
        "É Fim de Semana", IF( WEEKDAY( [Date], 2 ) > 5, TRUE(), FALSE() ),

        "Datas com Venda",
            IF(
                COUNTROWS(
                    FILTER( fVendas, fVendas[Data Venda] = [Date] )
                ) > 0,
                TRUE(),
                FALSE()
            ),

        -- ══════════════════════════════════
        -- ORDENAÇÃO (para visuais do Power BI)
        -- ══════════════════════════════════
        "Mês Ordem", YEAR( [Date] ) * 100 + MONTH( [Date] ),
        "Trimestre Ordem", YEAR( [Date] ) * 10 + QUARTER( [Date] )
    )
```

## Explicação da fórmula — parte por parte

### Variáveis iniciais

```dax
VAR DataMinima = MIN( fVendas[Data Venda] )
VAR DataMaxima = MAX( fVendas[Data Venda] )
```

Essas duas linhas buscam a data mais antiga e a data mais recente da tabela de vendas. Usamos elas para definir o período que o calendário vai cobrir. Assim o calendário se adapta automaticamente conforme novos dados entram.

### Geração da tabela base

```dax
VAR TabelaBase = CALENDAR( DATE( YEAR(DataMinima), 1, 1 ), DATE( YEAR(DataMaxima), 12, 31 ) )
```

A função `CALENDAR` gera uma tabela com uma linha para cada dia entre duas datas. Começamos no dia 1º de janeiro do ano mais antigo e terminamos no dia 31 de dezembro do ano mais recente.

Por que anos completos? Porque funções como `SAMEPERIODLASTYEAR` precisam de anos completos para funcionar. Se suas vendas começaram em março de 2019, o calendário mesmo assim começa em janeiro de 2019.

### Colunas de identificação

- **Id Data** — a data pura, que será a FK (chave estrangeira) para relacionar com `fVendas[Data Venda]`
- **Ano, Mês Número, Dia** — componentes básicos da data, usados em filtros e cálculos

### Colunas de nome e rótulo

- **Mês Nome** — "Janeiro", "Fevereiro"... para exibir nos visuais
- **Mês Nome Curto** — "Jan", "Fev"... para gráficos com espaço limitado
- **Ano-Mês** — "2024-01" para ordenação e agrupamento
- **Dia da Semana** — para análises como "vendas por dia da semana"

### Agrupamentos temporais

- **Trimestre** — "T1", "T2", "T3", "T4" para análises trimestrais
- **Semestre** — "S1", "S2" para análises semestrais
- **Semana ISO** — número da semana seguindo o padrão internacional (ISO 8601), onde a semana começa na segunda-feira

### Flags úteis

- **É Dia Útil** — TRUE se for de segunda a sexta. Útil para calcular médias de faturamento em dias úteis
- **É Fim de Semana** — TRUE se for sábado ou domingo
- **Datas com Venda** — TRUE se existir pelo menos uma venda naquele dia. Essa flag é essencial para funções como `SAMEPERIODLASTYEAR`, porque evita que o Power BI tente comparar com datas que não têm dados

### Colunas de ordenação

- **Mês Ordem** — um número como 202401, 202402... que garante que os meses apareçam na ordem correta nos visuais (sem isso, o Power BI ordena "Abril" antes de "Janeiro" porque é ordem alfabética)
- **Trimestre Ordem** — mesma lógica para trimestres

## Configurações obrigatórias após criar a tabela

### 1. Marcar como tabela de datas

1. Selecione a tabela `dCalendario` no painel de dados
2. Vá em **Ferramentas de Tabela → Marcar como tabela de datas**
3. Selecione a coluna **"Id Data"** como a coluna de data
4. Clique em **OK**

Sem essa marcação, as funções de inteligência temporal (SAMEPERIODLASTYEAR, DATEADD, TOTALYTD, etc.) podem não funcionar corretamente.

### 2. Criar o relacionamento

1. Vá em **Modelo** (ícone de diagrama na barra lateral)
2. Arraste `dCalendario[Id Data]` até `fVendas[Data Venda]`
3. Configure:
   - Cardinalidade: **Um para Muitos** (1:N)
   - Direção do filtro: **Única** (de dCalendario para fVendas)
   - Marque: **Ativa**

### 3. Configurar ordenação dos meses

Para que "Janeiro" apareça antes de "Fevereiro" nos visuais:

1. Selecione a coluna **"Mês Nome"** na tabela dCalendario
2. Vá em **Ferramentas de Coluna → Classificar por Coluna**
3. Selecione **"Mês Número"**
4. Repita para **"Mês Nome Curto"** (classificar por "Mês Número")
5. Repita para **"Dia da Semana Nome"** (classificar por "Dia da Semana Número")
6. Repita para **"Trimestre"** (classificar por "Trimestre Número")

### 4. Desativar a tabela de datas automática (recomendado)

Como criamos nossa própria tabela de calendário, a tabela automática do Power BI é desnecessária e só consome memória:

1. Vá em **Arquivo → Opções e Configurações → Opções**
2. Em **Arquivo Atual → Carregamento de Dados**
3. Desmarque **"Tabela de datas/hora automática"**
4. Clique em **OK**

## Medidas que dependem dessa tabela

Todas as medidas temporais do projeto dependem da dCalendario:

| Medida | Função DAX utilizada | Precisa de dCalendario? |
|--------|---------------------|------------------------|
| Faturamento LY | SAMEPERIODLASTYEAR | Sim — usa dCalendario[Id Data] |
| Faturamento YOY | Usa Faturamento LY | Sim (indiretamente) |
| Margem LY | SAMEPERIODLASTYEAR + flag Datas com Venda | Sim |
| Comissao LY | SAMEPERIODLASTYEAR + flag Datas com Venda | Sim |
| Resultado LY | SAMEPERIODLASTYEAR | Sim |
| Qualquer acumulado YTD/MTD/QTD | TOTALYTD, TOTALMTD, TOTALQTD | Sim |

A flag **"Datas com Venda"** é especialmente importante nas medidas LY que usam `CALCULATETABLE` com `dCalendario[Datas com Venda] = TRUE()`. Ela garante que o SAMEPERIODLASTYEAR compare apenas com datas que realmente tiveram vendas, evitando distorções.
