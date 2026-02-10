# Catálogo de Medidas DAX

> **Observação:** Medidas abaixo são um **modelo** baseado em padrões de mercado. Ajustar nomes de tabelas/colunas conforme o PBIX. (validar no PBIX)

## Medidas principais
```DAX
Vendas := SUM ( Fato_Vendas[Valor_Venda] )
Custo := SUM ( Fato_Vendas[Custo] )
Quantidade := SUM ( Fato_Vendas[Quantidade] )
Margem := [Vendas] - [Custo]
Margem % := DIVIDE ( [Margem], [Vendas] )
Resultado := [Margem]  -- ou outra regra de negócio (validar no PBIX)
```

## Metas
```DAX
Meta Vendas := SUM ( Dim_Meta[Meta_Valor] )
Gap Meta := [Vendas] - [Meta Vendas]
Atingimento % := DIVIDE ( [Vendas], [Meta Vendas] )
```

## Inteligência de tempo
```DAX
Vendas YTD := TOTALYTD ( [Vendas], Dim_Data[Data] )
Vendas LY := CALCULATE ( [Vendas], SAMEPERIODLASTYEAR ( Dim_Data[Data] ) )
Vendas YoY % := DIVIDE ( [Vendas] - [Vendas LY], [Vendas LY] )
Vendas MoM % :=
VAR Vendas_Prior = CALCULATE ( [Vendas], DATEADD ( Dim_Data[Data], -1, MONTH ) )
RETURN DIVIDE ( [Vendas] - Vendas_Prior, Vendas_Prior )
```

## Indicadores por dimensão (exemplos)
```DAX
Vendas por Cidade := [Vendas]
Vendas por Categoria := [Vendas]
Vendas por Vendedor := [Vendas]
```

## Notas
- Garantir hierarquia de datas corretamente marcada no modelo.
- Revisar se há tabela de metas e sua granularidade.

---

## Medidas do projeto (PBIX)

> **Observação:** Seção adicionada para documentar as medidas reais do projeto, mantendo o conteúdo anterior intacto.

### 01.Principais

#### Abatimento
- **Descrição:** Soma dos componentes de abatimento da venda.
- **Usa:** `[Custo]`, `[Despesa]`, `[Impostos]`, `[Comissao]`
- **Observações:** Depende das medidas base com filtro `dStatus[Id Status] = 1`.
```DAX
Abatimento = 
    [Custo] + [Despesa] + [Impostos] + [Comissao]
```

#### Comissao
- **Descrição:** Calcula comissão total com base em quantidade e comissão unitária.
- **Usa:** colunas de `fVendas`.
- **Observações:** Aplica filtro `dStatus[Id Status] = 1`.
```DAX
Comissao = 
    CALCULATE(
           SUMX(
            fVendas,
            fVendas[Qtde] * fVendas[Comissão Unit]
        ),
        dStatus[Id Status] = 1 
    )
```

#### Custo
- **Descrição:** Calcula custo total com base em quantidade e custo unitário.
- **Usa:** colunas de `fVendas`.
- **Observações:** Aplica filtro `dStatus[Id Status] = 1`.
```DAX
Custo = 
    CALCULATE(
        SUMX(
            fVendas,
            fVendas[Qtde] * fVendas[Custo Unit]
        ),
        dStatus[Id Status] = 1 
    )
```

#### Despesa
- **Descrição:** Calcula despesa total com base em quantidade e despesa unitária.
- **Usa:** colunas de `fVendas`.
- **Observações:** Aplica filtro `dStatus[Id Status] = 1`.
```DAX
Despesa = 
    CALCULATE(
        SUMX(
            fVendas,
            fVendas[Qtde] * fVendas[Despesa Unit]
        ),
        dStatus[Id Status] = 1 
    )
```

#### Diferença Meta
- **Descrição:** Diferença absoluta entre faturamento e meta.
- **Usa:** `[Faturamento]`, `[Meta]`
- **Observações:** Valor positivo indica acima da meta.
```DAX
Diferença Meta = 
[Faturamento] - [Meta]
```

#### Faturamento
- **Descrição:** Calcula faturamento total com base em quantidade e valor unitário.
- **Usa:** colunas de `fVendas`.
- **Observações:** Aplica filtro `dStatus[Id Status] = 1`.
```DAX
Faturamento = 
    CALCULATE(
        SUMX(
            fVendas,
            fVendas[Qtde] * fVendas[Valor Unit]
        ),
        dStatus[Id Status] = 1
    )
```

#### Impostos
- **Descrição:** Calcula impostos totais com base em quantidade e imposto unitário.
- **Usa:** colunas de `fVendas`.
- **Observações:** Aplica filtro `dStatus[Id Status] = 1`.
```DAX
Impostos = 
    CALCULATE(
        SUMX(
            fVendas,
            fVendas[Qtde] * fVendas[Impostos Unit]
        ),
        dStatus[Id Status] = 1 
    )
```

#### Margem
- **Descrição:** Percentual de margem sobre o faturamento.
- **Usa:** `[Resultado]`, `[Faturamento]`
- **Observações:** Utiliza `DIVIDE` para evitar erro de divisão por zero.
```DAX
Margem = 
    DIVIDE([Resultado],[Faturamento])
```

#### Meta
- **Descrição:** Soma do valor de meta.
- **Usa:** coluna `fMetas[Valor Meta]`.
- **Observações:** Sem filtro explícito na medida.
```DAX
Meta = SUM(fMetas[Valor Meta])
```

#### Porcentagem Meta
- **Descrição:** Percentual de atingimento da meta.
- **Usa:** `[Faturamento]`, `[Meta]`
- **Observações:** Retorna `0` como valor alternativo quando denominador é zero.
```DAX
Porcentagem Meta = 
DIVIDE([Faturamento],[Meta],0)
```

