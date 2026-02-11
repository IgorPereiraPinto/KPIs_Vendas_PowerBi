# 01.Principais

Documentação das medidas desta categoria com explicações didáticas. As fórmulas DAX foram mantidas exatamente como no catálogo original.

## Medida: Abatimento

- **Descrição:** Soma dos componentes de abatimento da venda.
- **Explicação didática:** Em termos simples, esta medida soma dos componentes de abatimento da venda..
- **Usa:** `[Custo]`, `[Despesa]`, `[Impostos]`, `[Comissao]`
- **Observações:** Depende das medidas base com filtro `dStatus[Id Status] = 1`.

### DAX:
```DAX
Abatimento = 
    [Custo] + [Despesa] + [Impostos] + [Comissao]
```

## Medida: Comissao

- **Descrição:** Calcula comissão total com base em quantidade e comissão unitária.
- **Explicação didática:** Em termos simples, esta medida calcula comissão total com base em quantidade e comissão unitária..
- **Usa:** colunas de `fVendas`.
- **Observações:** Aplica filtro `dStatus[Id Status] = 1`.

### DAX:
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

## Medida: Custo

- **Descrição:** Calcula custo total com base em quantidade e custo unitário.
- **Explicação didática:** Em termos simples, esta medida calcula custo total com base em quantidade e custo unitário..
- **Usa:** colunas de `fVendas`.
- **Observações:** Aplica filtro `dStatus[Id Status] = 1`.

### DAX:
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

## Medida: Despesa

- **Descrição:** Calcula despesa total com base em quantidade e despesa unitária.
- **Explicação didática:** Em termos simples, esta medida calcula despesa total com base em quantidade e despesa unitária..
- **Usa:** colunas de `fVendas`.
- **Observações:** Aplica filtro `dStatus[Id Status] = 1`.

### DAX:
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

## Medida: Diferença Meta

- **Descrição:** Diferença absoluta entre faturamento e meta.
- **Explicação didática:** Em termos simples, esta medida diferença absoluta entre faturamento e meta..
- **Usa:** `[Faturamento]`, `[Meta]`
- **Observações:** Valor positivo indica acima da meta.

### DAX:
```DAX
Diferença Meta = 
[Faturamento] - [Meta]
```

## Medida: Faturamento

- **Descrição:** Calcula faturamento total com base em quantidade e valor unitário.
- **Explicação didática:** Em termos simples, esta medida calcula faturamento total com base em quantidade e valor unitário..
- **Usa:** colunas de `fVendas`.
- **Observações:** Aplica filtro `dStatus[Id Status] = 1`.

### DAX:
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

## Medida: Impostos

- **Descrição:** Calcula impostos totais com base em quantidade e imposto unitário.
- **Explicação didática:** Em termos simples, esta medida calcula impostos totais com base em quantidade e imposto unitário..
- **Usa:** colunas de `fVendas`.
- **Observações:** Aplica filtro `dStatus[Id Status] = 1`.

### DAX:
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

## Medida: Margem

- **Descrição:** Percentual de margem sobre o faturamento.
- **Explicação didática:** Em termos simples, esta medida percentual de margem sobre o faturamento..
- **Usa:** `[Resultado]`, `[Faturamento]`
- **Observações:** Utiliza `DIVIDE` para evitar erro de divisão por zero.

### DAX:
```DAX
Margem = 
    DIVIDE([Resultado],[Faturamento])
```

## Medida: Meta

- **Descrição:** Soma do valor de meta.
- **Explicação didática:** Em termos simples, esta medida soma do valor de meta..
- **Usa:** coluna `fMetas[Valor Meta]`.
- **Observações:** Sem filtro explícito na medida.

### DAX:
```DAX
Meta = SUM(fMetas[Valor Meta])
```

## Medida: Porcentagem Meta

- **Descrição:** Percentual de atingimento da meta.
- **Explicação didática:** Em termos simples, esta medida percentual de atingimento da meta..
- **Usa:** `[Faturamento]`, `[Meta]`
- **Observações:** Retorna `0` como valor alternativo quando denominador é zero.

### DAX:
```DAX
Porcentagem Meta = 
DIVIDE([Faturamento],[Meta],0)
```

## Medida: Positivação Clientes

- **Descrição:** Quantidade de clientes que efetuaram compras.
- **Explicação didática:** Em termos simples, esta medida quantidade de clientes que efetuaram compras..
- **Usa:** coluna `fVendas[Id Cliente]`.
- **Observações:** Distinct count de clientes na fato.

### DAX:
```DAX
Positivação Clientes = 
// Refere-se a Qtde de clientes que efetuaram compras 
        DISTINCTCOUNT(fVendas[Id Cliente])
```

## Medida: Positivação Produtos

- **Descrição:** Quantidade de produtos com venda.
- **Explicação didática:** Em termos simples, esta medida quantidade de produtos com venda..
- **Usa:** coluna `fVendas[Id Produto]`.
- **Observações:** Distinct count de produtos na fato.

### DAX:
```DAX
Positivação Produtos = DISTINCTCOUNT(fVendas[Id Produto])
```

## Medida: Qtde Vendas

- **Descrição:** Quantidade de vendas realizadas.
- **Explicação didática:** Em termos simples, esta medida quantidade de vendas realizadas..
- **Usa:** coluna `fVendas[Num Venda]`.
- **Observações:** Distinct count do número da venda.

### DAX:
```DAX
Qtde Vendas = DISTINCTCOUNT(fVendas[Num Venda])
```

## Medida: Resultado

- **Descrição:** Resultado líquido após abatimentos.
- **Explicação didática:** Em termos simples, esta medida resultado líquido após abatimentos..
- **Usa:** `[Faturamento]`, `[Abatimento]`
- **Observações:** Medida base para margem e variações temporais.

### DAX:
```DAX
Resultado = 
    [Faturamento] - [Abatimento]
```
