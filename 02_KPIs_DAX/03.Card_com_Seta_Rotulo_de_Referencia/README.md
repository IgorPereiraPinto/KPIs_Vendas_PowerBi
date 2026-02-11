# 03.Card_com_Seta_Rotulo_de_Referencia

Documentação das medidas desta categoria com explicações didáticas. As fórmulas DAX foram mantidas exatamente como no catálogo original.

## Medida: Comissao YOY Card

- **Descrição:** Texto formatado para cartão com seta de direção do YoY de comissão.
- **Explicação didática:** Em termos simples, esta medida texto formatado para cartão com seta de direção do yoy de comissão..
- **Usa:** `[Comissao YoY %]`
- **Observações:** Retorna BLANK quando valor é nulo.

### DAX:
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

## Medida: Faturamento YOY Card

- **Descrição:** Texto formatado para cartão com seta de direção do YoY de faturamento.
- **Explicação didática:** Em termos simples, esta medida texto formatado para cartão com seta de direção do yoy de faturamento..
- **Usa:** `[Faturamento YoY %]`
- **Observações:** Retorna BLANK quando valor é nulo.

### DAX:
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

## Medida: Margem YOY Card

- **Descrição:** Texto formatado para cartão com seta de direção do YoY de margem.
- **Explicação didática:** Em termos simples, esta medida texto formatado para cartão com seta de direção do yoy de margem..
- **Usa:** `[Margem YoY %]`
- **Observações:** Retorna BLANK quando valor é nulo.

### DAX:
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

## Medida: Resultado YOY Card

- **Descrição:** Texto formatado para cartão com seta de direção do YoY de resultado.
- **Explicação didática:** Em termos simples, esta medida texto formatado para cartão com seta de direção do yoy de resultado..
- **Usa:** `[Resultado YoY %]`
- **Observações:** Retorna BLANK quando valor é nulo.

### DAX:
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
