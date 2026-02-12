# Power Automate — Atualização Automatizada do Dashboard

## O que é o Power Automate

Power Automate (antigo Microsoft Flow) é uma ferramenta da Microsoft que permite criar fluxos automatizados sem programar. Ele conecta centenas de serviços — Power BI, Outlook, Teams, SharePoint — e executa ações baseadas em gatilhos.

Para atualização do dashboard, funciona como um "despertador inteligente" que dispara o refresh e faz coisas depois (enviar e-mail, notificar, registrar).

## Por que usar se o Gateway já agenda?

O Gateway agenda, mas não faz mais nada. O Power Automate complementa com:

- **Encadeamento:** atualiza → espera → confirma → se falhou, notifica gestor
- **Condições:** só atualiza em dias úteis ou horário comercial
- **Tratamento de erros:** se falhou 3x, cria ticket
- **Histórico:** salva cada execução em planilha para auditoria
- **Teams:** posta no canal quando conclui

## Passo a Passo — Atualização a Cada 1 Hora

### Criando o fluxo

1. Acesse **flow.microsoft.com**
2. **"+ Criar" → "Fluxo de nuvem agendado"**
3. Configure:
   - Nome: `Atualização Dashboard KPIs Vendas`
   - Repetir a cada: **1 hora**
4. Clique em **Criar**

### Adicionando a atualização

5. **"+ Nova etapa"** → pesquise **"Power BI"**
6. Selecione **"Atualizar um conjunto de dados"**
7. Workspace: [selecione] → Dataset: [selecione]
8. **Salvar**

### Tratamento de erro (recomendado)

9. Na ação de atualizar → **três pontinhos (...) → Configurar execução posterior**
10. Marque **"falhou"** e **"atingiu o tempo limite"**
11. Adicione **"Enviar um email (V2)"** (Outlook):
    - **Para:** seu e-mail + responsável TI
    - **Assunto:** `⚠️ FALHA na atualização do Dashboard KPIs Vendas`
    - **Corpo:**
    ```
    A atualização do dashboard KPIs de Vendas falhou.

    Data/Hora: [expressão utcNow()]

    Verifique:
    1. O Gateway está online?
    2. As credenciais das fontes estão válidas?
    3. O SQL Server está acessível?

    E-mail automático do Power Automate.
    ```

### Confirmação de sucesso (opcional)

12. Na ramificação de sucesso, poste no Teams:
    - Canal: "BI - Atualizações"
    - Mensagem: `✅ Dashboard KPIs Vendas atualizado com sucesso`

### Só dias úteis (opcional)

13. Adicione **Condição** antes da atualização:
    - `dayOfWeek(utcNow())` é diferente de `0` (domingo) E diferente de `6` (sábado)
    - **Sim** → atualiza
    - **Não** → encerra

## Fluxo visual

```
[A cada 1 hora]
       │
       ▼
[É dia útil?] ──Não──→ [Encerra]
       │
      Sim
       │
       ▼
[Atualizar dataset]
       │
  ┌────┴────┐
  │         │
Sucesso    Falha
  │         │
  ▼         ▼
[Teams]   [E-mail alerta]
```

## Vantagens

- 100% na nuvem — sem instalar nada
- Encadeia ações (atualizar → notificar → registrar)
- Tratamento de erros personalizado
- Condições inteligentes
- Integração nativa com Teams, Outlook, SharePoint
- Histórico detalhado de execuções

## Desvantagens

- Não substitui o Gateway para fontes on-premises
- Na licença Pro, dataset aceita máximo 8 refreshes/dia mesmo com mais disparos
- Fluxos complexos podem ser difíceis de debugar
- Tem limites próprios de execução

## Boas práticas

- Nomes descritivos nos fluxos
- Sempre configure tratamento de erro
- Teste manualmente antes de ativar (botão "Testar")
- Monitore a primeira semana
- Fluxos separados por dataset
- Combine: Gateway faz a ponte, Power Automate dispara e monitora