#### Positivação Clientes
- **Descrição:** Quantidade de clientes que efetuaram compras.
- **Usa:** coluna `fVendas[Id Cliente]`.
- **Observações:** Distinct count de clientes na fato.
```DAX
Positivação Clientes = 
// Refere-se a Qtde de clientes que efetuaram compras 
        DISTINCTCOUNT(fVendas[Id Cliente])
```

#### Positivação Produtos
- **Descrição:** Quantidade de produtos com venda.
- **Usa:** coluna `fVendas[Id Produto]`.
- **Observações:** Distinct count de produtos na fato.
```DAX
Positivação Produtos = DISTINCTCOUNT(fVendas[Id Produto])
```

#### Qtde Vendas
- **Descrição:** Quantidade de vendas realizadas.
- **Usa:** coluna `fVendas[Num Venda]`.
- **Observações:** Distinct count do número da venda.
```DAX
Qtde Vendas = DISTINCTCOUNT(fVendas[Num Venda])
```

#### Resultado
- **Descrição:** Resultado líquido após abatimentos.
- **Usa:** `[Faturamento]`, `[Abatimento]`
- **Observações:** Medida base para margem e variações temporais.
```DAX
Resultado = 
    [Faturamento] - [Abatimento]
```

### 02.Temporais

#### Comissao DoD
- **Descrição:** Variação diária percentual da comissão.
- **Usa:** `[Comissao]`
- **Observações:** Usa `OFFSET` sobre `ALLSELECTED(dCalendario[Dia])` com filtro de valor positivo.
```DAX
Comissao DoD = 

VAR vComissao_dia_anterior= 
    CALCULATE( 
        [Comissao], 
        OFFSET( -1, FILTER( ALLSELECTED(dCalendario[Dia]), [Comissao] > 0 ) ) 
    ) 

RETURN 
    DIVIDE( [Comissao] - vComissao_dia_anterior, vComissao_dia_anterior )
```

#### Comissao LY
- **Descrição:** Comissão no mesmo período do ano anterior.
- **Usa:** `[Comissao]`
- **Observações:** Usa `SAMEPERIODLASTYEAR` e filtro `dCalendario[Datas com Venda] = TRUE()`.
```DAX
Comissao LY = 
CALCULATE(
    [Comissao],
    CALCULATETABLE(
        SAMEPERIODLASTYEAR( dCalendario[Id Data] ),
        dCalendario[Datas com Venda] = TRUE()
    )
)
```

#### Comissao MoM %
- **Descrição:** Variação mensal percentual da comissão.
- **Usa:** `[Comissao]`
- **Observações:** Usa `DATEADD(..., -1, MONTH)` com filtro de datas com venda.
```DAX
Comissao MoM % = 

VAR vComissao_MoM = 
    CALCULATE(
        [Comissao],
        CALCULATETABLE(
            DATEADD( dCalendario[Id Data], -1, MONTH ),
            dCalendario[Datas com Venda] = TRUE()
        )
    )

RETURN 
    DIVIDE( 
         [Comissao] - vComissao_MoM,
         vComissao_MoM
    )
```

#### Comissao YoY %
- **Descrição:** Variação anual percentual da comissão.
- **Usa:** `[Comissao]`, `[Comissao LY]`
- **Observações:** Compara com medida de ano anterior.
```DAX
Comissao YoY % = 

VAR Valor_last_year = [Comissao LY]

RETURN 
    DIVIDE(
        [Comissao] - Valor_last_year,
        Valor_last_year
    )
```

#### Faturamento Acumulado
- **Descrição:** Faturamento acumulado no ano (YTD).
- **Usa:** `[Faturamento]`
- **Observações:** Usa `DATESYTD` com filtro de datas com venda.
```DAX
Faturamento Acumulado = 
    CALCULATE(
        [Faturamento],
        CALCULATETABLE(
            DATESYTD(dCalendario[Id Data]),
            dCalendario[Datas com Venda] = TRUE()
        )
    )
```

#### Faturamento DoD
- **Descrição:** Variação diária percentual do faturamento.
- **Usa:** `[Faturamento]`
- **Observações:** Usa `OFFSET` sobre `ALLSELECTED(dCalendario[Dia])` com filtro de valor positivo.
```DAX
Faturamento DoD = 

VAR vFaturamento_dia_anterior= 
    CALCULATE( 
        [Faturamento], 
        OFFSET( -1, FILTER( ALLSELECTED(dCalendario[Dia]), [Faturamento] > 0 ) ) 
    ) 

RETURN 
    DIVIDE( [Faturamento] - vFaturamento_dia_anterior, vFaturamento_dia_anterior )
```

#### Faturamento LY
- **Descrição:** Faturamento no mesmo período do ano anterior.
- **Usa:** `[Faturamento]`
- **Observações:** Usa `SAMEPERIODLASTYEAR` e filtro de datas com venda.
```DAX
Faturamento LY = 
CALCULATE(
    [Faturamento],
    CALCULATETABLE(
        SAMEPERIODLASTYEAR( dCalendario[Id Data] ),
        dCalendario[Datas com Venda] = TRUE()
    )
)
```

#### Faturamento LY Acumulado
- **Descrição:** Faturamento acumulado YTD do ano anterior.
- **Usa:** `[Faturamento]`
- **Observações:** Combina `DATESYTD` com `SAMEPERIODLASTYEAR` e filtro de datas com venda.
```DAX
Faturamento LY Acumulado = 
    CALCULATE(
        [Faturamento],
        CALCULATETABLE(
            DATESYTD(  SAMEPERIODLASTYEAR(dCalendario[Id Data]) ),
            dCalendario[Datas com Venda] = TRUE()
        )
    )
```

