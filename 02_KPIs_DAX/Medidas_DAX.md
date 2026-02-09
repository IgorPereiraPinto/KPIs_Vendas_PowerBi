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
