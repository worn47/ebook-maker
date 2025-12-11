/**
 * LAYOUT: MODERNO FUNCIONAL
 * Estilo: Manuais, guias, ebooks de marketing, tutoriais
 * Inspiração: A Book Apart, O'Reilly Books
 *
 * Características:
 * - Fonte sans-serif (Arial/Roboto)
 * - Caixas de destaque coloridas
 * - Listas e bullets claros
 * - Títulos em negrito pesado
 * - Linhas horizontais para dividir seções
 * - Resumos ao final de cada capítulo
 * - Foco em aprendizado rápido e escaneabilidade
 */

const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
        Header, Footer, AlignmentType, LevelFormat,
        HeadingLevel, BorderStyle, WidthType,
        ShadingType, VerticalAlign, PageNumber, PageBreak } = require('docx');
const fs = require('fs');
const path = require('path');

// Cores vibrantes e funcionais
const PRIMARY_BLUE = "0066CC";
const DARK_BLUE = "003366";
const ACCENT_ORANGE = "FF6600";
const LIGHT_BLUE = "E6F2FF";
const LIGHT_ORANGE = "FFF3E6";
const LIGHT_GREEN = "E6FFE6";
const GRAY = "666666";
const DARK_GRAY = "333333";
const WHITE = "FFFFFF";

const noBorder = { style: BorderStyle.NONE, size: 0, color: WHITE };
const noBorders = { top: noBorder, bottom: noBorder, left: noBorder, right: noBorder };

// Caixa de Dica
function createTipBox(title, content) {
  return new Table({
    columnWidths: [9360],
    rows: [
      new TableRow({
        children: [
          new TableCell({
            borders: {
              top: { style: BorderStyle.SINGLE, size: 24, color: ACCENT_ORANGE },
              bottom: noBorder, left: noBorder, right: noBorder
            },
            shading: { fill: LIGHT_ORANGE, type: ShadingType.CLEAR },
            width: { size: 9360, type: WidthType.DXA },
            children: [
              new Paragraph({
                spacing: { before: 150, after: 100 },
                children: [
                  new TextRun({ text: "💡 ", size: 24 }),
                  new TextRun({ text: title.toUpperCase(), bold: true, size: 22, font: "Arial", color: ACCENT_ORANGE })
                ]
              }),
              new Paragraph({
                spacing: { before: 0, after: 150 },
                children: [new TextRun({ text: content, size: 22, font: "Arial", color: DARK_GRAY })]
              })
            ]
          })
        ]
      })
    ]
  });
}

// Caixa de Aviso/Importante
function createWarningBox(content) {
  return new Table({
    columnWidths: [9360],
    rows: [
      new TableRow({
        children: [
          new TableCell({
            borders: {
              left: { style: BorderStyle.SINGLE, size: 36, color: "CC0000" },
              top: noBorder, bottom: noBorder, right: noBorder
            },
            shading: { fill: "FFE6E6", type: ShadingType.CLEAR },
            width: { size: 9360, type: WidthType.DXA },
            children: [
              new Paragraph({
                spacing: { before: 150, after: 100 },
                children: [
                  new TextRun({ text: "⚠️ IMPORTANTE: ", bold: true, size: 22, font: "Arial", color: "CC0000" }),
                  new TextRun({ text: content, size: 22, font: "Arial", color: DARK_GRAY })
                ]
              })
            ]
          })
        ]
      })
    ]
  });
}

// Caixa de Resumo do Capítulo
function createSummaryBox(items) {
  const rows = items.map((item, index) =>
    new Paragraph({
      spacing: { before: 50, after: 50 },
      children: [
        new TextRun({ text: `${index + 1}. `, bold: true, size: 22, font: "Arial", color: PRIMARY_BLUE }),
        new TextRun({ text: item, size: 22, font: "Arial", color: DARK_GRAY })
      ]
    })
  );

  return new Table({
    columnWidths: [9360],
    rows: [
      new TableRow({
        children: [
          new TableCell({
            borders: noBorders,
            shading: { fill: LIGHT_GREEN, type: ShadingType.CLEAR },
            width: { size: 9360, type: WidthType.DXA },
            children: [
              new Paragraph({
                spacing: { before: 150, after: 100 },
                children: [
                  new TextRun({ text: "📋 RESUMO DO CAPÍTULO", bold: true, size: 24, font: "Arial", color: "006600" })
                ]
              }),
              ...rows,
              new Paragraph({ spacing: { after: 150 }, children: [] })
            ]
          })
        ]
      })
    ]
  });
}

// Cabeçalho de seção com linha
function createSectionHeader(number, title) {
  return [
    new Paragraph({
      spacing: { before: 400, after: 100 },
      border: { bottom: { style: BorderStyle.SINGLE, size: 12, color: PRIMARY_BLUE } },
      children: [
        new TextRun({ text: `${number}. `, bold: true, size: 36, font: "Arial", color: PRIMARY_BLUE }),
        new TextRun({ text: title, bold: true, size: 36, font: "Arial", color: DARK_BLUE })
      ]
    }),
    new Paragraph({ spacing: { after: 200 }, children: [] })
  ];
}