#### Faturamento MoM %
- **Descrição:** Variação mensal percentual do faturamento.
- **Usa:** `[Faturamento]`
- **Observações:** Usa `DATEADD(..., -1, MONTH)` com filtro de datas com venda.
```DAX
Faturamento MoM % = 

VAR vFaturamento_MoM = 
    CALCULATE(
        [Faturamento],
        CALCULATETABLE(
            DATEADD( dCalendario[Id Data], -1, MONTH ),
            dCalendario[Datas com Venda] = TRUE()
        )
    )

RETURN 
    DIVIDE( 
         [Faturamento] - vFaturamento_MoM,
         vFaturamento_MoM
    )
```

#### Faturamento YoY %
- **Descrição:** Variação anual percentual do faturamento.
- **Usa:** `[Faturamento]`, `[Faturamento LY]`
- **Observações:** Compara com medida de ano anterior.
```DAX
Faturamento YoY % = 

VAR Valor_last_year = [Faturamento LY]

RETURN 
    DIVIDE(
        [Faturamento] - Valor_last_year,
        Valor_last_year
    )
```

#### Margem LM
- **Descrição:** Margem no mês anterior.
- **Usa:** `[Margem]`
- **Observações:** Usa `DATEADD(..., -1, MONTH)` e datas com venda.
```DAX
Margem LM = 
CALCULATE(
    [Margem],
    CALCULATETABLE(
        DATEADD( dCalendario[Id Data], -1, MONTH ),
        dCalendario[Datas com Venda] = TRUE()
    )
)
```

#### Margem LY
- **Descrição:** Margem no mesmo período do ano anterior.
- **Usa:** `[Margem]`
- **Observações:** Usa `SAMEPERIODLASTYEAR` e datas com venda.
```DAX
Margem LY = 
CALCULATE(
    [Margem],
    CALCULATETABLE(
        SAMEPERIODLASTYEAR( dCalendario[Id Data] ),
        dCalendario[Datas com Venda] = TRUE()
    )
)
```

#### Margem MoM %
- **Descrição:** Variação mensal percentual da margem.
- **Usa:** `[Margem]`
- **Observações:** Usa comparação com mês anterior via `DATEADD`.
```DAX
Margem MoM % = 

VAR vMargem_MoM = 
    CALCULATE(
        [Margem],
        CALCULATETABLE(
            DATEADD( dCalendario[Id Data], -1, MONTH ),
            dCalendario[Datas com Venda] = TRUE()
        )
    )

RETURN 
    DIVIDE( 
         [Margem] - vMargem_MoM,
         vMargem_MoM
    )
```

#### Margem YoY %
- **Descrição:** Variação anual percentual da margem.
- **Usa:** `[Margem]`, `[Margem LY]`
- **Observações:** Compara com valor do ano anterior.
```DAX
Margem YoY % = 
   VAR Valor_last_year = [Margem LY]

RETURN 
    DIVIDE(
        [Margem] - Valor_last_year,
        Valor_last_year
    )
```

#### Resultado LM
- **Descrição:** Resultado no mês anterior.
- **Usa:** `[Resultado]`
- **Observações:** Usa `DATEADD(..., -1, MONTH)` e datas com venda.
```DAX
Resultado  LM = 
CALCULATE(
    [Resultado],
    CALCULATETABLE(
        DATEADD( dCalendario[Id Data], -1, MONTH ),
        dCalendario[Datas com Venda] = TRUE()
    )
)
```

#### Resultado DoD
- **Descrição:** Variação diária percentual do resultado.
- **Usa:** `[Resultado]`
- **Observações:** Usa `OFFSET` sobre `ALLSELECTED(dCalendario[Dia])` com filtro de valor positivo.
```DAX
Resultado DoD = 

VAR vResultado_dia_anterior= 
    CALCULATE( 
        [Resultado], 
        OFFSET( -1, FILTER( ALLSELECTED(dCalendario[Dia]), [Resultado] > 0 ) ) 
    ) 

RETURN 
    DIVIDE( [Resultado] - vResultado_dia_anterior, vResultado_dia_anterior )
```

#### Resultado LY
- **Descrição:** Resultado no mesmo período do ano anterior.
- **Usa:** `[Resultado]`
- **Observações:** Usa `SAMEPERIODLASTYEAR` e filtro de datas com venda.
```DAX
Resultado LY = 
CALCULATE(
    [Resultado],
    CALCULATETABLE(
        SAMEPERIODLASTYEAR( dCalendario[Id Data] ),
        dCalendario[Datas com Venda] = TRUE()
    )
)
```

#### Resultado MoM %
- **Descrição:** Variação mensal percentual do resultado.
- **Usa:** `[Resultado]`
- **Observações:** Usa comparação com mês anterior via `DATEADD`.
```DAX
Resultado MoM % = 

VAR vResultado_MoM = 
    CALCULATE(
        [Resultado],
        CALCULATETABLE(
            DATEADD( dCalendario[Id Data], -1, MONTH ),
            dCalendario[Datas com Venda] = TRUE()
        )
    )

RETURN 
    DIVIDE( 
         [Resultado] - vResultado_MoM,
         vResultado_MoM
    )
```

#### Resultado YoY %
- **Descrição:** Variação anual percentual do resultado.
- **Usa:** `[Resultado]`, `[Resultado LY]`
- **Observações:** Compara com valor do ano anterior.
```DAX
Resultado YoY % = 

VAR Valor_last_year = [Resultado LY]

RETURN 
    DIVIDE(
        [Resultado] - Valor_last_year,
        Valor_last_year
    )
```

