# Alertas Nativos do Power BI

## O que são

Alertas configurados diretamente no Power BI Service. Você define uma condição (ex: "faturamento abaixo de R$ 1.000.000") e o Power BI verifica automaticamente. Se verdadeiro, envia e-mail.

## Limitação importante

Só funcionam em **tiles de Dashboard** — não em páginas de relatório. Você precisa primeiro fixar o visual no Dashboard, depois configurar o alerta no tile.

## Alerta: Faturamento Abaixo de R$ 1 Milhão

### Etapa 1: Fixar o visual no Dashboard

1. Abra o relatório no Power BI Service
2. Encontre o card de Faturamento
3. Clique no ícone de **fixar (📌)**
4. Selecione ou crie um Dashboard (ex: "Dashboard Alertas KPIs")
5. Clique em **Fixar**

### Etapa 2: Configurar o alerta

6. Abra o Dashboard
7. Clique no tile de Faturamento
8. **Três pontinhos (...) → Gerenciar alertas**
9. **"+ Adicionar regra de alerta"**
10. Configure:
    - Condição: **Abaixo de**
    - Limite: **1000000**
    - Frequência: **No máximo a cada 1 hora**
    - Marque: **Enviar email também**
11. **Salvar e fechar**

## Alerta: Margem Negativa

Mesmo processo:

1. Fixe o card de Margem no Dashboard
2. Configure:
    - Condição: **Abaixo de**
    - Limite: **0**
    - Frequência: **No máximo a cada 1 hora**
    - Enviar email: **Sim**

## O que acontece quando dispara

- E-mail com o título "Alerta de dados do Power BI"
- Notificação no sino (🔔) do Power BI Service
- Push notification no celular (se tiver o app)

## Vantagens

- Configuração em menos de 5 minutos
- Sem custo adicional
- Notificação por e-mail + push
- Funciona automaticamente

## Limitações

- Só funciona em tiles de Dashboard
- Só envia para **você** (quem configurou) — não para lista de distribuição
- Condições simples (acima/abaixo) — sem combinações
- Não personaliza o corpo do e-mail
- Não envia dados detalhados

Para superar essas limitações, use o Power Automate (veja `power_automate_alertas/`).
