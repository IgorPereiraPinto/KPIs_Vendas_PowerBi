const pptxgen = require("pptxgenjs");
const fs = require("fs");
const path = require("path");

const pptx = new pptxgen();

pptx.author = "Equipe Analytics/BI";
pptx.company = "KPIs de Vendas";
pptx.layout = "LAYOUT_WIDE";

const SCREENSHOTS_DIR = path.join(__dirname, "..", "assets", "screenshots");
const screenshotFiles = fs.existsSync(SCREENSHOTS_DIR)
  ? fs
      .readdirSync(SCREENSHOTS_DIR)
      .filter((file) => /\.(png|jpg|jpeg)$/i.test(file))
  : [];

const getImagePath = (index) => {
  if (screenshotFiles.length === 0) return null;
  const file = screenshotFiles[index % screenshotFiles.length];
  return path.join(SCREENSHOTS_DIR, file);
};

const addTitle = (slide, title) => {
  slide.addText(title, {
    x: 0.5,
    y: 0.3,
    w: 12.3,
    h: 0.5,
    fontSize: 28,
    bold: true,
    color: "1F2937",
  });
};

const addSubtitle = (slide, text) => {
  slide.addText(text, {
    x: 0.5,
    y: 1.0,
    w: 12.3,
    h: 0.6,
    fontSize: 16,
    color: "4B5563",
  });
};

const addPlaceholderImage = (slide, imgPath, x, y, w, h) => {
  if (imgPath && fs.existsSync(imgPath)) {
    slide.addImage({ path: imgPath, x, y, w, h });
  } else {
    slide.addShape(pptx.ShapeType.rect, {
      x,
      y,
      w,
      h,
      fill: { color: "F3F4F6" },
      line: { color: "D1D5DB" },
    });
    slide.addText("Print não disponível", {
      x,
      y: y + h / 2 - 0.2,
      w,
      h: 0.4,
      fontSize: 14,
      align: "center",
      color: "9CA3AF",
    });
  }
};

const addBullets = (slide, text, x, y, w, h) => {
  slide.addText(text, {
    x,
    y,
    w,
    h,
    fontSize: 14,
    color: "374151",
    bullet: { indent: 18 },
  });
};

// Slide 1 - Capa
{
  const slide = pptx.addSlide();
  addTitle(slide, "KPIs de Vendas — Power BI + DAX");
  addSubtitle(slide, "Relatório executivo | Período: (validar no PBIX)");
  slide.addText("Autor: Equipe Analytics/BI", {
    x: 0.5,
    y: 1.8,
    w: 12.3,
    h: 0.4,
    fontSize: 14,
    color: "6B7280",
  });
}

// Slide 2 - Contexto e objetivo
{
  const slide = pptx.addSlide();
  addTitle(slide, "Contexto e objetivo");
  addBullets(
    slide,
    [
      "Documentar KPIs de vendas e desempenho comercial.",
      "Fonte: SQL Server (extração/refresh via Power BI).",
      "KPIs calculados em DAX no modelo do Power BI.",
    ].join("\n"),
    0.7,
    1.3,
    12,
    2.5
  );
}

// Slide 3 - Fonte e metodologia
{
  const slide = pptx.addSlide();
  addTitle(slide, "Fonte e metodologia");
  addBullets(
    slide,
    [
      "SQL Server como fonte transacional.",
      "Modelagem dimensional em estrela (validar no PBIX).",
      "Medidas DAX para KPIs principais e temporais.",
    ].join("\n"),
    0.7,
    1.3,
    12,
    2.5
  );
  addPlaceholderImage(slide, getImagePath(0), 0.8, 3.2, 12, 3.6);
}

// Slide 4 - Visão geral
{
  const slide = pptx.addSlide();
  addTitle(slide, "Visão geral (KPIs principais)");
  addPlaceholderImage(slide, getImagePath(1), 0.6, 1.4, 12.4, 4.2);
  addBullets(
    slide,
    [
      "KPIs principais em cards (Vendas, Margem, Resultado).",
      "Leitura consolidada da performance.",
    ].join("\n"),
    0.7,
    5.8,
    12,
    1.2
  );
}

