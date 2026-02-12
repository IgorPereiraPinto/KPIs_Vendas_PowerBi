# Atualização Automática do Dashboard

## O problema que queremos resolver

Quando você publica um relatório no Power BI Service, os dados ficam "congelados" no momento da publicação. Se um vendedor fechou uma venda agora, essa venda não aparece no dashboard até que alguém atualize os dados manualmente — ou até que a atualização automática rode.

Em um ambiente comercial onde decisões são tomadas em tempo real, dados desatualizados podem levar a conclusões erradas.

## Duas formas de automatizar

| Ferramenta | O que faz | Quando usar |
|-----------|-----------|-------------|
| **Gateway de Dados** | Cria uma ponte entre fontes locais (SQL Server, Excel na rede) e o Power BI na nuvem. Agenda horários fixos. | Quando suas fontes estão dentro da empresa (on-premises) |
| **Power Automate** | Cria fluxos que disparam a atualização via API. Pode ser por horário, evento ou condição. | Quando quer mais flexibilidade ou encadear ações |

## Comparativo direto

| Critério | Gateway | Power Automate |
|----------|---------|---------------|
| **Configuração** | Instala um software no servidor | Configura um fluxo na web |
| **Frequência (Pro)** | 8 atualizações/dia | Pode disparar mais, mas dataset Pro aceita só 8/dia |
| **Frequência (Premium)** | 48 atualizações/dia | Pode disparar até 48x/dia |
| **Fontes on-premises** | Obrigatório | Precisa do Gateway por baixo |
| **Fontes na nuvem** | Não precisa | Não precisa |
| **Ações extras** | Só atualiza dados | Pode enviar e-mail, notificar no Teams, registrar log |
| **Monitoramento de falhas** | E-mail simples | Fluxo de erro personalizado |

## Recomendação: use os dois juntos

Na maioria dos cenários corporativos, a combinação é:

- O **Gateway** faz a ponte com as fontes on-premises
- O **Power Automate** dispara a atualização e cuida das notificações

## Fontes de dados combinadas

É comum que um dataset tenha múltiplas fontes:

| Fonte | Precisa de Gateway? |
|-------|-------------------|
| SQL Server (on-premises) | Sim |
| SQL Azure | Não |
| Excel no SharePoint | Não |
| Excel na máquina local | Sim (evite em produção) |

Quando o dataset mistura fontes locais e na nuvem, o Gateway é configurado apenas para as fontes locais. As fontes na nuvem são configuradas diretamente nas credenciais do dataset no Power BI Service. O refresh é do dataset inteiro — quando dispara, todas as fontes atualizam de uma vez.

## Licenças e limites

| Licença | Atualizações/dia | A cada 1 hora? |
|---------|-------------------|----------------|
| **Power BI Pro** | 8 | Não nativamente |
| **Power BI Premium Per User** | 48 | Sim |
| **Power BI Premium (capacidade)** | 48 | Sim |

Para atualizar a cada 1 hora, você precisa de licença Premium.

Consulte as subpastas `gateway/` e `power_automate/` para o passo a passo de cada ferramenta.
