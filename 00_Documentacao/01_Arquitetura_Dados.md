# Arquitetura de Dados

## Fonte de dados
- **SQL Server** (fonte transacional)
- **Extração/refresh via Power BI**

## Camadas (visão lógica)
1. **Fonte (SQL Server):** dados brutos transacionais
2. **Power BI (modelo):** transformação leve e modelagem estrela
3. **Camada semântica:** KPIs em **DAX** e medidas de negócio
4. **Consumo:** dashboards, insights e apresentação executiva

## Fluxo resumido
SQL Server → Power BI (Power Query + modelo) → Medidas DAX → Dashboards e relatórios

> Sem SQL para KPIs: os cálculos devem permanecer em DAX.
