/**
 * LAYOUT: EDITORIAL CLÁSSICO
 * Estilo: Livros de romance, biografias, história
 * Inspiração: Penguin Classics, The Elements of Typographic Style
 *
 * Características:
 * - Fonte serifada (Georgia/Times New Roman)
 * - Margens largas (inferior maior que superior - estilo Van de Graaf)
 * - Texto justificado
 * - Capitulares decorativas
 * - Numeração de página centralizada no rodapé
 * - Elegância e autoridade
 */

const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
        Header, Footer, AlignmentType, LevelFormat,
        HeadingLevel, BorderStyle, WidthType,
        ShadingType, VerticalAlign, PageNumber, PageBreak } = require('docx');
const fs = require('fs');
const path = require('path');

// Cores elegantes e sóbrias
const DARK_BROWN = "3D2914";
const CREAM = "F5F1E6";
const GOLD = "8B7355";
const BLACK = "1A1A1A";
const GRAY = "666666";

const noBorder = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" };
const noBorders = { top: noBorder, bottom: noBorder, left: noBorder, right: noBorder };

// Capitular decorativa (primeira letra grande)
function createDropCap(letter, restOfParagraph) {
  return new Paragraph({
    spacing: { after: 200, line: 360 },
    alignment: AlignmentType.JUSTIFIED,
    children: [
      new TextRun({ text: letter, bold: true, size: 96, font: "Georgia", color: DARK_BROWN }),
      new TextRun({ text: restOfParagraph, size: 24, font: "Georgia", color: BLACK })
    ]
  });
}

// Título de capítulo elegante
function createChapterTitle(number, title) {
  return [
    new Paragraph({ spacing: { before: 2000 }, children: [] }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 200 },
      children: [new TextRun({ text: `C A P Í T U L O  ${number}`, size: 20, font: "Georgia", color: GOLD, allCaps: true, characterSpacing: 60 })]
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 600 },
      children: [new TextRun({ text: title, size: 44, font: "Georgia", italics: true, color: DARK_BROWN })]
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 400 },
      children: [new TextRun({ text: "❧", size: 32, font: "Georgia", color: GOLD })]
    })
  ];
}

// Epígrafe (citação no início do capítulo)
function createEpigraph(quote, author) {
  return [
    new Paragraph({
      alignment: AlignmentType.RIGHT,
      indent: { left: 2880 },
      spacing: { after: 100 },
      children: [new TextRun({ text: `"${quote}"`, italics: true, size: 22, font: "Georgia", color: GRAY })]
    }),
    new Paragraph({
      alignment: AlignmentType.RIGHT,
      indent: { left: 2880 },
      spacing: { after: 600 },
      children: [new TextRun({ text: `— ${author}`, size: 20, font: "Georgia", color: GRAY })]
    })
  ];
}

// Parágrafo normal com indentação
function createParagraph(text, firstParagraph = false) {
  return new Paragraph({
    alignment: AlignmentType.JUSTIFIED,
    indent: firstParagraph ? {} : { firstLine: 720 },
    spacing: { after: 0, line: 360 },
    children: [new TextRun({ text: text, size: 24, font: "Georgia", color: BLACK })]
  });
}

// Separador de seção
function createSectionBreak() {
  return new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 400, after: 400 },
    children: [new TextRun({ text: "* * *", size: 24, font: "Georgia", color: GOLD })]
  });
}

