# Modelo e Relacionamentos

## Evidências
- Prints do modelo: `assets/screenshots/` (não disponíveis no momento).

## Tabelas esperadas (validar no PBIX)
> Como não há prints do modelo, a estrutura abaixo é um **placeholder**.

- **Fato_Vendas**
  - Chaves: `DataKey`, `ProdutoKey`, `ClienteKey`, `VendedorKey`
  - Métricas base: `Quantidade`, `Valor_Venda`, `Custo` (validar no PBIX)
- **Dim_Data**
  - Campos: `Data`, `Ano`, `Trimestre`, `Mes`, `NomeMes`
- **Dim_Produto**
  - Campos: `Produto`, `Categoria`, `Subcategoria`
- **Dim_Cliente**
  - Campos: `Cliente`, `Cidade`, `Estado`, `Regiao`
- **Dim_Vendedor**
  - Campos: `Vendedor`, `Gerente`, `Equipe`
- **Dim_Meta**
  - Campos: `Periodo`, `Meta_Valor` (se existir)

## Relacionamentos (validar no PBIX)
- `Fato_Vendas[DataKey]` → `Dim_Data[DataKey]` (1:N)
- `Fato_Vendas[ProdutoKey]` → `Dim_Produto[ProdutoKey]` (1:N)
- `Fato_Vendas[ClienteKey]` → `Dim_Cliente[ClienteKey]` (1:N)
- `Fato_Vendas[VendedorKey]` → `Dim_Vendedor[VendedorKey]` (1:N)
- `Fato_Vendas[Periodo]` → `Dim_Meta[Periodo]` (1:N) (se aplicável)

## Observações
- Atualizar este documento após inserir prints do modelo em `assets/screenshots/`.
