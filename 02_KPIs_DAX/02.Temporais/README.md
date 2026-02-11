# 02.Temporais

Documentação das medidas desta categoria com explicações didáticas. As fórmulas DAX foram mantidas exatamente como no catálogo original.

## Medida: Comissao DoD

- **Descrição:** Variação diária percentual da comissão.
- **Explicação didática:** Em termos simples, esta medida variação diária percentual da comissão..
- **Usa:** `[Comissao]`
- **Observações:** Usa `OFFSET` sobre `ALLSELECTED(dCalendario[Dia])` com filtro de valor positivo.

### DAX:
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

## Medida: Comissao LY

- **Descrição:** Comissão no mesmo período do ano anterior.
- **Explicação didática:** Em termos simples, esta medida comissão no mesmo período do ano anterior..
- **Usa:** `[Comissao]`
- **Observações:** Usa `SAMEPERIODLASTYEAR` e filtro `dCalendario[Datas com Venda] = TRUE()`.

### DAX:
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

## Medida: Comissao MoM %

- **Descrição:** Variação mensal percentual da comissão.
- **Explicação didática:** Em termos simples, esta medida variação mensal percentual da comissão..
- **Usa:** `[Comissao]`
- **Observações:** Usa `DATEADD(..., -1, MONTH)` com filtro de datas com venda.

### DAX:
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

## Medida: Comissao YoY %

- **Descrição:** Variação anual percentual da comissão.
- **Explicação didática:** Em termos simples, esta medida variação anual percentual da comissão..
- **Usa:** `[Comissao]`, `[Comissao LY]`
- **Observações:** Compara com medida de ano anterior.

### DAX:
```DAX
Comissao YoY % = 

VAR Valor_last_year = [Comissao LY]

RETURN 
    DIVIDE(
        [Comissao] - Valor_last_year,
        Valor_last_year
    )
```

## Medida: Faturamento Acumulado

- **Descrição:** Faturamento acumulado no ano (YTD).
- **Explicação didática:** Em termos simples, esta medida faturamento acumulado no ano (ytd)..
- **Usa:** `[Faturamento]`
- **Observações:** Usa `DATESYTD` com filtro de datas com venda.

### DAX:
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

## Medida: Faturamento DoD

- **Descrição:** Variação diária percentual do faturamento.
- **Explicação didática:** Em termos simples, esta medida variação diária percentual do faturamento..
- **Usa:** `[Faturamento]`
- **Observações:** Usa `OFFSET` sobre `ALLSELECTED(dCalendario[Dia])` com filtro de valor positivo.

### DAX:
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

## Medida: Faturamento LY

- **Descrição:** Faturamento no mesmo período do ano anterior.
- **Explicação didática:** Em termos simples, esta medida faturamento no mesmo período do ano anterior..
- **Usa:** `[Faturamento]`
- **Observações:** Usa `SAMEPERIODLASTYEAR` e filtro de datas com venda.

### DAX:
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

## Medida: Faturamento LY Acumulado

- **Descrição:** Faturamento acumulado YTD do ano anterior.
- **Explicação didática:** Em termos simples, esta medida faturamento acumulado ytd do ano anterior..
- **Usa:** `[Faturamento]`
- **Observações:** Combina `DATESYTD` com `SAMEPERIODLASTYEAR` e filtro de datas com venda.

### DAX:
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

## Medida: Faturamento MoM %

- **Descrição:** Variação mensal percentual do faturamento.
- **Explicação didática:** Em termos simples, esta medida variação mensal percentual do faturamento..
- **Usa:** `[Faturamento]`
- **Observações:** Usa `DATEADD(..., -1, MONTH)` com filtro de datas com venda.

### DAX:
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

## Medida: Faturamento YoY %

- **Descrição:** Variação anual percentual do faturamento.
- **Explicação didática:** Em termos simples, esta medida variação anual percentual do faturamento..
- **Usa:** `[Faturamento]`, `[Faturamento LY]`
- **Observações:** Compara com medida de ano anterior.

### DAX:
```DAX
Faturamento YoY % = 

VAR Valor_last_year = [Faturamento LY]

RETURN 
    DIVIDE(
        [Faturamento] - Valor_last_year,
        Valor_last_year
    )
```

## Medida: Margem LM

- **Descrição:** Margem no mês anterior.
- **Explicação didática:** Em termos simples, esta medida margem no mês anterior..
- **Usa:** `[Margem]`
- **Observações:** Usa `DATEADD(..., -1, MONTH)` e datas com venda.

### DAX:
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

## Medida: Margem LY

- **Descrição:** Margem no mesmo período do ano anterior.
- **Explicação didática:** Em termos simples, esta medida margem no mesmo período do ano anterior..
- **Usa:** `[Margem]`
- **Observações:** Usa `SAMEPERIODLASTYEAR` e datas com venda.

### DAX:
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

## Medida: Margem MoM %

- **Descrição:** Variação mensal percentual da margem.
- **Explicação didática:** Em termos simples, esta medida variação mensal percentual da margem..
- **Usa:** `[Margem]`
- **Observações:** Usa comparação com mês anterior via `DATEADD`.

### DAX:
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

## Medida: Margem YoY %

- **Descrição:** Variação anual percentual da margem.
- **Explicação didática:** Em termos simples, esta medida variação anual percentual da margem..
- **Usa:** `[Margem]`, `[Margem LY]`
- **Observações:** Compara com valor do ano anterior.

### DAX:
```DAX
Margem YoY % = 
   VAR Valor_last_year = [Margem LY]

RETURN 
    DIVIDE(
        [Margem] - Valor_last_year,
        Valor_last_year
    )
```

## Medida: Resultado LM

- **Descrição:** Resultado no mês anterior.
- **Explicação didática:** Em termos simples, esta medida resultado no mês anterior..
- **Usa:** `[Resultado]`
- **Observações:** Usa `DATEADD(..., -1, MONTH)` e datas com venda.

### DAX:
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

## Medida: Resultado DoD

- **Descrição:** Variação diária percentual do resultado.
- **Explicação didática:** Em termos simples, esta medida variação diária percentual do resultado..
- **Usa:** `[Resultado]`
- **Observações:** Usa `OFFSET` sobre `ALLSELECTED(dCalendario[Dia])` com filtro de valor positivo.

### DAX:
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

## Medida: Resultado LY

- **Descrição:** Resultado no mesmo período do ano anterior.
- **Explicação didática:** Em termos simples, esta medida resultado no mesmo período do ano anterior..
- **Usa:** `[Resultado]`
- **Observações:** Usa `SAMEPERIODLASTYEAR` e filtro de datas com venda.

### DAX:
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

## Medida: Resultado MoM %

- **Descrição:** Variação mensal percentual do resultado.
- **Explicação didática:** Em termos simples, esta medida variação mensal percentual do resultado..
- **Usa:** `[Resultado]`
- **Observações:** Usa comparação com mês anterior via `DATEADD`.

### DAX:
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

## Medida: Resultado YoY %

- **Descrição:** Variação anual percentual do resultado.
- **Explicação didática:** Em termos simples, esta medida variação anual percentual do resultado..
- **Usa:** `[Resultado]`, `[Resultado LY]`
- **Observações:** Compara com valor do ano anterior.

### DAX:
```DAX
Resultado YoY % = 

VAR Valor_last_year = [Resultado LY]

RETURN 
    DIVIDE(
        [Resultado] - Valor_last_year,
        Valor_last_year
    )
```
