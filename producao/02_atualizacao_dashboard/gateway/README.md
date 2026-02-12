# Gateway de Dados — Configuração Passo a Passo

## O que é o Gateway

O Gateway de Dados (On-premises Data Gateway) é um software que você instala em um computador ou servidor dentro da sua empresa. Ele funciona como uma ponte segura entre as fontes de dados locais e o Power BI na nuvem.

Sem o Gateway, o Power BI Service não enxerga o que está dentro da sua rede corporativa. Com ele, os dados fluem de forma criptografada.

## Quando é obrigatório

| Fonte de dados | Precisa de Gateway? |
|---------------|-------------------|
| SQL Server na empresa | Sim |
| Excel na rede local | Sim |
| Excel no SharePoint/OneDrive | Não |
| Azure SQL Database | Não |

## Tipos de Gateway

| Tipo | Para quem | Uso |
|------|-----------|-----|
| **Modo Pessoal** | Uso individual | Só funciona para quem instalou — apenas para testes |
| **Modo Empresarial (Standard)** | Equipes | Compartilhado entre datasets e usuários — use este em produção |

## Pré-requisitos

- Computador ou servidor Windows **ligado 24 horas** e conectado à internet (nunca use notebook pessoal)
- Conta Power BI com permissão de administrador do workspace
- Credenciais de acesso às fontes de dados

## Instalação

1. Acesse: https://powerbi.microsoft.com/gateway/
2. Baixe o **On-premises Data Gateway (Standard)**
3. Execute o instalador no servidor
4. Faça login com a mesma conta do Power BI Service
5. Dê um nome ao Gateway (ex: "Gateway-Servidor-Producao")
6. Defina e guarde a chave de recuperação
7. Conclua a instalação

## Configuração no Power BI Service

1. Acesse **app.powerbi.com** → **Engrenagem (⚙) → Gerenciar conexões e gateways**
2. Clique em **"+ Novo"** para adicionar fontes:

**SQL Server:**
- Tipo: SQL Server
- Servidor: `nome-do-servidor` ou `IP`
- Banco: `nome_do_banco`
- Autenticação: Windows ou SQL Authentication

**Excel em pasta de rede:**
- Tipo: Arquivo/Pasta
- Caminho: `\servidor\pastarquivo.xlsx`

**Azure SQL (sem Gateway):**
- Configure direto nas credenciais do dataset

3. Teste cada conexão

## Agendar atualização

1. No dataset → **três pontinhos (...) → Configurações**
2. **Conexão do gateway** → selecione o Gateway
3. **Credenciais da fonte** → verifique status "Conectado"
4. **Atualização agendada** → ative "Manter seus dados atualizados"
5. Adicione os horários:

**Premium (a cada 1 hora):**
```
00:00, 01:00, 02:00, 03:00, 04:00, 05:00, 06:00, 07:00,
08:00, 09:00, 10:00, 11:00, 12:00, 13:00, 14:00, 15:00,
16:00, 17:00, 18:00, 19:00, 20:00, 21:00, 22:00, 23:00
```

**Pro (máximo 8/dia):**
```
06:00, 08:00, 10:00, 12:00, 14:00, 16:00, 18:00, 21:00
```

6. Marque "Enviar emails de notificação de falha"
7. Clique em **Aplicar**

## Vantagens

- Configuração centralizada e visual
- Funciona silenciosamente em segundo plano
- Suporta múltiplas fontes e datasets
- Criptografia ponta a ponta
- Alertas de falha nativos

## Desvantagens

- Precisa de máquina ligada 24h
- Se a máquina cai, a atualização falha
- Limite de atualizações depende da licença
- Não permite encadear ações (atualizar → notificar → registrar)
- Monitoramento de falhas é básico

## Boas práticas

- Instale em **servidor dedicado** com alta disponibilidade
- Configure notificações de falha para pelo menos 2 pessoas
- Monitore o status semanalmente
- Mantenha sempre atualizado
- Para 5+ datasets, considere cluster de Gateway (múltiplas máquinas)
