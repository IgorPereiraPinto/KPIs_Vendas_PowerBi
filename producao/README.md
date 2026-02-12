# Produção — Configurações para Ambiente Produtivo

Este diretório reúne toda a documentação necessária para colocar o dashboard de KPIs de Vendas em produção de forma profissional e segura.

Aqui você encontra os quatro pilares que transformam um relatório do Power BI Desktop em uma solução corporativa completa:

## O que tem aqui dentro

| Pasta | O que resolve |
|-------|---------------|
| `01_rls_seguranca/` | Controle de acesso — cada pessoa só vê os dados que pode ver |
| `02_atualizacao_dashboard/` | Atualização automática dos dados — sem ninguém precisar apertar F5 |
| `03_alertas_email/` | Notificações automáticas — quando algo sai do esperado, o sistema avisa |
| `04_tabela_calendario/` | Tabela dCalendario — base para toda análise temporal (YOY, MTD, QTD) |

## Por que isso importa

Um dashboard bonito no Power BI Desktop não serve para muita coisa se ele não estiver:

- **Protegido** — imagina o consultor vendo os dados de todos os colegas, ou pior, os números da diretoria
- **Atualizado** — ninguém confia em dashboard com dados de ontem quando precisa tomar decisão agora
- **Inteligente** — se a margem ficou negativa, alguém precisa saber disso antes que vire um problema maior
- **Bem estruturado** — sem uma tabela de calendário bem feita, comparações como YOY e acumulados simplesmente não funcionam

Esses quatro pontos são o que separam um projeto de BI "bonito" de um projeto de BI **em produção**.

## Pré-requisitos

- Power BI Desktop instalado
- Acesso ao Power BI Service (app.powerbi.com)
- Licença Power BI Pro (mínimo) ou Premium (recomendado para atualização a cada 1 hora)
- Acesso ao Power Automate (flow.microsoft.com)
- Gateway de dados instalado (se a fonte for on-premises)

## Ordem de implementação recomendada

1. **Primeiro:** crie a tabela dCalendario — ela é a fundação para todas as análises temporais
2. **Segundo:** configure o RLS — antes de publicar, garanta que os dados estão protegidos
3. **Terceiro:** configure a atualização automática — para que os dados estejam sempre frescos
4. **Por último:** configure os alertas — para que as pessoas certas sejam avisadas quando necessário
