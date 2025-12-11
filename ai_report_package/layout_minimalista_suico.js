/**
 * LAYOUT: MINIMALISTA SUÍÇO
 * Estilo: Portfólios, manifestos, livros de design/arquitetura
 * Inspiração: Josef Müller-Brockmann, Vignelli Canon
 *
 * Características:
 * - Grid assimétrico (coluna lateral + texto principal)
 * - Muito espaço em branco
 * - Títulos gigantes em Helvetica/Arial Black
 * - Texto alinhado à esquerda (nunca justificado)
 * - Numeração de página minimalista
 * - Contraste alto (preto no branco)
 * - Uso de peso tipográfico para hierarquia
 */

const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
        Header, Footer, AlignmentType, LevelFormat,
        HeadingLevel, BorderStyle, WidthType,
        ShadingType, VerticalAlign, PageNumber, PageBreak } = require('docx');
const fs = require('fs');
const path = require('path');

// Paleta minimalista - apenas preto, branco e um cinza
const BLACK = "000000";
const DARK_GRAY = "333333";
const MEDIUM_GRAY = "999999";
const LIGHT_GRAY = "E5E5E5";
const WHITE = "FFFFFF";

const noBorder = { style: BorderStyle.NONE, size: 0, color: WHITE };
const noBorders = { top: noBorder, bottom: noBorder, left: noBorder, right: noBorder };

// Título de seção gigante com número
function createSectionTitle(number, title) {
  return [
    new Paragraph({
      spacing: { before: 1200, after: 200 },
      children: [new TextRun({ text: number, bold: true, size: 144, font: "Arial Black", color: LIGHT_GRAY })]
    }),
    new Paragraph({
      spacing: { after: 600 },
      children: [new TextRun({ text: title.toUpperCase(), bold: true, size: 56, font: "Arial", color: BLACK })]
    })
  ];
}

// Layout de duas colunas (nota lateral + texto principal)
function createTwoColumnLayout(sideNote, mainText) {
  return new Table({
    columnWidths: [2340, 7020],
    rows: [
      new TableRow({
        children: [
          // Coluna da esquerda - nota/label
          new TableCell({
            borders: noBorders,
            width: { size: 2340, type: WidthType.DXA },
            children: [
              new Paragraph({
                spacing: { before: 100 },
                children: [new TextRun({ text: sideNote, size: 18, font: "Arial", color: MEDIUM_GRAY })]
              })
            ]
          }),
          // Coluna da direita - texto principal
          new TableCell({
            borders: noBorders,
            width: { size: 7020, type: WidthType.DXA },
            children: [
              new Paragraph({
                spacing: { after: 200 },
                children: [new TextRun({ text: mainText, size: 24, font: "Arial", color: DARK_GRAY })]
              })
            ]
          })
        ]
      })
    ]
  });
}

// Texto principal simples (alinhado à esquerda)
function createMainText(text) {
  return new Paragraph({
    alignment: AlignmentType.LEFT,
    indent: { left: 2520 }, // Indentação para alinhar com coluna direita
    spacing: { after: 240, line: 360 },
    children: [new TextRun({ text: text, size: 24, font: "Arial", color: DARK_GRAY })]
  });
}

// Subtítulo em negrito
function createSubtitle(text) {
  return new Paragraph({
    alignment: AlignmentType.LEFT,
    indent: { left: 2520 },
    spacing: { before: 400, after: 200 },
    children: [new TextRun({ text: text, bold: true, size: 28, font: "Arial", color: BLACK })]
  });
}

// Citação destacada
function createQuote(text) {
  return new Paragraph({
    alignment: AlignmentType.LEFT,
    indent: { left: 2520 },
    spacing: { before: 400, after: 400 },
    children: [new TextRun({ text: `"${text}"`, italics: true, size: 32, font: "Arial", color: BLACK })]
  });
}