// Documento exemplo
const doc = new Document({
  styles: {
    default: { document: { run: { font: "Georgia", size: 24 } } },
    paragraphStyles: [
      { id: "Title", name: "Title", basedOn: "Normal",
        run: { size: 72, font: "Georgia", color: DARK_BROWN },
        paragraph: { spacing: { before: 0, after: 200 }, alignment: AlignmentType.CENTER } },
    ]
  },
  sections: [
    // ============ PÁGINA DE TÍTULO ============
    {
      properties: {
        page: {
          margin: { top: 2160, right: 1800, bottom: 2880, left: 1800 } // Margem inferior maior
        }
      },
      children: [
        new Paragraph({ spacing: { before: 3000 }, children: [] }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "ENGENHARIA", size: 72, font: "Georgia", color: DARK_BROWN })]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 200 },
          children: [new TextRun({ text: "DE", size: 36, font: "Georgia", color: GOLD })]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 400 },
          children: [new TextRun({ text: "PROMPT", size: 72, font: "Georgia", italics: true, color: DARK_BROWN })]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 200, after: 200 },
          children: [new TextRun({ text: "❦", size: 48, font: "Georgia", color: GOLD })]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 200 },
          children: [new TextRun({ text: "O Conhecimento que Vai", size: 28, font: "Georgia", italics: true, color: GRAY })]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "Mudar Sua Vida", size: 28, font: "Georgia", italics: true, color: GRAY })]
        }),
        new Paragraph({ spacing: { before: 3000 }, children: [] }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "2026", size: 24, font: "Georgia", color: GOLD, characterSpacing: 40 })]
        })
      ]
    },
    // ============ CONTEÚDO ============
    {
      properties: {
        page: {
          margin: { top: 1800, right: 1800, bottom: 2520, left: 1800 }
        }
      },
      headers: {
        default: new Header({
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [new TextRun({ text: "ENGENHARIA DE PROMPT", size: 18, font: "Georgia", color: GRAY, italics: true, characterSpacing: 30 })]
            })
          ]
        })
      },
      footers: {
        default: new Footer({
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({ text: "— ", size: 20, font: "Georgia", color: GOLD }),
                new TextRun({ children: [PageNumber.CURRENT], size: 20, font: "Georgia", color: DARK_BROWN }),
                new TextRun({ text: " —", size: 20, font: "Georgia", color: GOLD })
              ]
            })
          ]
        })
      },
      children: [
        // Capítulo 1
        ...createChapterTitle("I", "A Arte de Comunicar com Máquinas"),
        ...createEpigraph("A linguagem é a vestimenta do pensamento.", "Samuel Johnson"),

        createDropCap("V", "ivemos em um momento singular da história humana. Pela primeira vez, podemos conversar com máquinas que compreendem nossas palavras e respondem com inteligência. Mas essa conversa exige uma nova habilidade: a arte de formular perguntas precisas."),

        createParagraph("A engenharia de prompt não é meramente técnica. É, antes de tudo, um exercício de clareza mental. Quando você aprende a comunicar suas ideias a uma inteligência artificial, está também refinando sua própria capacidade de pensar."),

        createParagraph("Os antigos retóricos gregos sabiam que a persuasão dependia da escolha cuidadosa das palavras. Aristóteles dedicou tratados inteiros à arte de construir argumentos eficazes. Hoje, essa sabedoria ancestral encontra nova aplicação."),

        createSectionBreak(),

        createParagraph("Considere o prompt como um mapa. Quanto mais detalhado for seu mapa, mais preciso será o caminho que a inteligência artificial seguirá. Um mapa vago leva a destinos incertos; um mapa preciso conduz exatamente onde você deseja ir.", true),

        createParagraph("Os mestres dessa arte compreendem que cada palavra carrega peso. A diferença entre um resultado medíocre e um resultado extraordinário frequentemente reside em um único adjetivo, uma vírgula bem posicionada, ou uma instrução adicional que esclarece a intenção."),

        new Paragraph({ children: [new PageBreak()] }),

        // Capítulo 2
        ...createChapterTitle("II", "Os Fundamentos da Clareza"),
        ...createEpigraph("Simplicidade é a sofisticação suprema.", "Leonardo da Vinci"),

        createDropCap("T", "odo prompt eficaz compartilha certas características universais. Primeiro, há o contexto: as informações de fundo que situam a inteligência artificial no cenário correto. Sem contexto, a máquina opera às cegas."),

        createParagraph("Em seguida, vem a instrução propriamente dita. O que você deseja que aconteça? Esta pergunta, aparentemente simples, revela-se surpreendentemente difícil de responder com precisão. Muitos falham não por falta de conhecimento técnico, mas por não saberem exatamente o que querem."),

        createParagraph("O formato desejado constitui o terceiro pilar. Uma resposta pode ser correta em substância mas inadequada em forma. Deseja uma lista? Um parágrafo? Uma tabela? Quanto mais específico for neste aspecto, melhores serão seus resultados."),

        createSectionBreak(),

        createParagraph("Por fim, há o tom. A mesma informação pode ser apresentada de maneiras radicalmente diferentes. Um relatório executivo exige formalidade; uma explicação para crianças requer simplicidade; uma peça criativa pede liberdade.", true),

        createParagraph("Estes quatro elementos — contexto, instrução, formato e tom — formam a estrutura básica sobre a qual toda comunicação eficaz com inteligência artificial deve ser construída. Domine-os, e você terá dominado os fundamentos."),

        new Paragraph({ children: [new PageBreak()] }),

        // Capítulo 3
        ...createChapterTitle("III", "A Jornada Continua"),
        ...createEpigraph("O início da sabedoria é a definição dos termos.", "Sócrates"),

        createDropCap("A", "o concluir estas páginas, você não chega ao fim, mas ao início. O conhecimento aqui compartilhado é semente; compete a você cultivá-la através da prática diária e da reflexão constante."),

        createParagraph("Lembre-se sempre: a engenharia de prompt não é sobre manipular máquinas, mas sobre aprimorar sua própria capacidade de expressão. Cada prompt bem construído é um exercício de pensamento claro."),

        createParagraph("Os grandes comunicadores de todas as épocas compartilham uma característica: a capacidade de traduzir ideias complexas em palavras precisas. Esta habilidade, mais valiosa hoje do que nunca, está ao seu alcance."),

        createSectionBreak(),

        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 600, after: 200 },
          children: [new TextRun({ text: "FIM", size: 28, font: "Georgia", color: GOLD, characterSpacing: 80 })]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "❦", size: 48, font: "Georgia", color: GOLD })]
        })
      ]
    }
  ]
});

// Exportar
const scriptDir = path.dirname(__filename);
const rootDir = path.join(scriptDir, '..');

Packer.toBuffer(doc).then(buffer => {
  const outputPath = path.join(rootDir, 'output', 'Layout_Editorial_Classico.docx');
  fs.writeFileSync(outputPath, buffer);
  console.log(`Layout Editorial Clássico criado: ${outputPath}`);
});

module.exports = { createChapterTitle, createEpigraph, createDropCap, createParagraph, createSectionBreak };