// Subtítulo
function createSubheading(text) {
  return new Paragraph({
    spacing: { before: 300, after: 150 },
    children: [new TextRun({ text: text, bold: true, size: 28, font: "Arial", color: DARK_BLUE })]
  });
}

// Parágrafo normal
function createParagraph(text) {
  return new Paragraph({
    spacing: { after: 200 },
    children: [new TextRun({ text: text, size: 24, font: "Arial", color: DARK_GRAY })]
  });
}

// Item de lista com bullet
function createBulletItem(text, bold = false) {
  return new Paragraph({
    spacing: { after: 100 },
    bullet: { level: 0 },
    children: [new TextRun({ text: text, size: 24, font: "Arial", color: DARK_GRAY, bold: bold })]
  });
}

// Item de lista numerada com destaque
function createNumberedItem(number, title, description) {
  return new Paragraph({
    spacing: { after: 150 },
    children: [
      new TextRun({ text: `${number}. `, bold: true, size: 24, font: "Arial", color: PRIMARY_BLUE }),
      new TextRun({ text: `${title}: `, bold: true, size: 24, font: "Arial", color: DARK_GRAY }),
      new TextRun({ text: description, size: 24, font: "Arial", color: DARK_GRAY })
    ]
  });
}

// Documento exemplo
const doc = new Document({
  styles: {
    default: { document: { run: { font: "Arial", size: 24 } } }
  },
  numbering: {
    config: [
      { reference: "bullet-list",
        levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] }
    ]
  },
  sections: [
    // ============ CAPA ============
    {
      properties: {
        page: { margin: { top: 720, right: 720, bottom: 720, left: 720 } }
      },
      children: [
        new Table({
          columnWidths: [10800],
          rows: [
            new TableRow({
              height: { value: 14400, rule: "exact" },
              children: [
                new TableCell({
                  borders: noBorders,
                  shading: { fill: PRIMARY_BLUE, type: ShadingType.CLEAR },
                  width: { size: 10800, type: WidthType.DXA },
                  verticalAlign: VerticalAlign.CENTER,
                  children: [
                    new Paragraph({
                      alignment: AlignmentType.CENTER,
                      spacing: { after: 100 },
                      children: [new TextRun({ text: "GUIA PRÁTICO", bold: true, size: 28, font: "Arial", color: WHITE })]
                    }),
                    new Paragraph({
                      alignment: AlignmentType.CENTER,
                      spacing: { after: 50 },
                      children: [new TextRun({ text: "ENGENHARIA", bold: true, size: 72, font: "Arial", color: WHITE })]
                    }),
                    new Paragraph({
                      alignment: AlignmentType.CENTER,
                      spacing: { after: 50 },
                      children: [new TextRun({ text: "DE PROMPT", bold: true, size: 72, font: "Arial", color: WHITE })]
                    }),
                    new Paragraph({
                      alignment: AlignmentType.CENTER,
                      spacing: { before: 200, after: 400 },
                      children: [new TextRun({ text: "━━━━━━━━━━━━━━━━━━━━", size: 24, color: ACCENT_ORANGE })]
                    }),
                    new Paragraph({
                      alignment: AlignmentType.CENTER,
                      spacing: { after: 100 },
                      children: [new TextRun({ text: "Técnicas, Frameworks e Exemplos", size: 32, font: "Arial", color: WHITE })]
                    }),
                    new Paragraph({
                      alignment: AlignmentType.CENTER,
                      children: [new TextRun({ text: "para Resultados Imediatos", size: 32, font: "Arial", color: WHITE })]
                    }),
                    new Paragraph({
                      alignment: AlignmentType.CENTER,
                      spacing: { before: 600 },
                      children: [new TextRun({ text: "2026", bold: true, size: 36, font: "Arial", color: ACCENT_ORANGE })]
                    })
                  ]
                })
              ]
            })
          ]
        })
      ]
    },
    // ============ CONTEÚDO ============
    {
      properties: {
        page: { margin: { top: 1080, right: 1080, bottom: 1080, left: 1080 } }
      },
      headers: {
        default: new Header({
          children: [
            new Table({
              columnWidths: [4680, 4680],
              rows: [
                new TableRow({
                  children: [
                    new TableCell({
                      borders: { bottom: { style: BorderStyle.SINGLE, size: 6, color: PRIMARY_BLUE }, top: noBorder, left: noBorder, right: noBorder },
                      width: { size: 4680, type: WidthType.DXA },
                      children: [new Paragraph({
                        children: [new TextRun({ text: "GUIA PRÁTICO", bold: true, size: 18, font: "Arial", color: PRIMARY_BLUE })]
                      })]
                    }),
                    new TableCell({
                      borders: { bottom: { style: BorderStyle.SINGLE, size: 6, color: PRIMARY_BLUE }, top: noBorder, left: noBorder, right: noBorder },
                      width: { size: 4680, type: WidthType.DXA },
                      children: [new Paragraph({
                        alignment: AlignmentType.RIGHT,
                        children: [new TextRun({ text: "ENGENHARIA DE PROMPT", bold: true, size: 18, font: "Arial", color: ACCENT_ORANGE })]
                      })]
                    })
                  ]
                })
              ]
            })
          ]
        })
      },
      footers: {
        default: new Footer({
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              border: { top: { style: BorderStyle.SINGLE, size: 6, color: PRIMARY_BLUE } },
              spacing: { before: 100 },
              children: [
                new TextRun({ text: "Página ", size: 20, font: "Arial", color: GRAY }),
                new TextRun({ children: [PageNumber.CURRENT], bold: true, size: 20, font: "Arial", color: PRIMARY_BLUE })
              ]
            })
          ]
        })
      },
      children: [
        // Capítulo 1
        ...createSectionHeader("01", "O QUE É ENGENHARIA DE PROMPT"),

        createParagraph("Engenharia de Prompt é a habilidade de comunicar-se efetivamente com modelos de inteligência artificial através de instruções bem estruturadas. É a diferença entre resultados genéricos e resultados extraordinários."),

        createTipBox("DICA RÁPIDA", "Sempre comece seu prompt definindo o papel que a IA deve assumir. Exemplo: \"Você é um especialista em marketing digital...\""),

        createSubheading("Por Que Isso Importa?"),

        createParagraph("Em 2026, profissionais que dominam essa habilidade têm vantagem competitiva significativa. Veja os dados:"),

        createBulletItem("85% das empresas Fortune 500 usam IA diariamente"),
        createBulletItem("Profissionais com skills de prompt ganham 40% mais"),
        createBulletItem("Produtividade aumenta em média 10x com prompts otimizados"),

        createWarningBox("Não confie cegamente nas respostas da IA. Sempre verifique fatos e dados antes de usar o conteúdo gerado."),

        createSubheading("Os 4 Pilares de Um Bom Prompt"),

        createNumberedItem("1", "Contexto", "Forneça informações de fundo relevantes"),
        createNumberedItem("2", "Instrução", "Diga exatamente o que você quer"),
        createNumberedItem("3", "Formato", "Especifique como quer a resposta"),
        createNumberedItem("4", "Tom", "Defina o estilo de comunicação"),

        new Paragraph({ spacing: { before: 300 }, children: [] }),
        createSummaryBox([
          "Engenharia de Prompt é essencial em 2026",
          "Defina sempre contexto, instrução, formato e tom",
          "Verifique as respostas antes de usar",
          "Pratique diariamente para melhorar"
        ]),

        new Paragraph({ children: [new PageBreak()] }),

        // Capítulo 2
        ...createSectionHeader("02", "TÉCNICAS AVANÇADAS"),

        createParagraph("Agora que você conhece os fundamentos, vamos explorar técnicas que vão elevar seus resultados ao próximo nível."),

        createSubheading("Chain-of-Thought (Cadeia de Pensamento)"),

        createParagraph("Peça à IA para \"pensar em voz alta\". Isso melhora drasticamente respostas para problemas complexos."),

        createTipBox("COMO USAR", "Adicione ao seu prompt: \"Pense passo a passo antes de responder\" ou \"Explique seu raciocínio\"."),

        createSubheading("Few-Shot Learning"),

        createParagraph("Forneça 2-3 exemplos do tipo de resposta que você espera. A IA aprenderá o padrão e aplicará aos novos casos."),

        createBulletItem("Exemplo 1: [entrada] → [saída esperada]"),
        createBulletItem("Exemplo 2: [entrada] → [saída esperada]"),
        createBulletItem("Agora faça: [sua entrada real]"),

        createSubheading("Role Playing"),

        createParagraph("Atribua um papel específico à IA para ativar conhecimentos especializados:"),

        createBulletItem("\"Você é um advogado especialista em...\""),
        createBulletItem("\"Atue como um professor explicando para iniciantes...\""),
        createBulletItem("\"Você é um crítico rigoroso analisando...\""),

        new Paragraph({ spacing: { before: 300 }, children: [] }),
        createSummaryBox([
          "Use Chain-of-Thought para problemas complexos",
          "Few-Shot Learning: mostre exemplos",
          "Role Playing: defina um papel especializado",
          "Combine técnicas para melhores resultados"
        ])
      ]
    }
  ]
});

// Exportar
const scriptDir = path.dirname(__filename);
const rootDir = path.join(scriptDir, '..');

Packer.toBuffer(doc).then(buffer => {
  const outputPath = path.join(rootDir, 'output', 'Layout_Moderno_Funcional.docx');
  fs.writeFileSync(outputPath, buffer);
  console.log(`Layout Moderno Funcional criado: ${outputPath}`);
});

module.exports = { createTipBox, createWarningBox, createSummaryBox, createSectionHeader, createSubheading, createParagraph, createBulletItem, createNumberedItem };
