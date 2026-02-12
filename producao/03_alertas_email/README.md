# Alertas Automáticos por E-mail

## O problema que queremos resolver

Ter um dashboard atualizado não adianta se ninguém olha para ele na hora certa. O que precisamos é que o sistema avise as pessoas certas quando algo sai do esperado:

- Faturamento caiu abaixo de R$ 1 milhão → gerente regional precisa saber
- Margem ficou negativa → diretor de canal precisa agir

Isso é **gestão por exceção**: o sistema filtra o importante e alerta quem precisa.

## Duas formas de configurar

| Ferramenta | Tipo de alerta | Complexidade |
|-----------|---------------|-------------|
| **Alertas nativos do Power BI** | Simples (acima/abaixo de X) | Baixa |
| **Power Automate** | Avançado (condições múltiplas, e-mails personalizados) | Média |

## Quando usar cada um

| Cenário | Ferramenta |
|---------|-----------|
| Faturamento abaixo de R$ 1 milhão | Alertas nativos (rápido) |
| Margem negativa | Alertas nativos (rápido) |
| E-mail com tabela de dados detalhados | Power Automate |
| Alerta diferente por nível hierárquico | Power Automate |
| Notificação no Teams + e-mail | Power Automate |

**Recomendação:** use os dois. Alertas nativos para KPIs críticos, Power Automate para notificações inteligentes.

**Nota sobre o Gateway:** o Gateway NÃO envia alertas de negócio. Ele só notifica quando a **atualização dos dados falha**. Alertas de KPIs (faturamento, margem) são feitos via Alertas nativos do Power BI ou Power Automate.

Consulte as subpastas para o passo a passo.