### Medidas com Seta

#### Comissao YOY Card
- **Descrição:** Texto formatado para cartão com seta de direção do YoY de comissão.
- **Usa:** `[Comissao YoY %]`
- **Observações:** Retorna BLANK quando valor é nulo.
```DAX
Comissao YOY Card = 
VAR Valor = [Comissao YoY %]
VAR Seta = IF(Valor >= 0, "▲ ", "▼ ")
RETURN
    IF(
        NOT ISBLANK(Valor),
        Seta & FORMAT(Valor, "0.00%")
    )
```

#### Faturamento YOY Card
- **Descrição:** Texto formatado para cartão com seta de direção do YoY de faturamento.
- **Usa:** `[Faturamento YoY %]`
- **Observações:** Retorna BLANK quando valor é nulo.
```DAX
Faturamento YOY Card = 
VAR Valor = [Faturamento YoY %]
VAR Seta = IF(Valor >= 0, "▲ ", "▼ ")
RETURN
    IF(
        NOT ISBLANK(Valor),
        Seta & FORMAT(Valor, "0.00%")
    )
```

#### Margem YOY Card
- **Descrição:** Texto formatado para cartão com seta de direção do YoY de margem.
- **Usa:** `[Margem YoY %]`
- **Observações:** Retorna BLANK quando valor é nulo.
```DAX
Margem YOY Card = 
VAR Valor = [Margem YoY %]
VAR Seta = IF(Valor >= 0, "▲ ", "▼ ")
RETURN
    IF(
        NOT ISBLANK(Valor),
        Seta & FORMAT(Valor, "0.00%")
    )
```

#### Resultado YOY Card
- **Descrição:** Texto formatado para cartão com seta de direção do YoY de resultado.
- **Usa:** `[Resultado YoY %]`
- **Observações:** Retorna BLANK quando valor é nulo.
```DAX
Resultado YOY Card = 
VAR Valor = [Resultado YoY %]
VAR Seta = IF(Valor >= 0, "▲ ", "▼ ")
RETURN
    IF(
        NOT ISBLANK(Valor),
        Seta & FORMAT(Valor, "0.00%")
    )
```

### Formatação Condicional

#### Comissao YoY Cor
- **Descrição:** Cor para rótulo de referência de comissão YoY.
- **Usa:** `[Comissao YoY %]`
- **Observações:** Verde para positivo, vermelho para negativo e cinza para nulo/zero.
```DAX
Comissao YoY Cor = 
VAR yoy = [Comissao YoY %]
RETURN
    SWITCH(
        TRUE(),
        ISBLANK(yoy), "#9AA0A6",   -- cinza quando não tiver dado
        yoy > 0, "#2E7D32",        -- verde
        yoy < 0, "#C62828",        -- vermelho
        "#9AA0A6"
    )
```

#### Faturamento YoY Cor
- **Descrição:** Cor para rótulo de referência de faturamento YoY.
- **Usa:** `[Faturamento YoY %]`
- **Observações:** Verde para positivo, vermelho para negativo e cinza para nulo/zero.
```DAX
Faturamento YoY Cor = 
VAR yoy = [Faturamento YoY %]
RETURN
    SWITCH(
        TRUE(),
        ISBLANK(yoy), "#9AA0A6",   -- cinza quando não tiver dado
        yoy > 0, "#2E7D32",        -- verde
        yoy < 0, "#C62828",        -- vermelho
        "#9AA0A6"
    )
```

#### Margem YoY Cor
- **Descrição:** Cor para rótulo de referência de margem YoY.
- **Usa:** `[Margem YoY %]`
- **Observações:** Retorna BLANK para nulo, verde para positivo, vermelho para negativo e cinza para zero.
```DAX
Margem YoY Cor = 
VAR yoy = [Margem YoY %]
RETURN
SWITCH(
    TRUE(),
    ISBLANK(yoy), BLANK(),
    yoy > 0, "#2E7D32",   -- verde
    yoy < 0, "#C62828",   -- vermelho
    "#6B7280"             -- cinza (zero)
)
```

#### Resultado YoY Cor
- **Descrição:** Cor para rótulo de referência de resultado YoY.
- **Usa:** `[Resultado YoY %]`
- **Observações:** Verde para positivo, vermelho para negativo e cinza para nulo/zero.
```DAX
Resultado YoY Cor = 
VAR yoy = [Resultado YoY %]
RETURN
    SWITCH(
        TRUE(),
        ISBLANK(yoy), "#9AA0A6",
        yoy > 0, "#2E7D32",
        yoy < 0, "#C62828",
        "#9AA0A6"
    )
```

### Auxiliares

#### Cor Transparent
- **Descrição:** Cor transparente para uso em elementos visuais.
- **Usa:** não se aplica.
- **Observações:** Hex com canal alfa nulo.
```DAX
Cor Transparent = "#0000"
```

#### Eixo Y Max
- **Descrição:** Define valor máximo ajustado para eixo Y.
- **Usa:** `[Faturamento]`
- **Observações:** Aplica deslocamento de 1.5 sobre o maior valor selecionado.
```DAX
Eixo Y Max = 

VAR vTabela = 
    ALLSELECTED( dCalendario[Mes Abreviado], dCalendario[Mês] )

VAR vMaior_valor = 
    MAXX( vTabela, [Faturamento] )

VAR vDeslocamento = 1.5 

RETURN 
    vMaior_valor * vDeslocamento
```

