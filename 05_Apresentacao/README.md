# Apresentação Executiva

Este diretório contém a apresentação executiva gerada automaticamente via script.

## Arquivos
- `build_ppt.js` — script em Node + PptxGenJS
- `Relatorio_Executivo_Vendas.pptx` — apresentação gerada

## Como gerar o PPTX
```bash
npm init -y
npm i pptxgenjs
node build_ppt.js
```

## Observações de ambiente
- Em ambientes com bloqueio de acesso ao npm, foi incluído um **stub local** em `node_modules/pptxgenjs` para permitir a execução do script e a geração do arquivo (placeholder).
- Ao rodar em ambiente liberado, reinstale `pptxgenjs` para gerar um PPTX completo com imagens.

## Regras
- Inserir prints de `assets/screenshots/` quando disponíveis.
- Slide final deve conter o link do dashboard: **🔗 Link do Dashboard: <INSERIR_AQUI>**
