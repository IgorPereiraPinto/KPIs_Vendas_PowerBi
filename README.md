# KPIs de Vendas (Power BI + DAX)

🔗 Link do Dashboard: <INSERIR_AQUI>

**Fonte: SQL Server | KPIs: DAX**

## Visão geral
Este repositório documenta um projeto de BI em Power BI com dados extraídos do **SQL Server** (refresh via Power BI) e **KPIs calculados em DAX** no modelo. O objetivo é organizar o contexto de dados, catálogo de KPIs, descrição das páginas do dashboard e insights para tomada de decisão, usando apenas os prints disponíveis em `assets/screenshots`.

> **Nota:** Se algum detalhe não estiver visível nos prints, indicamos **“(validar no PBIX)”**.

## Como navegar no repositório
- `00_Documentacao/` — visão geral, arquitetura, modelo, governança e refresh
- `01_Modelo_Dados/` — documentação do modelo (tabelas e relacionamentos)
- `02_KPIs_DAX/` — catálogo de medidas e padrões de nomenclatura
- `03_Paginas_Dashboard/` — descrição de páginas, visuais e filtros
- `04_Insights/` — insights por página (formato padrão)
- `05_Apresentacao/` — PPTX executivo (script reprodutível)
- `assets/screenshots/` — imagens do dashboard/modelo

## Principais perguntas respondidas
- Performance geral (Faturamento/Resultado/Margem)
- Evolução temporal (mês a mês; YTD; comparação)
- Ranking por cidade
- Performance por categoria
- Performance por vendedor/gerente
- Atingimento de meta e gap
- Sazonalidade (heatmap)

## Sumário executivo (baseado nos prints)
- As páginas do dashboard cobrem visão geral, análise temporal, ranking por cidade, performance por categoria e vendedores. (validar no PBIX)
- Há indicadores de atingimento de meta e gap, além de análises de sazonalidade via mapa de calor. (validar no PBIX)
- O modelo foi documentado com base nas imagens disponíveis; onde não há visibilidade, recomenda-se validação no PBIX. (validar no PBIX)
- O catálogo de KPIs em DAX segue padrões de nomenclatura e organização em pastas de medidas para governança. (validar no PBIX)
- O PPT executivo resume contexto, metodologia, resultados e próximos passos com espaço para link do dashboard. (validar no PBIX)

## Fonte de dados e cálculo de KPIs
- **Fonte:** SQL Server (extração/refresh via Power BI)
- **KPIs:** calculados em DAX (medidas no modelo do Power BI)

## Estrutura do repositório
```
/
README.md
00_Documentacao/
  00_Visao_Geral.md
  01_Arquitetura_Dados.md
  02_Modelo_Dimensional.md
  03_Governanca_KPIs.md
  04_Guia_Atualizacao_e_Refresh.md
  05_Roteiro_Apresentacao.md
01_Modelo_Dados/
  README.md
  Modelo_Relacionamentos.md
02_KPIs_DAX/
  README.md
  Medidas_DAX.md
  Padroes_Nomeacao.md
03_Paginas_Dashboard/
  README.md
  01_Geral.md
  02_Analitico.md
  03_Mapa_de_Calor.md
  04_Vendedores.md
  05_Tooltips.md
04_Insights/
  README.md
  Insights_Geral.md
  Insights_Analitico.md
  Insights_Mapa_de_Calor.md
  Insights_Vendedores.md
  Insights_Tooltips.md
05_Apresentacao/
  README.md
  build_ppt.js
  Relatorio_Executivo_Vendas.pptx
assets/
  screenshots/
  README.md
```