#### Faturamento (abreviado Valor)
- **Descrição:** Replica cálculo de faturamento para uso específico de visual.
- **Usa:** colunas de `fVendas`.
- **Observações:** Aplica filtro `dStatus[Id Status] = 1`.
```DAX
Faturamento (abreviado Valor) = 
    CALCULATE(
        SUMX(
            fVendas,
            fVendas[Qtde] * fVendas[Valor Unit]
        ),
        dStatus[Id Status] = 1
    )
```

#### Faturamento (Formatado Texto)
- **Descrição:** Formata faturamento em texto abreviado (K, M, B).
- **Usa:** `[Faturamento]`
- **Observações:** Retorna string formatada por faixa de valor.
```DAX
Faturamento (Formatado Texto) = 

Var vValor = [Faturamento]

Return

    SWITCH(
        TRUE(),
        vValor >= 1000000000, FORMAT(vValor, "0,,,.0 B"),
        vValor >= 1000000, FORMAT(vValor, "0,,.0 M"),
        vValor >= 1000, FORMAT(vValor, "0,.0 K"),
        FORMAT(vValor, "0")
    )
```

#### Faturamento Rotulo 2
- **Descrição:** Desloca o valor do faturamento para posicionamento de rótulo.
- **Usa:** `[Faturamento]`, `[Eixo Y Max]`
- **Observações:** Soma 10% do eixo máximo ao faturamento.
```DAX
Faturamento Rotulo 2 = 

VAR vValor = [Faturamento]

VAR vDeslocamento = [Eixo Y Max]* 0.10

RETURN
    vDeslocamento + vValor
```

#### Meta (Formatado Texto)
- **Descrição:** Formata meta em texto abreviado (K, M, B).
- **Usa:** `[Meta]`
- **Observações:** Retorna string formatada por faixa de valor.
```DAX
Meta (Formatado Texto) = 

Var vValor = [Meta]

Return

    SWITCH(
        TRUE(),
        vValor >= 1000000000, FORMAT(vValor, "0,,,.0 B"),
        vValor >= 1000000, FORMAT(vValor, "0,,.0 M"),
        vValor >= 1000, FORMAT(vValor, "0,.0 K"),
        FORMAT(vValor, "0")
    )
```

#### Meta Cor
- **Descrição:** Define cor de meta conforme percentual atingido.
- **Usa:** `[Porcentagem Meta]`
- **Observações:** Três faixas de cor para status de atingimento.
```DAX
Meta Cor = 

Var vPorcentagem = [Porcentagem Meta]
Return

    SWITCH(
        TRUE(),
        vPorcentagem >= 1, "#59B7C8",
        vPorcentagem >= 0.81, "#897D2E",
        "#C54339"
    )
```

#### Rank Cidade (Faturamento)
- **Descrição:** Ranking de cidades por faturamento.
- **Usa:** `[Faturamento]`
- **Observações:** Considera todas as cidades com `ALL(dClientes[Cidade])`.
```DAX
Rank Cidade (Faturamento) = 

RANKX( 
    ALL(dClientes[Cidade] ), 
    [Faturamento] 
)
```

### Medidas SVG

#### Imagem Tabela Cidades
- **Descrição:** Gera SVG para exibição de cidade, faturamento e margem com animação.
- **Usa:** `[Faturamento]`, `[Margem]`, `dClientes[Cidade]`
- **Observações:** Retorna string SVG para uso em visual com transições CSS.
```DAX
Imagem Tabela Cidades = 
VAR vCidade = SELECTEDVALUE( dClientes[Cidade] )

VAR vValor = [Faturamento]

VAR vValor_formatado = 
    SWITCH(
        TRUE(),
        vValor >= 1000000000, FORMAT(vValor, "0,,,.00 Bi"),
        vValor >= 1000000, FORMAT(vValor, "0,,.00 Mi"),
        vValor >= 1000, FORMAT(vValor, "0,.00 K"),
        FORMAT(vValor, "0")
    ) 


VAR vMargem_formatada = FORMAT( [Margem], "0.00%" ) 

-----------------------------------------
-- FORMATAÇÕES 
-----------------------------------------

VAR vFonte = "Segoe UI"

VAR vCidade_cor = "#f1f1f1"
VAR vCidade_tam = 12 


RETURN 
"
<svg  width='255' height='79' viewBox='0 0 255 65' fill='none' xmlns='http://www.w3.org/2000/svg'>

    <defs>
        <style>
     

            #txt_cidade, #txt_faturamento, #txt_margem {
                transition: 0.5s
            }

            svg:hover #txt_cidade {
                transform:translate(126px)
            }

            svg:hover #txt_faturamento {
                transform:translate(-126px)
            }

            svg:hover #txt_margem {
                transform:translate(-126px)
            }


        </style> 

    </defs>

	<g id='tabela_cidades'>
		<line id='divisor' x1='127.5' y1='14' x2='127.5' y2='50' stroke='white' stroke-opacity='0.1'/>

		<text id='txt_cidade' fill='" & vCidade_cor & "'  font-family='" & vFonte & "' font-size='" & vCidade_tam & "' font-weight='400'>
			<tspan x='28' y='37'>
                " & vCidade & "
            </tspan>
		</text>

		<text id='txt_faturamento' fill='#f1f1f1'  font-family='" & vFonte & "' font-size='13' font-weight='600'>
			<tspan x='155' y='26.2109'>
                R$ " & vValor_formatado & "
            </tspan>
		</text>
		<text id='txt_margem' fill='#D1783C'  font-family='" & vFonte & "' font-size='13' font-weight='600'>
			<tspan x='155' y='53.2109'>
                " & vMargem_formatada & "
            </tspan>
		</text>
	</g>
</svg>
"
```