// Slide 5 - Tendência
{
  const slide = pptx.addSlide();
  addTitle(slide, "Tendência (evolução no tempo)");
  addPlaceholderImage(slide, getImagePath(2), 0.6, 1.4, 12.4, 4.2);
  addBullets(
    slide,
    [
      "Comparativos MoM/YoY (validar no PBIX).",
      "Identificação de períodos de aceleração ou retração.",
    ].join("\n"),
    0.7,
    5.8,
    12,
    1.2
  );
}

// Slide 6 - Performance por cidade
{
  const slide = pptx.addSlide();
  addTitle(slide, "Performance por cidade (ranking)");
  addPlaceholderImage(slide, getImagePath(3), 0.6, 1.4, 12.4, 4.2);
  addBullets(
    slide,
    [
      "Ranking de cidades/locais com melhor desempenho.",
      "Apoio à priorização regional.",
    ].join("\n"),
    0.7,
    5.8,
    12,
    1.2
  );
}

// Slide 7 - Performance por categoria
{
  const slide = pptx.addSlide();
  addTitle(slide, "Performance por categoria/produto");
  addPlaceholderImage(slide, getImagePath(4), 0.6, 1.4, 12.4, 4.2);
  addBullets(
    slide,
    [
      "Categorias com maior contribuição em vendas/margem.",
      "Base para decisões de sortimento.",
    ].join("\n"),
    0.7,
    5.8,
    12,
    1.2
  );
}

// Slide 8 - Atingimento de meta
{
  const slide = pptx.addSlide();
  addTitle(slide, "Atingimento de meta e gap");
  addPlaceholderImage(slide, getImagePath(5), 0.6, 1.4, 12.4, 4.2);
  addBullets(
    slide,
    [
      "Gauge/indicadores de meta vs realizado.",
      "Identificação de gap para fechamento.",
    ].join("\n"),
    0.7,
    5.8,
    12,
    1.2
  );
}

// Slide 9 - Performance por vendedor
{
  const slide = pptx.addSlide();
  addTitle(slide, "Performance por vendedor");
  addPlaceholderImage(slide, getImagePath(6), 0.6, 1.4, 12.4, 4.2);
  addBullets(
    slide,
    [
      "Ranking de vendedores e análise por gerente.",
      "Suporte à gestão de equipe e metas.",
    ].join("\n"),
    0.7,
    5.8,
    12,
    1.2
  );
}

// Slide 10 - Heatmap
{
  const slide = pptx.addSlide();
  addTitle(slide, "Heatmap (sazonalidade)");
  addPlaceholderImage(slide, getImagePath(7), 0.6, 1.4, 12.4, 4.2);
  addBullets(
    slide,
    [
      "Sazonalidade por período (validar no PBIX).",
      "Apoio ao planejamento comercial.",
    ].join("\n"),
    0.7,
    5.8,
    12,
    1.2
  );
}

// Slide 11 - Top insights
{
  const slide = pptx.addSlide();
  addTitle(slide, "Top insights e ações recomendadas");
  addBullets(
    slide,
    [
      "Priorizar análises de períodos de pico/vale.",
      "Revisar desempenho por categoria e ajustar mix.",
      "Atuar em gaps de meta com ações táticas.",
    ].join("\n"),
    0.7,
    1.6,
    12,
    2.5
  );
  addPlaceholderImage(slide, getImagePath(8), 0.6, 3.4, 12.4, 3.2);
}

// Slide 12 - Link do dashboard
{
  const slide = pptx.addSlide();
  addTitle(slide, "Dashboard e próximos passos");
  addBullets(
    slide,
    [
      "🔗 Link do Dashboard: <INSERIR_AQUI>",
      "Próximos passos: validar KPIs e revisar prints do PBIX.",
    ].join("\n"),
    0.7,
    1.6,
    12,
    2
  );
}

pptx.writeFile({ fileName: path.join(__dirname, "Relatorio_Executivo_Vendas.pptx") });
