# 05.Auxiliares

Documentação das medidas desta categoria com explicações didáticas. As fórmulas DAX foram mantidas exatamente como no catálogo original.

## Medida: Cor Transparent

- **Descrição:** Cor transparente para uso em elementos visuais.
- **Explicação didática:** Em termos simples, esta medida cor transparente para uso em elementos visuais..
- **Usa:** não se aplica.
- **Observações:** Hex com canal alfa nulo.

### DAX:
```DAX
Cor Transparent = "#0000"
```

## Medida: Eixo Y Max

- **Descrição:** Define valor máximo ajustado para eixo Y.
- **Explicação didática:** Em termos simples, esta medida define valor máximo ajustado para eixo y..
- **Usa:** `[Faturamento]`
- **Observações:** Aplica deslocamento de 1.5 sobre o maior valor selecionado.

### DAX:
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

## Medida: Faturamento (abreviado Valor)

- **Descrição:** Replica cálculo de faturamento para uso específico de visual.
- **Explicação didática:** Em termos simples, esta medida replica cálculo de faturamento para uso específico de visual..
- **Usa:** colunas de `fVendas`.
- **Observações:** Aplica filtro `dStatus[Id Status] = 1`.

### DAX:
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

## Medida: Faturamento (Formatado Texto)

- **Descrição:** Formata faturamento em texto abreviado (K, M, B).
- **Explicação didática:** Em termos simples, esta medida formata faturamento em texto abreviado (k, m, b)..
- **Usa:** `[Faturamento]`
- **Observações:** Retorna string formatada por faixa de valor.

### DAX:
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

## Medida: Faturamento Rotulo 2

- **Descrição:** Desloca o valor do faturamento para posicionamento de rótulo.
- **Explicação didática:** Em termos simples, esta medida desloca o valor do faturamento para posicionamento de rótulo..
- **Usa:** `[Faturamento]`, `[Eixo Y Max]`
- **Observações:** Soma 10% do eixo máximo ao faturamento.

### DAX:
```DAX
Faturamento Rotulo 2 = 

VAR vValor = [Faturamento]

VAR vDeslocamento = [Eixo Y Max]* 0.10

RETURN
    vDeslocamento + vValor
```

## Medida: Meta (Formatado Texto)

- **Descrição:** Formata meta em texto abreviado (K, M, B).
- **Explicação didática:** Em termos simples, esta medida formata meta em texto abreviado (k, m, b)..
- **Usa:** `[Meta]`
- **Observações:** Retorna string formatada por faixa de valor.

### DAX:
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

## Medida: Meta Cor

- **Descrição:** Define cor de meta conforme percentual atingido.
- **Explicação didática:** Em termos simples, esta medida define cor de meta conforme percentual atingido..
- **Usa:** `[Porcentagem Meta]`
- **Observações:** Três faixas de cor para status de atingimento.

### DAX:
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

## Medida: Rank Cidade (Faturamento)

- **Descrição:** Ranking de cidades por faturamento.
- **Explicação didática:** Em termos simples, esta medida ranking de cidades por faturamento..
- **Usa:** `[Faturamento]`
- **Observações:** Considera todas as cidades com `ALL(dClientes[Cidade])`.

### DAX:
```DAX
Rank Cidade (Faturamento) = 

RANKX( 
    ALL(dClientes[Cidade] ), 
    [Faturamento] 
)
```

## Medida: zVisaoCalendario

- **Descrição:** Tabela auxiliar para seleção de visão de calendário.
- **Explicação didática:** Em termos simples, esta medida tabela auxiliar para seleção de visão de calendário..
- **Usa:** não se aplica (tabela calculada).
- **Observações:** Define opções Completo, Acima Meta e Abaixo Meta com coluna de ordem.

### DAX:
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