#### Imagem Variacao Comissao
- **Descrição:** SVG de variação YoY da comissão com seta/cor dinâmica.
- **Usa:** `[Comissao YoY %]`
- **Observações:** Ativa animação de piscar quando valor é negativo.
```DAX
Imagem Variacao Comissao = 

VAR vValor = [Comissao YoY %] 

VAR vValor_formatado = FORMAT( vValor + 0 , "+0.00%; -0.00%; - " ) 

VAR vSeta = 
    SWITCH(
        TRUE(),
        vValor > 0, "⮝",
        vValor < 0, "⮟"
    )

VAR vCor_variacao = 
    SWITCH(
        TRUE(),
        vValor > 0, "#55AF3B",
        vValor < 0, "#D16961",
        "#f1f1f1"
    )

VAR vRot_categoria = "Vs. Ano Anterior" 

VAR vFonte = "Segoe Ui" 

VAR vRot_categoria_cor = "#02101B" 

VAR vAnimacao = 
    IF( vValor < 0, "animation" ) 


RETURN 

"data:image/svg+xml, 
<svg  viewBox='0 0 190 50' fill='none' xmlns='http://www.w3.org/2000/svg'>

        <defs>
            <style>

                #rot_dados, #seta {
                    " & vAnimacao & ": blink-1 1.5s infinite both;
                }

                @keyframes blink-1 {
                    0%,
                    50%,
                    100% {
                        opacity: 1;
                    }
                    25%,
                    75% {
                        opacity: 0;
                    }
                }

            </style> 

        </defs> 
        
		<text id='rot_cat' fill='" & vRot_categoria_cor & "' font-family='" & vFonte & "' font-size='12' font-weight='400' >
			<tspan x='88' y='40.9688'>
                " & vRot_categoria & "
            </tspan>
		</text>

		<text id='rot_dados' fill='" & vCor_variacao & "' font-family='" & vFonte & "' font-size='12' font-weight='600' >
			<tspan x='88' y='21.2969' font-weight='600'>
                " & vValor_formatado  & "
            </tspan>
		</text>

		<text id='seta' fill='" & vCor_variacao & "' font-family='" & vFonte & "' font-size='14' font-weight='600' >
			<tspan x='68' y='31.2969'>
                " & vSeta & "
            </tspan>
		</text>

</svg>
"
```

#### Imagem Variacao Faturamento
- **Descrição:** SVG de variação YoY do faturamento com seta/cor dinâmica.
- **Usa:** `[Faturamento YoY %]`
- **Observações:** Ativa animação de piscar quando valor é negativo.
```DAX
Imagem Variacao Faturamento = 

VAR vValor = [Faturamento YoY %] 

VAR vValor_formatado = FORMAT( vValor + 0 , "+0.00%; -0.00%; - " ) 

VAR vSeta = 
    SWITCH(
        TRUE(),
        vValor > 0, "⮝",
        vValor < 0, "⮟"
    )

VAR vCor_variacao = 
    SWITCH(
        TRUE(),
        vValor > 0, "#55AF3B",
        vValor < 0, "#D16961",
        "#f1f1f1"
    )

VAR vRot_categoria = "Vs. Ano Anterior" 

VAR vFonte = "Segoe Ui" 

VAR vRot_categoria_cor = "#02101B" 

VAR vAnimacao = 
    IF( vValor < 0, "animation" ) 


RETURN 

"data:image/svg+xml, 
<svg  viewBox='0 0 190 50' fill='none' xmlns='http://www.w3.org/2000/svg'>

        <defs>
            <style>

                #rot_dados, #seta {
                    " & vAnimacao & ": blink-1 1.5s infinite both;
                }

                @keyframes blink-1 {
                    0%,
                    50%,
                    100% {
                        opacity: 1;
                    }
                    25%,
                    75% {
                        opacity: 0;
                    }
                }

            </style> 

        </defs> 
        
		<text id='rot_cat' fill='" & vRot_categoria_cor & "' font-family='" & vFonte & "' font-size='12' font-weight='400' >
			<tspan x='88' y='40.9688'>
                " & vRot_categoria & "
            </tspan>
		</text>

		<text id='rot_dados' fill='" & vCor_variacao & "' font-family='" & vFonte & "' font-size='12' font-weight='600' >
			<tspan x='88' y='21.2969' font-weight='600' >
                " & vValor_formatado  & "
            </tspan>
		</text>

		<text id='seta' fill='" & vCor_variacao & "' font-family='" & vFonte & "' font-size='14' font-weight='600' >
			<tspan x='68' y='31.2969'>
                " & vSeta & "
            </tspan>
		</text>

</svg>
"
```

