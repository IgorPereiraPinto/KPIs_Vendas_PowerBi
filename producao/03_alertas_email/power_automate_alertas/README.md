# Power Automate — Alertas Inteligentes por E-mail

## Quando usar

Quando os alertas nativos não são suficientes. O Power Automate permite:

- E-mails com tabela de dados no corpo
- Destinatários diferentes por nível hierárquico
- Combinar condições (faturamento baixo E margem negativa)
- Notificar no Teams ao mesmo tempo
- Executar query DAX direto no dataset

## Alerta: Faturamento Abaixo de R$ 1 Milhão

### Passo a Passo

1. Acesse **flow.microsoft.com**
2. **"+ Criar" → "Fluxo de nuvem agendado"**
3. Nome: `Alerta Faturamento Abaixo de 1M` — Repetir a cada: **1 hora**
4. Adicione: **"Executar uma consulta em um conjunto de dados"** (Power BI)
5. Configure o workspace e dataset
6. Query DAX:

```dax
EVALUATE
ROW(
    "Faturamento", [Faturamento],
    "Meta", [Meta],
    "Atingimento", [Porcentagem Meta],
    "Margem", [Margem]
)
```

7. Adicione uma **Condição**:
   - `Faturamento` **é menor que** `1000000`

8. No caminho **"Sim"** → **"Enviar um email (V2)"**:
   - **Para:** gerente.regional@empresa.com; diretor.canal@empresa.com; planejamento@empresa.com
   - **Assunto:** `🚨 ALERTA: Faturamento abaixo de R$ 1 milhão`
   - **Corpo (ative o modo HTML):**

```html
<h2>⚠️ Alerta de Faturamento</h2>
<p>O faturamento atual está abaixo do limite mínimo de R$ 1.000.000.</p>

<table border="1" cellpadding="8" style="border-collapse: collapse;">
  <tr style="background-color: #2E7D32; color: white;">
    <th>Indicador</th>
    <th>Valor Atual</th>
  </tr>
  <tr>
    <td>Faturamento</td>
    <td>[valor dinâmico do resultado da query]</td>
  </tr>
  <tr>
    <td>Meta</td>
    <td>[valor dinâmico do resultado da query]</td>
  </tr>
  <tr>
    <td>Atingimento</td>
    <td>[valor dinâmico do resultado da query]</td>
  </tr>
  <tr>
    <td>Margem</td>
    <td>[valor dinâmico do resultado da query]</td>
  </tr>
</table>

<br>
<p><a href="[cole aqui o link do dashboard]">Abrir o Dashboard</a></p>
<p><small>Alerta automático do Power Automate.</small></p>
```

9. No caminho **"Não"** → não faça nada
10. **Salvar e testar**

## Alerta: Margem Negativa

Mesmo fluxo, ajustando:

- Condição: `Margem` **é menor que** `0`
- Destinatários: diretor.canal@empresa.com; diretoria@empresa.com (margem negativa é mais crítica — escala para cima)
- Assunto: `🚨 ALERTA CRÍTICO: Margem negativa detectada`

## Alerta Combinado (avançado)

Para cenários onde faturamento E margem estão ruins ao mesmo tempo:

1. Execute a query DAX que retorna ambos os valores
2. Use condições aninhadas:
   - **Se** Faturamento < 1.000.000 **E** Margem < 0 → prioridade CRÍTICA → Diretoria + Planejamento
   - **Se** apenas Faturamento < 1.000.000 → prioridade ALTA → Gerente Regional + Diretor
   - **Se** apenas Margem < 0 → prioridade ALTA → Diretor + Diretoria

## Fluxo visual

```
[A cada 1 hora]
       │
       ▼
[Query DAX: busca Faturamento e Margem]
       │
       ▼
[Faturamento < 1M?]
  │          │
 Sim        Não
  │          │
  ▼          ▼
[Margem < 0?]  [Margem < 0?]
  │      │       │      │
 Sim    Não     Sim    Não
  │      │       │      │
  ▼      ▼       ▼      ▼
[CRÍTICO] [ALTO]  [ALTO]  [OK]
[Diretoria] [Regional] [Diretor] [Nenhum
+Planej.]  +Diretor]  +Diretoria] alerta]
```

## Vantagens sobre alertas nativos

| Recurso | Alertas Nativos | Power Automate |
|---------|----------------|---------------|
| Múltiplos destinatários | Não | Sim |
| Dados detalhados no e-mail | Não | Sim (tabela HTML) |
| Condições combinadas | Não | Sim |
| Notificação no Teams | Não | Sim |
| Personalizar corpo do e-mail | Não | Sim (HTML completo) |
| Escalar por hierarquia | Não | Sim |
| Histórico de execuções | Básico | Completo |

## Boas práticas

- Não envie alertas demais — se chegar 20 e-mails por dia, as pessoas vão ignorar
- Defina thresholds relevantes para o negócio (o R$ 1 milhão faz sentido para a empresa?)
- Teste com um grupo pequeno antes de enviar para toda a hierarquia
- Inclua sempre o link direto para o dashboard no e-mail
- Monitore se os alertas estão gerando ação — alerta que ninguém lê é desperdício