// Item de lista minimalista
function createListItem(text) {
  return new Paragraph({
    alignment: AlignmentType.LEFT,
    indent: { left: 2880 },
    spacing: { after: 120 },
    children: [
      new TextRun({ text: "— ", size: 24, font: "Arial", color: MEDIUM_GRAY }),
      new TextRun({ text: text, size: 24, font: "Arial", color: DARK_GRAY })
    ]
  });
}

// Espaço em branco intencional
function createWhitespace(amount = 600) {
  return new Paragraph({ spacing: { before: amount }, children: [] });
}

// Linha divisória sutil
function createDivider() {
  return new Table({
    columnWidths: [2340, 7020],
    rows: [
      new TableRow({
        children: [
          new TableCell({
            borders: noBorders,
            width: { size: 2340, type: WidthType.DXA },
            children: [new Paragraph({ children: [] })]
          }),
          new TableCell({
            borders: { top: { style: BorderStyle.SINGLE, size: 6, color: LIGHT_GRAY }, bottom: noBorder, left: noBorder, right: noBorder },
            width: { size: 7020, type: WidthType.DXA },
            children: [new Paragraph({ spacing: { before: 300 }, children: [] })]
          })
        ]
      })
    ]
  });
}

// Documento exemplo
const doc = new Document({
  styles: {
    default: { document: { run: { font: "Arial", size: 24 } } }
  },
  sections: [
    // ============ CAPA MINIMALISTA ============
    {
      properties: {
        page: { margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } }
      },
      children: [
        new Paragraph({ spacing: { before: 2000 }, children: [] }),
        new Paragraph({
          children: [new TextRun({ text: "01", bold: true, size: 200, font: "Arial Black", color: LIGHT_GRAY })]
        }),
        new Paragraph({
          spacing: { before: 400, after: 200 },
          children: [new TextRun({ text: "ENGENHARIA", bold: true, size: 72, font: "Arial", color: BLACK })]
        }),
        new Paragraph({
          spacing: { after: 200 },
          children: [new TextRun({ text: "DE PROMPT", bold: true, size: 72, font: "Arial", color: BLACK })]
        }),
        new Paragraph({ spacing: { before: 1200 }, children: [] }),
        new Paragraph({
          children: [new TextRun({ text: "O conhecimento que vai", size: 28, font: "Arial", color: MEDIUM_GRAY })]
        }),
        new Paragraph({
          children: [new TextRun({ text: "mudar sua vida", size: 28, font: "Arial", color: MEDIUM_GRAY })]
        }),
        new Paragraph({ spacing: { before: 4000 }, children: [] }),
        new Paragraph({
          children: [new TextRun({ text: "2026", size: 24, font: "Arial", color: MEDIUM_GRAY })]
        })
      ]
    },
    // ============ CONTEÚDO ============
    {
      properties: {
        page: { margin: { top: 1440, right: 1440, bottom: 1800, left: 1440 } }
      },
      footers: {
        default: new Footer({
          children: [
            new Table({
              columnWidths: [2340, 7020],
              rows: [
                new TableRow({
                  children: [
                    new TableCell({
                      borders: noBorders,
                      width: { size: 2340, type: WidthType.DXA },
                      children: [new Paragraph({
                        children: [new TextRun({ children: [PageNumber.CURRENT], size: 20, font: "Arial", color: MEDIUM_GRAY })]
                      })]
                    }),
                    new TableCell({
                      borders: noBorders,
                      width: { size: 7020, type: WidthType.DXA },
                      children: [new Paragraph({ children: [] })]
                    })
                  ]
                })
              ]
            })
          ]
        })
      },
      children: [
        // Seção 01
        ...createSectionTitle("01.", "A BASE"),

        createTwoColumnLayout(
          "Conceito",
          "A engenharia de prompt não é sobre escrever comandos para máquinas. É sobre clareza de pensamento. Quando você aprende a formular instruções precisas para uma IA, está na verdade refinando sua capacidade de pensar."
        ),

        createWhitespace(400),

        createTwoColumnLayout(
          "Princípio",
          "Menos é mais. Um prompt eficaz não precisa ser longo. Precisa ser exato. Cada palavra deve ter propósito. Cada instrução deve ser necessária."
        ),

        createQuote("A forma segue a função."),

        createTwoColumnLayout(
          "Nota",
          "Este princípio, central ao design suíço, aplica-se perfeitamente à engenharia de prompt. A estrutura do seu prompt deve servir ao resultado desejado, não ao contrário."
        ),

        createDivider(),

        createSubtitle("Os elementos essenciais"),

        createListItem("Contexto: o cenário"),
        createListItem("Instrução: a ação"),
        createListItem("Formato: a forma"),
        createListItem("Tom: a voz"),

        new Paragraph({ children: [new PageBreak()] }),

        // Seção 02
        ...createSectionTitle("02.", "O MÉTODO"),

        createTwoColumnLayout(
          "Abordagem",
          "Existe um método por trás da aparente simplicidade. Cada prompt bem construído segue uma estrutura invisível mas rigorosa."
        ),

        createWhitespace(400),

        createTwoColumnLayout(
          "Processo",
          "Primeiro, defina o que você realmente precisa. Não o que você acha que precisa. O que você realmente precisa. Esta distinção é crucial."
        ),

        createQuote("Disciplina é liberdade."),

        createTwoColumnLayout(
          "Insight",
          "Quanto mais restrito o brief, mais criativa pode ser a solução. Limites não são obstáculos. São ferramentas."
        ),

        createDivider(),

        createSubtitle("Técnicas fundamentais"),

        createTwoColumnLayout(
          "Chain-of-Thought",
          "Peça à IA para mostrar seu raciocínio. \"Pense passo a passo.\" Três palavras que transformam resultados."
        ),

        createWhitespace(200),

        createTwoColumnLayout(
          "Few-Shot",
          "Mostre, não conte. Dois ou três exemplos comunicam mais que parágrafos de explicação."
        ),

        createWhitespace(200),

        createTwoColumnLayout(
          "Role Play",
          "Defina uma persona. \"Você é um...\" Estas palavras ativam conhecimentos específicos dentro do modelo."
        ),

        new Paragraph({ children: [new PageBreak()] }),

        // Seção 03
        ...createSectionTitle("03.", "A PRÁTICA"),

        createTwoColumnLayout(
          "Aplicação",
          "Teoria sem prática é estéril. Prática sem teoria é cega. O domínio vem da combinação deliberada de ambas."
        ),

        createWhitespace(400),

        createQuote("Simplicidade é a sofisticação suprema."),

        createTwoColumnLayout(
          "Leonardo da Vinci",
          "Esta frase, atribuída ao mestre renascentista, captura a essência da engenharia de prompt. O objetivo não é a complexidade. É a clareza."
        ),

        createDivider(),

        createSubtitle("Próximos passos"),

        createListItem("Pratique diariamente"),
        createListItem("Documente seus prompts"),
        createListItem("Refine continuamente"),
        createListItem("Compartilhe conhecimento"),

        createWhitespace(600),

        createTwoColumnLayout(
          "",
          "O resto é silêncio. E prática."
        )
      ]
    }
  ]
});

// Exportar
const scriptDir = path.dirname(__filename);
const rootDir = path.join(scriptDir, '..');

Packer.toBuffer(doc).then(buffer => {
  const outputPath = path.join(rootDir, 'output', 'Layout_Minimalista_Suico.docx');
  fs.writeFileSync(outputPath, buffer);
  console.log(`Layout Minimalista Suíço criado: ${outputPath}`);
});

module.exports = { createSectionTitle, createTwoColumnLayout, createMainText, createSubtitle, createQuote, createListItem, createWhitespace, createDivider };