#### Imagem Variacao Margem
- **Descrição:** SVG de variação YoY da margem com seta/cor dinâmica.
- **Usa:** `[Margem YoY %]`
- **Observações:** Ativa animação de piscar quando valor é negativo.
```DAX
Imagem Variacao Margem = 

VAR vValor = [Margem YoY %] 

VAR vValor_formatado = FORMAT( vValor + 0 , "+0.00%; -0.00%; - " ) 

VAR vSeta = 
    SWITCH(
        TRUE(),
        vValor > 0, "⮝",
        vValor < 0, "⮟"
    )

VAR vCor_variacao = 
    SWITCH(
        TRUE(),
        vValor > 0, "#4B8D38",
        vValor < 0, "#D16961",
        "#f1f1f1"
    )

VAR vRot_categoria = "Vs. Ano Anterior" 

VAR vFonte = "Segoe Ui" 

VAR vRot_categoria_cor = "#02101B" 

VAR vAnimacao = 
    IF( vValor < 0, "animation" ) 


RETURN 

"data:image/svg+xml, 
<svg  viewBox='0 0 190 50' fill='none' xmlns='http://www.w3.org/2000/svg'>

        <defs>
            <style>

                #rot_dados, #seta {
                    " & vAnimacao & ": blink-1 1.5s infinite both;
                }

                @keyframes blink-1 {
                    0%,
                    50%,
                    100% {
                        opacity: 1;
                    }
                    25%,
                    75% {
                        opacity: 0;
                    }
                }

            </style> 

        </defs> 

		
		<text id='rot_cat' fill='" & vRot_categoria_cor & "' font-family='" & vFonte & "' font-size='12' font-weight='400' >
			<tspan x='88' y='40.9688'>
                " & vRot_categoria & "
            </tspan>
		</text>

		<text id='rot_dados' fill='" & vCor_variacao & "' font-family='" & vFonte & "' font-size='12' font-weight='600' >
			<tspan x='88' y='21.2969' font-weight='600'  >
                " & vValor_formatado  & "
            </tspan>
		</text>

		<text id='seta' fill='" & vCor_variacao & "' font-family='" & vFonte & "' font-size='14' font-weight='600' >
			<tspan x='68' y='31.2969'>
                " & vSeta & "
            </tspan>
		</text>

</svg>
"
```

#### Imagem Variacao Resultado
- **Descrição:** SVG de variação YoY do resultado com seta/cor dinâmica.
- **Usa:** `[Resultado YoY %]`
- **Observações:** Ativa animação de piscar quando valor é negativo.
```DAX
Imagem Variacao Resultado = 

VAR vValor = [Resultado YoY %] 

VAR vValor_formatado = FORMAT( vValor + 0 , "+0.00%; -0.00%; - " ) 

VAR vSeta = 
    SWITCH(
        TRUE(),
        vValor > 0, "⮝",
        vValor < 0, "⮟"
    )

VAR vCor_variacao = 
    SWITCH(
        TRUE(),
        vValor > 0, "#4B8D38",
        vValor < 0, "#D16961",
        "#f1f1f1"
    )

VAR vRot_categoria = "Vs. Ano Anterior" 

VAR vFonte = "Segoe Ui" 

VAR vRot_categoria_cor = "#02101B" 

VAR vAnimacao = 
    IF( vValor < 0, "animation" ) 


RETURN 

"data:image/svg+xml, 
<svg  viewBox='0 0 190 50' fill='none' xmlns='http://www.w3.org/2000/svg'>

        <defs>
            <style>

                #rot_dados, #seta {
                    " & vAnimacao & ": blink-1 1.5s infinite ;
                }

                @keyframes blink-1 {
                    0%,
                    50%,
                    100% {
                        opacity: 1;
                    }
                    25%,
                    75% {
                        opacity: 0;
                    }
                }

            </style> 

        </defs> 
		
		<text id='rot_cat' fill='" & vRot_categoria_cor & "' font-family='" & vFonte & "' font-size='12' font-weight='400' >
			<tspan x='88' y='40.9688'>
                " & vRot_categoria & "
            </tspan>
		</text>

		<text id='rot_dados' fill='" & vCor_variacao & "' font-family='" & vFonte & "' font-size='12' font-weight='600' >
			<tspan x='88' y='21.2969'>
                " & vValor_formatado  & "
            </tspan>
		</text>

		<text id='seta' fill='" & vCor_variacao & "' font-family='" & vFonte & "' font-size='14' font-weight='600' >
			<tspan x='68' y='31.2969'>
                " & vSeta & "
            </tspan>
		</text>

</svg>
"
```

#### Imagem Vendedor
- **Descrição:** Retorna HTML/CSS para exibir foto circular animada do vendedor.
- **Usa:** `dVendedores[URL Foto]`
- **Observações:** Usa animação `rotate-scale-down` no carregamento.
```DAX
Imagem Vendedor = 

VAR vVendedor_selecionado = SELECTEDVALUE( dVendedores[URL Foto] )

RETURN 


"
    <style>

        div {
            display: flex;
            justify-content: center;
            align-items: center;
            
        }

        img{
            width: 80vw;
            height: 80vw;

            object-fit: cover;

            border-radius: 50%;

            animation: rotate-scale-down 1s linear both;
        }


        @keyframes rotate-scale-down {
            0% {
                transform: scale(1) rotateZ(0);
            }
            50% {
                transform: scale(0.5) rotateZ(180deg);
            }
            100% {
                transform: scale(1) rotateZ(360deg);
            }
        }


    </style> 

    <img src='" & vVendedor_selecionado & "' > 


"
```

