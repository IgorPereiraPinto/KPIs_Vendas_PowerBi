# Catálogo de Medidas Dax

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

## Medidas do Projeto (PBIX)

### 01.Principais
- **Documentação completa:** [01.Principais/README.md](01.Principais/README.md)
- **Medidas nesta categoria:**
  - Abatimento
  - Comissao
  - Custo
  - Despesa
  - Diferença Meta
  - Faturamento
  - Impostos
  - Margem
  - Meta
  - Porcentagem Meta
  - Positivação Clientes
  - Positivação Produtos
  - Qtde Vendas
  - Resultado

### 02.Temporais
- **Documentação completa:** [02.Temporais/README.md](02.Temporais/README.md)
- **Medidas nesta categoria:**
  - Comissao DoD
  - Comissao LY
  - Comissao MoM %
  - Comissao YoY %
  - Faturamento Acumulado
  - Faturamento DoD
  - Faturamento LY
  - Faturamento LY Acumulado
  - Faturamento MoM %
  - Faturamento YoY %
  - Margem LM
  - Margem LY
  - Margem MoM %
  - Margem YoY %
  - Resultado LM
  - Resultado DoD
  - Resultado LY
  - Resultado MoM %
  - Resultado YoY %

### 03.Card_com_Seta_Rotulo_de_Referencia
- **Documentação completa:** [03.Card_com_Seta_Rotulo_de_Referencia/README.md](03.Card_com_Seta_Rotulo_de_Referencia/README.md)
- **Medidas nesta categoria:**
  - Comissao YOY Card
  - Faturamento YOY Card
  - Margem YOY Card
  - Resultado YOY Card

### 04.Formatacao_Condicional_Cor_Rotulo_de_Referencia
- **Documentação completa:** [04.Formatacao_Condicional_Cor_Rotulo_de_Referencia/README.md](04.Formatacao_Condicional_Cor_Rotulo_de_Referencia/README.md)
- **Medidas nesta categoria:**
  - Comissao YoY Cor
  - Faturamento YoY Cor
  - Margem YoY Cor
  - Resultado YoY Cor

### 05.Auxiliares
- **Documentação completa:** [05.Auxiliares/README.md](05.Auxiliares/README.md)
- **Medidas nesta categoria:**
  - Cor Transparent
  - Eixo Y Max
  - Faturamento (abreviado Valor)
  - Faturamento (Formatado Texto)
  - Faturamento Rotulo 2
  - Meta (Formatado Texto)
  - Meta Cor
  - Rank Cidade (Faturamento)
  - zVisaoCalendario

### 06.Medidas_SVG
- **Documentação completa:** [06.Medidas_SVG/README.md](06.Medidas_SVG/README.md)
- **Medidas nesta categoria:**
  - Imagem Tabela Cidades
  - Imagem Variacao Comissao
  - Imagem Variacao Faturamento
  - Imagem Variacao Margem
  - Imagem Variacao Resultado
  - Imagem Vendedor
  - Velocimetro
