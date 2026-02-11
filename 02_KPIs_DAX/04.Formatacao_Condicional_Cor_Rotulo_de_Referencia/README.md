# 04.Formatacao_Condicional_Cor_Rotulo_de_Referencia

Documentação das medidas desta categoria com explicações didáticas. As fórmulas DAX foram mantidas exatamente como no catálogo original.

## Medida: Comissao YoY Cor

- **Descrição:** Cor para rótulo de referência de comissão YoY.
- **Explicação didática:** Em termos simples, esta medida cor para rótulo de referência de comissão yoy..
- **Usa:** `[Comissao YoY %]`
- **Observações:** Verde para positivo, vermelho para negativo e cinza para nulo/zero.

### DAX:
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

## Medida: Faturamento YoY Cor

- **Descrição:** Cor para rótulo de referência de faturamento YoY.
- **Explicação didática:** Em termos simples, esta medida cor para rótulo de referência de faturamento yoy..
- **Usa:** `[Faturamento YoY %]`
- **Observações:** Verde para positivo, vermelho para negativo e cinza para nulo/zero.

### DAX:
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

## Medida: Margem YoY Cor

- **Descrição:** Cor para rótulo de referência de margem YoY.
- **Explicação didática:** Em termos simples, esta medida cor para rótulo de referência de margem yoy..
- **Usa:** `[Margem YoY %]`
- **Observações:** Retorna BLANK para nulo, verde para positivo, vermelho para negativo e cinza para zero.

### DAX:
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

## Medida: Resultado YoY Cor

- **Descrição:** Cor para rótulo de referência de resultado YoY.
- **Explicação didática:** Em termos simples, esta medida cor para rótulo de referência de resultado yoy..
- **Usa:** `[Resultado YoY %]`
- **Observações:** Verde para positivo, vermelho para negativo e cinza para nulo/zero.

### DAX:
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