#### Velocimetro
- **Descrição:** Gera SVG de velocímetro para percentual de meta.
- **Usa:** `[Porcentagem Meta]`, `[Meta Cor]`
- **Observações:** Limita rotação máxima para não ultrapassar o ponteiro final.
```DAX
Velocimetro = 

VAR vValor = [Porcentagem Meta]


VAR vValor_formatado = FORMAT( vValor, "0%" ) 



VAR vFator = -- Valor de rotação necessário para que o ponteiro saia do ponto ZERO e alcance o ponto CEM.
    186

VAR vRotacionar = 
     ROUND( vValor * vFator , 0 ) 


VAR vLimite_maximo =  -- Valor limite para evitar que o ponteiro ultrapasse o ponto máximo.
    262 

VAR vRotacionar_ajustado = 
    IF( 
        vRotacionar <= vLimite_maximo, 
        vRotacionar, 
        vLimite_maximo 
    ) 



---------------------------------------------
-- FORMATAÇÕES 
---------------------------------------------

VAR vFonte = "Cambria"

VAR vRot_categoria = "Meta %"

VAR vRotulo_dados_tam = 30
VAR vRotulo_dados_cor = [Meta Cor] 

VAR vCor_seta = vRotulo_dados_cor 

VAR vMarcador_comum_cor  = "#9A9FA4" 

VAR vMarcador_max_cor  = vRotulo_dados_cor 

VAR vNumeros_cor = "#9A9FA4"

RETURN 


"
<svg  viewBox='0 0 250 200' fill='none' xmlns='http://www.w3.org/2000/svg'>

        <defs>

            <style>
                #ponteiro {

                    transform: rotate(" & vRotacionar_ajustado & "deg);
                    transform-origin: center;
                    transform-box: fill-box;

                    animation: anima_ponteiro .7s linear forwards
                }

       
            </style> 

        </defs>
	
	
		<g id='marcadores'>
			<path id='marcador' fill-rule='evenodd' clip-rule='evenodd' d='M0 0' fill='" &vMarcador_comum_cor & "'/>
			<path id='marcador_maximo' fill-rule='evenodd' clip-rule='evenodd' d='M0 0' fill='" & vMarcador_max_cor & "'/>
		</g>
		<g id='ponteiro'>
			<circle id='circ_giro' cx='126.5' cy='113.499' r='91.5' fill='#0000' fill-opacity='0.24'/>
			<path id='seta' d='M63.7784 163.683C63.1195 163.739 62.6213 163.098 62.8382 162.474L70.4118 140.66C70.9396 139.14 73.0417 138.988 73.7927 140.412C75.6091 143.854 78.1977 148.622 79.4077 150.204C80.6502 151.829 84.5948 155.875 87.3372 158.64C88.4344 159.747 87.7435 161.641 86.1908 161.773L63.7784 163.683Z' fill='" & vCor_seta & "'/>
		</g>

		<g id='numeros'>
			<text id='0' fill='" & vNumeros_cor & "'  font-family='" & vFonte & "' font-size='15.015' font-weight='600' >
				<tspan x='34' y='188.383'>0</tspan>
			</text>
			<text id='20' fill='" & vNumeros_cor & "'  font-family='" & vFonte & "' font-size='15.015' font-weight='600' >
				<tspan x='12' y='126.383'>20</tspan>
			</text>
			<text id='40' fill='" & vNumeros_cor & "'  font-family='" & vFonte & "' font-size='15.015' font-weight='600' >
				<tspan x='26' y='62.3829'>40</tspan>
			</text>
			<text id='60' fill='" & vNumeros_cor & "'  font-family='" & vFonte & "' font-size='15.015' font-weight='600' >
				<tspan x='81' y='21.3829'>60</tspan>
			</text>
			<text id='80' fill='" & vNumeros_cor & "'  font-family='" & vFonte & "' font-size='15.015' font-weight='600' >
				<tspan x='150' y='19.3829'>80</tspan>
			</text>
			<text id='100' fill='" & vNumeros_cor & "'  font-family='" & vFonte & "' font-size='15.015' font-weight='600' >
				<tspan x='211' y='57.3829'>100</tspan>
			</text>
			<text id='MAX' fill='" & vMarcador_max_cor & "'  font-family='" & vFonte & "' font-size='15.015' font-weight='600' >
				<tspan x='205' y='188.383'>MAX</tspan>
			</text>
		</g>

		<text id='rot_dados' fill='" & vRotulo_dados_cor & "'  font-family='" & vFonte & "' font-size='" & vRotulo_dados_tam & "' font-weight='600' text-anchor='middle' >
			<tspan x='125' y='129.255'> " & vValor_formatado & "</tspan>
		</text>
		<text id='rot_catgoria' fill='" & vMarcador_comum_cor & "'  font-family='" & vFonte & "' font-size='13' font-weight='600' text-anchor='middle' >
			<tspan x='125' y='95.6605'> " & vRot_categoria & "</tspan>
		</text>

        <path id='contorno_interno' d='M162.459 162.154C172.619 154.645 180.174 144.143 184.063 132.123C187.952 120.102 187.98 107.165 184.143 95.1275C180.306 83.09 172.797 72.5556 162.669 65.0024C152.542 57.4491 140.303 53.256 127.672 53.0113C115.04 52.7667 102.648 56.4827 92.2357 63.6381C81.8231 70.7935 73.9118 81.0292 69.6118 92.9091C65.3118 104.789 64.8389 117.717 68.2594 129.879C71.6799 142.042 78.8222 152.828 88.6842 160.725L89.5723 159.616C79.9419 151.905 72.9673 141.372 69.6272 129.495C66.287 117.618 66.7488 104.994 70.9478 93.3927C75.1468 81.7917 82.8723 71.7964 93.0404 64.8091C103.208 57.8217 115.309 54.1929 127.644 54.4319C139.979 54.6708 151.93 58.7654 161.82 66.1413C171.71 73.5172 179.043 83.8042 182.789 95.559C186.536 107.314 186.508 119.947 182.711 131.685C178.913 143.424 171.536 153.679 161.614 161.012L162.459 162.154Z' fill='" & vRotulo_dados_cor & "'/>


</svg>
"
```

### dCalendário: Gerar Código

#### zVisaoCalendario
- **Descrição:** Tabela auxiliar para seleção de visão de calendário.
- **Usa:** não se aplica (tabela calculada).
- **Observações:** Define opções Completo, Acima Meta e Abaixo Meta com coluna de ordem.
```DAX
zVisaoCalendario = 

DATATABLE(
    "escolha", STRING,
    "ordem", INTEGER,
    {
        { "Completo", 1 },
        { "Acima Meta", 2 },
        { "Abaixo Meta", 3 } 
    }
)
```
