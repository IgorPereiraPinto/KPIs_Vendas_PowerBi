# Guia de Atualização e Refresh

## Fonte
- **SQL Server** como fonte principal
- **Refresh via Power BI** (agendado conforme necessidade)

## Checklist de refresh
1. Validar credenciais e gateway
2. Executar refresh no Power BI Service
3. Verificar consistência de KPIs e comparativos
4. Registrar alterações no Git (documentação e prints)

## Observações
- KPIs devem permanecer em DAX.
- Evitar alteração de métricas diretamente no SQL.
