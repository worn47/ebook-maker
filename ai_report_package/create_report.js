const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, ImageRun,
        Header, Footer, AlignmentType, LevelFormat,
        HeadingLevel, BorderStyle, WidthType,
        ShadingType, VerticalAlign, PageNumber, PageBreak,
        HorizontalPositionRelativeFrom, VerticalPositionRelativeFrom,
        HorizontalPositionAlign, VerticalPositionAlign } = require('docx');
const fs = require('fs');
const path = require('path');

// Brand Colors - Purple and Gold theme for Prompt Engineering
const PURPLE = "6B21A8";
const DARK_PURPLE = "3B0764";
const ACCENT_GOLD = "D97706";
const GRAY = "4A4A4A";
const LIGHT_GRAY = "F5F3FF";
const LIGHT_PURPLE = "EDE9FE";
const WHITE = "FFFFFF";

const noBorder = { style: BorderStyle.NONE, size: 0, color: WHITE };
const noBorders = { top: noBorder, bottom: noBorder, left: noBorder, right: noBorder };

// Helper for bold stat boxes with colored backgrounds
function createStatBox(number, label, bgColor) {
  return new Table({
    columnWidths: [2800],
    rows: [
      new TableRow({
        children: [
          new TableCell({
            borders: noBorders,
            shading: { fill: bgColor, type: ShadingType.CLEAR },
            width: { size: 2800, type: WidthType.DXA },
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { before: 200, after: 0 },
                children: [new TextRun({ text: number, bold: true, size: 72, color: WHITE, font: "Arial" })]
              }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { before: 0, after: 200 },
                children: [new TextRun({ text: label, size: 20, color: WHITE, font: "Arial" })]
              })
            ]
          })
        ]
      })
    ]
  });
}

// Bold pull quote with thick accent bar
function createPullQuote(text, attribution) {
  return new Table({
    columnWidths: [360, 9000],
    rows: [
      new TableRow({
        children: [
          new TableCell({
            borders: noBorders,
            shading: { fill: ACCENT_GOLD, type: ShadingType.CLEAR },
            width: { size: 360, type: WidthType.DXA },
            children: [new Paragraph({ children: [] })]
          }),
          new TableCell({
            borders: noBorders,
            shading: { fill: LIGHT_PURPLE, type: ShadingType.CLEAR },
            width: { size: 9000, type: WidthType.DXA },
            children: [
              new Paragraph({
                spacing: { before: 200, after: 100 },
                indent: { left: 200 },
                children: [new TextRun({ text: `"${text}"`, italics: true, size: 26, color: DARK_PURPLE, font: "Arial" })]
              }),
              new Paragraph({
                spacing: { before: 0, after: 200 },
                indent: { left: 200 },
                children: [new TextRun({ text: `— ${attribution}`, bold: true, size: 20, color: GRAY, font: "Arial" })]
              })
            ]
          })
        ]
      })
    ]
  });
}

// Section header with colored background
function createSectionHeader(text) {
  return new Table({
    columnWidths: [9360],
    rows: [
      new TableRow({
        children: [
          new TableCell({
            borders: noBorders,
            shading: { fill: DARK_PURPLE, type: ShadingType.CLEAR },
            width: { size: 9360, type: WidthType.DXA },
            children: [
              new Paragraph({
                spacing: { before: 200, after: 200 },
                children: [new TextRun({ text: text.toUpperCase(), bold: true, size: 36, color: WHITE, font: "Arial" })]
              })
            ]
          })
        ]
      })
    ]
  });
}

// Read cover image
const scriptDir = path.dirname(__filename);
const rootDir = path.join(scriptDir, '..');
const coverImagePath = path.join(rootDir, 'output', 'cover_image.png');
const coverImageData = fs.readFileSync(coverImagePath);

const doc = new Document({
  styles: {
    default: { document: { run: { font: "Arial", size: 24 } } },
    paragraphStyles: [
      { id: "Title", name: "Title", basedOn: "Normal",
        run: { size: 72, bold: true, color: WHITE, font: "Arial" },
        paragraph: { spacing: { before: 0, after: 120 }, alignment: AlignmentType.CENTER } },
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 44, bold: true, color: DARK_PURPLE, font: "Arial" },
        paragraph: { spacing: { before: 400, after: 200 }, outlineLevel: 0 } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 32, bold: true, color: PURPLE, font: "Arial" },
        paragraph: { spacing: { before: 300, after: 150 }, outlineLevel: 1 } },
      { id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 26, bold: true, color: GRAY, font: "Arial" },
        paragraph: { spacing: { before: 200, after: 100 }, outlineLevel: 2 } },
    ]
  },
  numbering: {
    config: [
      { reference: "bullet-list",
        levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
      { reference: "numbered-list-1",
        levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
      { reference: "numbered-list-2",
        levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] }
    ]
  },
  sections: [
    // ============ COVER PAGE ============
    {
      properties: {
        page: { margin: { top: 0, right: 0, bottom: 0, left: 0 } }
      },
      children: [
        // Full-bleed background image
        new Paragraph({
          children: [
            new ImageRun({
              type: "png",
              data: coverImageData,
              transformation: { width: 650, height: 842 },
              floating: {
                horizontalPosition: {
                  relative: HorizontalPositionRelativeFrom.PAGE,
                  align: HorizontalPositionAlign.CENTER,
                },
                verticalPosition: {
                  relative: VerticalPositionRelativeFrom.PAGE,
                  align: VerticalPositionAlign.CENTER,
                },
                behindDocument: true,
              },
              altText: { title: "Cover Image", description: "AI-generated abstract cover", name: "cover" }
            })
          ]
        }),
        // Author name at top left
        new Paragraph({
          spacing: { before: 400, after: 0 },
          indent: { left: 400 },
          children: [
            new TextRun({ text: "Engenharia de Prompt", bold: true, size: 28, color: WHITE, font: "Arial" })
          ]
        }),
        // Spacer to push title down
        new Paragraph({ spacing: { before: 4000 }, children: [] }),
        new Paragraph({ spacing: { before: 2000 }, children: [] }),
        // Semi-transparent backdrop for title area
        new Table({
          columnWidths: [12240],
          rows: [
            new TableRow({
              height: { value: 4800, rule: "atLeast" },
              children: [
                new TableCell({
                  borders: noBorders,
                  shading: { fill: "2D1B4E", type: ShadingType.CLEAR },
                  width: { size: 12240, type: WidthType.DXA },
                  verticalAlign: VerticalAlign.CENTER,
                  children: [
                    // Main title
                    new Paragraph({
                      alignment: AlignmentType.LEFT,
                      indent: { left: 400 },
                      spacing: { before: 200, after: 0 },
                      children: [
                        new TextRun({ text: "ENGENHARIA", bold: true, size: 96, color: WHITE, font: "Arial" })
                      ]
                    }),
                    new Paragraph({
                      alignment: AlignmentType.LEFT,
                      indent: { left: 400 },
                      spacing: { before: 0, after: 0 },
                      children: [
                        new TextRun({ text: "DE ", bold: true, size: 96, color: WHITE, font: "Arial" }),
                        new TextRun({ text: "PROMPT", bold: true, size: 96, color: "F59E0B", font: "Arial" })
                      ]
                    }),
                    // Year/tagline
                    new Paragraph({
                      alignment: AlignmentType.LEFT,
                      indent: { left: 400 },
                      spacing: { before: 100, after: 200 },
                      children: [
                        new TextRun({ text: "2026", bold: true, size: 96, color: WHITE, font: "Arial" })
                      ]
                    }),
                    // Subtitle
                    new Paragraph({
                      alignment: AlignmentType.LEFT,
                      indent: { left: 400 },
                      spacing: { before: 200, after: 0 },
                      children: [
                        new TextRun({ text: "O Conhecimento que Vai", size: 28, color: WHITE, font: "Arial" }),
                      ]
                    }),
                    new Paragraph({
                      alignment: AlignmentType.LEFT,
                      indent: { left: 400 },
                      spacing: { before: 0, after: 200 },
                      children: [
                        new TextRun({ text: "Mudar Sua Vida", size: 28, color: WHITE, font: "Arial" }),
                      ]
                    })
                  ]
                })
              ]
            })
          ]
        }),
        // Spacer before bottom bar
        new Paragraph({ spacing: { before: 1600 }, children: [] }),
        // Bottom accent bar
        new Table({
          columnWidths: [12240],
          rows: [
            new TableRow({
              height: { value: 600, rule: "exact" },
              children: [
                new TableCell({
                  borders: noBorders,
                  shading: { fill: DARK_PURPLE, type: ShadingType.CLEAR },
                  width: { size: 12240, type: WidthType.DXA },
                  verticalAlign: VerticalAlign.CENTER,
                  children: [
                    new Paragraph({
                      indent: { left: 400 },
                      children: [
                        new TextRun({ text: "Guia Completo para Dominar a Comunicação com IA", size: 22, color: WHITE, font: "Arial" })
                      ]
                    })
                  ]
                })
              ]
            })
          ]
        })
      ]
    },
    // ============ TABLE OF CONTENTS PAGE ============
    {
      properties: {
        page: { margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } }
      },
      children: [
        // TOC Header
        new Table({
          columnWidths: [9360],
          rows: [
            new TableRow({
              children: [
                new TableCell({
                  borders: { top: noBorder, bottom: { style: BorderStyle.SINGLE, size: 18, color: ACCENT_GOLD }, left: noBorder, right: noBorder },
                  width: { size: 9360, type: WidthType.DXA },
                  children: [
                    new Paragraph({
                      spacing: { before: 0, after: 200 },
                      children: [new TextRun({ text: "SUMÁRIO", bold: true, size: 52, color: DARK_PURPLE, font: "Arial" })]
                    })
                  ]
                })
              ]
            })
          ]
        }),
        new Paragraph({ spacing: { before: 400 }, children: [] }),
        // Manual TOC entries
        new Table({
          columnWidths: [7800, 1560],
          rows: [
            // Introdução
            new TableRow({
              children: [
                new TableCell({
                  borders: noBorders,
                  width: { size: 7800, type: WidthType.DXA },
                  children: [new Paragraph({
                    spacing: { before: 200, after: 200 },
                    children: [new TextRun({ text: "Introdução: Por Que Engenharia de Prompt?", bold: true, size: 28, color: DARK_PURPLE, font: "Arial" })]
                  })]
                }),
                new TableCell({
                  borders: noBorders,
                  width: { size: 1560, type: WidthType.DXA },
                  children: [new Paragraph({
                    alignment: AlignmentType.RIGHT,
                    spacing: { before: 200, after: 200 },
                    children: [new TextRun({ text: "03", bold: true, size: 28, color: ACCENT_GOLD, font: "Arial" })]
                  })]
                })
              ]
            }),
            // Chapter 1
            new TableRow({
              children: [
                new TableCell({
                  borders: noBorders,
                  shading: { fill: LIGHT_GRAY, type: ShadingType.CLEAR },
                  width: { size: 7800, type: WidthType.DXA },
                  children: [new Paragraph({
                    spacing: { before: 200, after: 200 },
                    children: [new TextRun({ text: "Capítulo 1: Fundamentos da Engenharia de Prompt", bold: true, size: 28, color: DARK_PURPLE, font: "Arial" })]
                  })]
                }),
                new TableCell({
                  borders: noBorders,
                  shading: { fill: LIGHT_GRAY, type: ShadingType.CLEAR },
                  width: { size: 1560, type: WidthType.DXA },
                  children: [new Paragraph({
                    alignment: AlignmentType.RIGHT,
                    spacing: { before: 200, after: 200 },
                    children: [new TextRun({ text: "04", bold: true, size: 28, color: ACCENT_GOLD, font: "Arial" })]
                  })]
                })
              ]
            }),
            // Sub items
            new TableRow({
              children: [
                new TableCell({
                  borders: noBorders,
                  width: { size: 7800, type: WidthType.DXA },
                  children: [new Paragraph({
                    spacing: { before: 100, after: 100 },
                    indent: { left: 400 },
                    children: [new TextRun({ text: "O Que É Um Prompt", size: 24, color: GRAY, font: "Arial" })]
                  })]
                }),
                new TableCell({
                  borders: noBorders,
                  width: { size: 1560, type: WidthType.DXA },
                  children: [new Paragraph({ children: [] })]
                })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({
                  borders: noBorders,
                  width: { size: 7800, type: WidthType.DXA },
                  children: [new Paragraph({
                    spacing: { before: 100, after: 100 },
                    indent: { left: 400 },
                    children: [new TextRun({ text: "Anatomia de Um Prompt Eficaz", size: 24, color: GRAY, font: "Arial" })]
                  })]
                }),
                new TableCell({
                  borders: noBorders,
                  width: { size: 1560, type: WidthType.DXA },
                  children: [new Paragraph({ children: [] })]
                })
              ]
            }),
            // Chapter 2
            new TableRow({
              children: [
                new TableCell({
                  borders: noBorders,
                  shading: { fill: LIGHT_GRAY, type: ShadingType.CLEAR },
                  width: { size: 7800, type: WidthType.DXA },
                  children: [new Paragraph({
                    spacing: { before: 200, after: 200 },
                    children: [new TextRun({ text: "Capítulo 2: Técnicas Avançadas", bold: true, size: 28, color: DARK_PURPLE, font: "Arial" })]
                  })]
                }),
                new TableCell({
                  borders: noBorders,
                  shading: { fill: LIGHT_GRAY, type: ShadingType.CLEAR },
                  width: { size: 1560, type: WidthType.DXA },
                  children: [new Paragraph({
                    alignment: AlignmentType.RIGHT,
                    spacing: { before: 200, after: 200 },
                    children: [new TextRun({ text: "06", bold: true, size: 28, color: ACCENT_GOLD, font: "Arial" })]
                  })]
                })
              ]
            }),
            // Chapter 3
            new TableRow({
              children: [
                new TableCell({
                  borders: noBorders,
                  width: { size: 7800, type: WidthType.DXA },
                  children: [new Paragraph({
                    spacing: { before: 200, after: 200 },
                    children: [new TextRun({ text: "Capítulo 3: Frameworks e Modelos", bold: true, size: 28, color: DARK_PURPLE, font: "Arial" })]
                  })]
                }),
                new TableCell({
                  borders: noBorders,
                  width: { size: 1560, type: WidthType.DXA },
                  children: [new Paragraph({
                    alignment: AlignmentType.RIGHT,
                    spacing: { before: 200, after: 200 },
                    children: [new TextRun({ text: "08", bold: true, size: 28, color: ACCENT_GOLD, font: "Arial" })]
                  })]
                })
              ]
            }),
            // Chapter 4
            new TableRow({
              children: [
                new TableCell({
                  borders: noBorders,
                  shading: { fill: LIGHT_GRAY, type: ShadingType.CLEAR },
                  width: { size: 7800, type: WidthType.DXA },
                  children: [new Paragraph({
                    spacing: { before: 200, after: 200 },
                    children: [new TextRun({ text: "Capítulo 4: Aplicações Práticas", bold: true, size: 28, color: DARK_PURPLE, font: "Arial" })]
                  })]
                }),
                new TableCell({
                  borders: noBorders,
                  shading: { fill: LIGHT_GRAY, type: ShadingType.CLEAR },
                  width: { size: 1560, type: WidthType.DXA },
                  children: [new Paragraph({
                    alignment: AlignmentType.RIGHT,
                    spacing: { before: 200, after: 200 },
                    children: [new TextRun({ text: "10", bold: true, size: 28, color: ACCENT_GOLD, font: "Arial" })]
                  })]
                })
              ]
            }),
            // Chapter 5
            new TableRow({
              children: [
                new TableCell({
                  borders: noBorders,
                  width: { size: 7800, type: WidthType.DXA },
                  children: [new Paragraph({
                    spacing: { before: 200, after: 200 },
                    children: [new TextRun({ text: "Capítulo 5: Erros Comuns e Como Evitá-los", bold: true, size: 28, color: DARK_PURPLE, font: "Arial" })]
                  })]
                }),
                new TableCell({
                  borders: noBorders,
                  width: { size: 1560, type: WidthType.DXA },
                  children: [new Paragraph({
                    alignment: AlignmentType.RIGHT,
                    spacing: { before: 200, after: 200 },
                    children: [new TextRun({ text: "12", bold: true, size: 28, color: ACCENT_GOLD, font: "Arial" })]
                  })]
                })
              ]
            }),
            // Chapter 6
            new TableRow({
              children: [
                new TableCell({
                  borders: noBorders,
                  shading: { fill: LIGHT_GRAY, type: ShadingType.CLEAR },
                  width: { size: 7800, type: WidthType.DXA },
                  children: [new Paragraph({
                    spacing: { before: 200, after: 200 },
                    children: [new TextRun({ text: "Capítulo 6: O Futuro da Engenharia de Prompt", bold: true, size: 28, color: DARK_PURPLE, font: "Arial" })]
                  })]
                }),
                new TableCell({
                  borders: noBorders,
                  shading: { fill: LIGHT_GRAY, type: ShadingType.CLEAR },
                  width: { size: 1560, type: WidthType.DXA },
                  children: [new Paragraph({
                    alignment: AlignmentType.RIGHT,
                    spacing: { before: 200, after: 200 },
                    children: [new TextRun({ text: "14", bold: true, size: 28, color: ACCENT_GOLD, font: "Arial" })]
                  })]
                })
              ]
            }),
            // Conclusion
            new TableRow({
              children: [
                new TableCell({
                  borders: noBorders,
                  width: { size: 7800, type: WidthType.DXA },
                  children: [new Paragraph({
                    spacing: { before: 200, after: 200 },
                    children: [new TextRun({ text: "Conclusão: Sua Jornada Começa Agora", bold: true, size: 28, color: DARK_PURPLE, font: "Arial" })]
                  })]
                }),
                new TableCell({
                  borders: noBorders,
                  width: { size: 1560, type: WidthType.DXA },
                  children: [new Paragraph({
                    alignment: AlignmentType.RIGHT,
                    spacing: { before: 200, after: 200 },
                    children: [new TextRun({ text: "16", bold: true, size: 28, color: ACCENT_GOLD, font: "Arial" })]
                  })]
                })
              ]
            })
          ]
        })
      ]
    },
    // ============ MAIN CONTENT SECTION ============
    {
      properties: {
        page: { margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } }
      },
      headers: {
        default: new Header({
          children: [
            new Table({
              columnWidths: [9360],
              rows: [
                new TableRow({
                  children: [
                    new TableCell({
                      borders: { top: noBorder, bottom: { style: BorderStyle.SINGLE, size: 12, color: ACCENT_GOLD }, left: noBorder, right: noBorder },
                      width: { size: 9360, type: WidthType.DXA },
                      children: [
                        new Table({
                          columnWidths: [4680, 4680],
                          rows: [
                            new TableRow({
                              children: [
                                new TableCell({
                                  borders: noBorders,
                                  width: { size: 4680, type: WidthType.DXA },
                                  children: [new Paragraph({
                                    children: [new TextRun({ text: "ENGENHARIA DE PROMPT 2026", bold: true, size: 18, color: DARK_PURPLE, font: "Arial" })]
                                  })]
                                }),
                                new TableCell({
                                  borders: noBorders,
                                  width: { size: 4680, type: WidthType.DXA },
                                  children: [new Paragraph({
                                    alignment: AlignmentType.RIGHT,
                                    children: [new TextRun({ text: "O CONHECIMENTO QUE VAI MUDAR SUA VIDA", bold: true, size: 18, color: ACCENT_GOLD, font: "Arial" })]
                                  })]
                                })
                              ]
                            })
                          ]
                        })
                      ]
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
              children: [
                new TextRun({ text: "— ", size: 20, color: ACCENT_GOLD, font: "Arial" }),
                new TextRun({ children: [PageNumber.CURRENT], bold: true, size: 20, color: DARK_PURPLE, font: "Arial" }),
                new TextRun({ text: " —", size: 20, color: ACCENT_GOLD, font: "Arial" })
              ]
            })
          ]
        })
      },
      children: [
        // INTRODUÇÃO
        createSectionHeader("Introdução: Por Que Engenharia de Prompt?"),
        new Paragraph({ spacing: { before: 300 }, children: [] }),
        new Paragraph({
          spacing: { after: 200 },
          children: [new TextRun({ text: "Vivemos em um momento histórico. A Inteligência Artificial deixou de ser ficção científica para se tornar uma ferramenta acessível a qualquer pessoa com acesso à internet. Mas aqui está o segredo que poucos entendem: a qualidade das suas interações com IA depende diretamente da qualidade dos seus prompts.", size: 24, font: "Arial" })]
        }),
        createPullQuote(
          "Um prompt bem construído é a diferença entre uma resposta genérica e uma solução transformadora. É a habilidade mais valiosa da era da IA.",
          "Especialista em IA, 2025"
        ),
        new Paragraph({
          spacing: { before: 300, after: 200 },
          children: [new TextRun({ text: "Este eBook vai te ensinar a dominar a arte e a ciência da Engenharia de Prompt. Você aprenderá não apenas técnicas, mas uma nova forma de pensar que vai multiplicar sua produtividade e criatividade em qualquer área de atuação.", size: 24, font: "Arial" })]
        }),
        // Bold stats row
        new Paragraph({ spacing: { before: 300 }, children: [] }),
        new Table({
          columnWidths: [3120, 3120, 3120],
          rows: [
            new TableRow({
              children: [
                new TableCell({
                  borders: noBorders,
                  width: { size: 3120, type: WidthType.DXA },
                  children: [createStatBox("10x", "aumento de produtividade com prompts otimizados", DARK_PURPLE)]
                }),
                new TableCell({
                  borders: noBorders,
                  width: { size: 3120, type: WidthType.DXA },
                  children: [createStatBox("85%", "das empresas usarão IA até 2026", ACCENT_GOLD)]
                }),
                new TableCell({
                  borders: noBorders,
                  width: { size: 3120, type: WidthType.DXA },
                  children: [createStatBox("$15M", "salário médio de prompt engineers nos EUA", DARK_PURPLE)]
                })
              ]
            })
          ]
        }),
        new Paragraph({ children: [new PageBreak()] }),

        // CAPÍTULO 1
        createSectionHeader("Capítulo 1: Fundamentos da Engenharia de Prompt"),
        new Paragraph({ spacing: { before: 300 }, children: [] }),
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun("O Que É Um Prompt?")]
        }),
        new Paragraph({
          spacing: { after: 200 },
          children: [new TextRun({ text: "Um prompt é qualquer texto que você envia para um modelo de linguagem para obter uma resposta. Pode ser uma pergunta simples, uma instrução detalhada, ou um conjunto complexo de diretrizes. O prompt é sua interface de comunicação com a IA.", size: 24, font: "Arial" })]
        }),
        new Paragraph({
          spacing: { after: 200 },
          children: [new TextRun({ text: "Pense no prompt como um briefing para um assistente extremamente capaz, mas que precisa de instruções claras. Quanto mais preciso e contextualizado for seu prompt, melhor será a resposta.", size: 24, font: "Arial" })]
        }),
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun("Anatomia de Um Prompt Eficaz")]
        }),
        new Paragraph({
          spacing: { after: 150 },
          children: [new TextRun({ text: "Todo prompt eficaz contém elementos essenciais que guiam a IA para a resposta desejada:", size: 24, font: "Arial" })]
        }),
        new Paragraph({
          numbering: { reference: "numbered-list-1", level: 0 },
          spacing: { after: 100 },
          children: [
            new TextRun({ text: "Contexto: ", bold: true, size: 24, font: "Arial", color: PURPLE }),
            new TextRun({ text: "Informações de fundo que a IA precisa saber para responder adequadamente.", size: 24, font: "Arial" })
          ]
        }),
        new Paragraph({
          numbering: { reference: "numbered-list-1", level: 0 },
          spacing: { after: 100 },
          children: [
            new TextRun({ text: "Instrução: ", bold: true, size: 24, font: "Arial", color: PURPLE }),
            new TextRun({ text: "O que exatamente você quer que a IA faça.", size: 24, font: "Arial" })
          ]
        }),
        new Paragraph({
          numbering: { reference: "numbered-list-1", level: 0 },
          spacing: { after: 100 },
          children: [
            new TextRun({ text: "Formato: ", bold: true, size: 24, font: "Arial", color: PURPLE }),
            new TextRun({ text: "Como você quer que a resposta seja estruturada.", size: 24, font: "Arial" })
          ]
        }),
        new Paragraph({
          numbering: { reference: "numbered-list-1", level: 0 },
          spacing: { after: 100 },
          children: [
            new TextRun({ text: "Tom: ", bold: true, size: 24, font: "Arial", color: PURPLE }),
            new TextRun({ text: "O estilo de comunicação desejado (formal, casual, técnico, etc.).", size: 24, font: "Arial" })
          ]
        }),
        new Paragraph({
          numbering: { reference: "numbered-list-1", level: 0 },
          spacing: { after: 100 },
          children: [
            new TextRun({ text: "Exemplos: ", bold: true, size: 24, font: "Arial", color: PURPLE }),
            new TextRun({ text: "Demonstrações do tipo de resposta esperada (few-shot learning).", size: 24, font: "Arial" })
          ]
        }),
        new Paragraph({
          heading: HeadingLevel.HEADING_3,
          children: [new TextRun("Exemplo Prático")]
        }),
        new Paragraph({
          spacing: { after: 200 },
          children: [new TextRun({ text: "Prompt ruim: \"Escreva sobre marketing\"", size: 24, font: "Arial", italics: true })]
        }),
        new Paragraph({
          spacing: { after: 200 },
          children: [new TextRun({ text: "Prompt bom: \"Você é um especialista em marketing digital. Escreva um artigo de 500 palavras sobre estratégias de SEO para pequenas empresas em 2026. Use tom profissional mas acessível, inclua 3 dicas práticas e finalize com um call-to-action.\"", size: 24, font: "Arial", italics: true })]
        }),
        new Paragraph({ children: [new PageBreak()] }),

        // CAPÍTULO 2
        createSectionHeader("Capítulo 2: Técnicas Avançadas"),
        new Paragraph({ spacing: { before: 300 }, children: [] }),
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun("Chain-of-Thought (Cadeia de Pensamento)")]
        }),
        new Paragraph({
          spacing: { after: 200 },
          children: [new TextRun({ text: "Esta técnica consiste em pedir à IA que \"pense em voz alta\", explicando seu raciocínio passo a passo antes de chegar à conclusão. Isso melhora dramaticamente a qualidade das respostas em problemas complexos.", size: 24, font: "Arial" })]
        }),
        new Paragraph({
          numbering: { reference: "bullet-list", level: 0 },
          children: [new TextRun({ text: "Adicione \"Pense passo a passo\" ou \"Explique seu raciocínio\" ao prompt", size: 24, font: "Arial" })]
        }),
        new Paragraph({
          numbering: { reference: "bullet-list", level: 0 },
          children: [new TextRun({ text: "Ideal para problemas matemáticos, lógicos ou analíticos", size: 24, font: "Arial" })]
        }),
        new Paragraph({
          numbering: { reference: "bullet-list", level: 0 },
          children: [new TextRun({ text: "Permite identificar onde o modelo pode estar errando", size: 24, font: "Arial" })]
        }),
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun("Few-Shot Learning")]
        }),
        new Paragraph({
          spacing: { after: 200 },
          children: [new TextRun({ text: "Forneça exemplos do tipo de resposta que você espera. A IA aprenderá o padrão e aplicará aos novos casos.", size: 24, font: "Arial" })]
        }),
        createPullQuote(
          "Um exemplo vale mais que mil explicações. Few-shot learning é a forma mais eficiente de mostrar à IA exatamente o que você quer.",
          "Pesquisador de IA"
        ),
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun("Role Playing (Atribuição de Papel)")]
        }),
        new Paragraph({
          spacing: { after: 200 },
          children: [new TextRun({ text: "Defina um papel específico para a IA assumir. Isso ativa conhecimentos e comportamentos específicos do modelo.", size: 24, font: "Arial" })]
        }),
        new Paragraph({
          numbering: { reference: "bullet-list", level: 0 },
          children: [new TextRun({ text: "\"Você é um advogado especialista em direito trabalhista...\"", size: 24, font: "Arial" })]
        }),
        new Paragraph({
          numbering: { reference: "bullet-list", level: 0 },
          children: [new TextRun({ text: "\"Atue como um professor de física explicando para um aluno do ensino médio...\"", size: 24, font: "Arial" })]
        }),
        new Paragraph({
          numbering: { reference: "bullet-list", level: 0 },
          children: [new TextRun({ text: "\"Você é um crítico literário renomado analisando...\"", size: 24, font: "Arial" })]
        }),
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun("Prompt Iterativo")]
        }),
        new Paragraph({
          spacing: { after: 200 },
          children: [new TextRun({ text: "Nem sempre o primeiro prompt dará o resultado perfeito. A técnica iterativa consiste em refinar progressivamente suas instruções baseado nas respostas recebidas. É como uma conversa onde você vai direcionando a IA para o resultado ideal.", size: 24, font: "Arial" })]
        }),
        new Paragraph({ children: [new PageBreak()] }),

        // CAPÍTULO 3
        createSectionHeader("Capítulo 3: Frameworks e Modelos"),
        new Paragraph({ spacing: { before: 300 }, children: [] }),
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun("Framework CRISP")]
        }),
        new Paragraph({
          spacing: { after: 150 },
          children: [new TextRun({ text: "Um dos frameworks mais eficazes para estruturar prompts:", size: 24, font: "Arial" })]
        }),
        // Framework table
        new Table({
          columnWidths: [2340, 7020],
          rows: [
            new TableRow({
              tableHeader: true,
              children: [
                new TableCell({
                  borders: noBorders,
                  shading: { fill: DARK_PURPLE, type: ShadingType.CLEAR },
                  width: { size: 2340, type: WidthType.DXA },
                  children: [new Paragraph({
                    spacing: { before: 150, after: 150 },
                    children: [new TextRun({ text: "ELEMENTO", bold: true, size: 22, color: WHITE, font: "Arial" })]
                  })]
                }),
                new TableCell({
                  borders: noBorders,
                  shading: { fill: DARK_PURPLE, type: ShadingType.CLEAR },
                  width: { size: 7020, type: WidthType.DXA },
                  children: [new Paragraph({
                    spacing: { before: 150, after: 150 },
                    children: [new TextRun({ text: "DESCRIÇÃO", bold: true, size: 22, color: WHITE, font: "Arial" })]
                  })]
                })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({
                  borders: noBorders,
                  shading: { fill: LIGHT_PURPLE, type: ShadingType.CLEAR },
                  width: { size: 2340, type: WidthType.DXA },
                  children: [new Paragraph({
                    spacing: { before: 150, after: 150 },
                    children: [new TextRun({ text: "C - Contexto", bold: true, size: 22, color: DARK_PURPLE, font: "Arial" })]
                  })]
                }),
                new TableCell({
                  borders: noBorders,
                  shading: { fill: LIGHT_PURPLE, type: ShadingType.CLEAR },
                  width: { size: 7020, type: WidthType.DXA },
                  children: [new Paragraph({
                    spacing: { before: 150, after: 150 },
                    children: [new TextRun({ text: "Forneça informações de fundo relevantes", size: 22, font: "Arial" })]
                  })]
                })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({
                  borders: noBorders,
                  shading: { fill: WHITE, type: ShadingType.CLEAR },
                  width: { size: 2340, type: WidthType.DXA },
                  children: [new Paragraph({
                    spacing: { before: 150, after: 150 },
                    children: [new TextRun({ text: "R - Requisito", bold: true, size: 22, color: DARK_PURPLE, font: "Arial" })]
                  })]
                }),
                new TableCell({
                  borders: noBorders,
                  shading: { fill: WHITE, type: ShadingType.CLEAR },
                  width: { size: 7020, type: WidthType.DXA },
                  children: [new Paragraph({
                    spacing: { before: 150, after: 150 },
                    children: [new TextRun({ text: "Especifique exatamente o que você precisa", size: 22, font: "Arial" })]
                  })]
                })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({
                  borders: noBorders,
                  shading: { fill: LIGHT_PURPLE, type: ShadingType.CLEAR },
                  width: { size: 2340, type: WidthType.DXA },
                  children: [new Paragraph({
                    spacing: { before: 150, after: 150 },
                    children: [new TextRun({ text: "I - Instruções", bold: true, size: 22, color: DARK_PURPLE, font: "Arial" })]
                  })]
                }),
                new TableCell({
                  borders: noBorders,
                  shading: { fill: LIGHT_PURPLE, type: ShadingType.CLEAR },
                  width: { size: 7020, type: WidthType.DXA },
                  children: [new Paragraph({
                    spacing: { before: 150, after: 150 },
                    children: [new TextRun({ text: "Dê direções claras passo a passo", size: 22, font: "Arial" })]
                  })]
                })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({
                  borders: noBorders,
                  shading: { fill: WHITE, type: ShadingType.CLEAR },
                  width: { size: 2340, type: WidthType.DXA },
                  children: [new Paragraph({
                    spacing: { before: 150, after: 150 },
                    children: [new TextRun({ text: "S - Saída", bold: true, size: 22, color: DARK_PURPLE, font: "Arial" })]
                  })]
                }),
                new TableCell({
                  borders: noBorders,
                  shading: { fill: WHITE, type: ShadingType.CLEAR },
                  width: { size: 7020, type: WidthType.DXA },
                  children: [new Paragraph({
                    spacing: { before: 150, after: 150 },
                    children: [new TextRun({ text: "Defina o formato desejado da resposta", size: 22, font: "Arial" })]
                  })]
                })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({
                  borders: noBorders,
                  shading: { fill: LIGHT_PURPLE, type: ShadingType.CLEAR },
                  width: { size: 2340, type: WidthType.DXA },
                  children: [new Paragraph({
                    spacing: { before: 150, after: 150 },
                    children: [new TextRun({ text: "P - Persona", bold: true, size: 22, color: DARK_PURPLE, font: "Arial" })]
                  })]
                }),
                new TableCell({
                  borders: noBorders,
                  shading: { fill: LIGHT_PURPLE, type: ShadingType.CLEAR },
                  width: { size: 7020, type: WidthType.DXA },
                  children: [new Paragraph({
                    spacing: { before: 150, after: 150 },
                    children: [new TextRun({ text: "Atribua um papel ou identidade à IA", size: 22, font: "Arial" })]
                  })]
                })
              ]
            })
          ]
        }),
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun("Framework RISEN")]
        }),
        new Paragraph({
          spacing: { after: 150 },
          children: [new TextRun({ text: "Outro modelo poderoso especialmente para tarefas complexas:", size: 24, font: "Arial" })]
        }),
        new Paragraph({
          numbering: { reference: "bullet-list", level: 0 },
          children: [
            new TextRun({ text: "R - Role (Papel): ", bold: true, size: 24, font: "Arial" }),
            new TextRun({ text: "Quem a IA deve ser", size: 24, font: "Arial" })
          ]
        }),
        new Paragraph({
          numbering: { reference: "bullet-list", level: 0 },
          children: [
            new TextRun({ text: "I - Instructions (Instruções): ", bold: true, size: 24, font: "Arial" }),
            new TextRun({ text: "O que fazer", size: 24, font: "Arial" })
          ]
        }),
        new Paragraph({
          numbering: { reference: "bullet-list", level: 0 },
          children: [
            new TextRun({ text: "S - Steps (Passos): ", bold: true, size: 24, font: "Arial" }),
            new TextRun({ text: "Como fazer", size: 24, font: "Arial" })
          ]
        }),
        new Paragraph({
          numbering: { reference: "bullet-list", level: 0 },
          children: [
            new TextRun({ text: "E - End Goal (Objetivo Final): ", bold: true, size: 24, font: "Arial" }),
            new TextRun({ text: "O resultado esperado", size: 24, font: "Arial" })
          ]
        }),
        new Paragraph({
          numbering: { reference: "bullet-list", level: 0 },
          children: [
            new TextRun({ text: "N - Narrowing (Restrições): ", bold: true, size: 24, font: "Arial" }),
            new TextRun({ text: "Limitações e regras", size: 24, font: "Arial" })
          ]
        }),
        new Paragraph({ children: [new PageBreak()] }),

        // CAPÍTULO 4
        createSectionHeader("Capítulo 4: Aplicações Práticas"),
        new Paragraph({ spacing: { before: 300 }, children: [] }),
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun("Escrita e Criação de Conteúdo")]
        }),
        new Paragraph({
          spacing: { after: 200 },
          children: [new TextRun({ text: "A engenharia de prompt revoluciona a criação de conteúdo. Com os prompts certos, você pode gerar:", size: 24, font: "Arial" })]
        }),
        new Paragraph({
          numbering: { reference: "bullet-list", level: 0 },
          children: [new TextRun({ text: "Artigos otimizados para SEO em minutos", size: 24, font: "Arial" })]
        }),
        new Paragraph({
          numbering: { reference: "bullet-list", level: 0 },
          children: [new TextRun({ text: "Scripts para vídeos e podcasts", size: 24, font: "Arial" })]
        }),
        new Paragraph({
          numbering: { reference: "bullet-list", level: 0 },
          children: [new TextRun({ text: "Emails persuasivos e newsletters", size: 24, font: "Arial" })]
        }),
        new Paragraph({
          numbering: { reference: "bullet-list", level: 0 },
          children: [new TextRun({ text: "Posts para redes sociais com alto engajamento", size: 24, font: "Arial" })]
        }),
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun("Programação e Desenvolvimento")]
        }),
        new Paragraph({
          spacing: { after: 200 },
          children: [new TextRun({ text: "Desenvolvedores estão usando prompts para acelerar drasticamente seu trabalho:", size: 24, font: "Arial" })]
        }),
        new Paragraph({
          numbering: { reference: "bullet-list", level: 0 },
          children: [new TextRun({ text: "Geração de código boilerplate", size: 24, font: "Arial" })]
        }),
        new Paragraph({
          numbering: { reference: "bullet-list", level: 0 },
          children: [new TextRun({ text: "Debug e identificação de erros", size: 24, font: "Arial" })]
        }),
        new Paragraph({
          numbering: { reference: "bullet-list", level: 0 },
          children: [new TextRun({ text: "Refatoração e otimização de código", size: 24, font: "Arial" })]
        }),
        new Paragraph({
          numbering: { reference: "bullet-list", level: 0 },
          children: [new TextRun({ text: "Documentação automática", size: 24, font: "Arial" })]
        }),
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun("Análise de Dados")]
        }),
        new Paragraph({
          spacing: { after: 200 },
          children: [new TextRun({ text: "Transforme dados brutos em insights acionáveis:", size: 24, font: "Arial" })]
        }),
        new Paragraph({
          numbering: { reference: "bullet-list", level: 0 },
          children: [new TextRun({ text: "Análise de sentimento em feedbacks de clientes", size: 24, font: "Arial" })]
        }),
        new Paragraph({
          numbering: { reference: "bullet-list", level: 0 },
          children: [new TextRun({ text: "Identificação de padrões e tendências", size: 24, font: "Arial" })]
        }),
        new Paragraph({
          numbering: { reference: "bullet-list", level: 0 },
          children: [new TextRun({ text: "Geração de relatórios executivos", size: 24, font: "Arial" })]
        }),
        new Paragraph({
          numbering: { reference: "bullet-list", level: 0 },
          children: [new TextRun({ text: "Previsões e modelagem de cenários", size: 24, font: "Arial" })]
        }),
        createPullQuote(
          "Quem domina prompts não substitui seu trabalho pela IA — multiplica sua capacidade de entrega em 10x ou mais.",
          "CEO de Startup de Tecnologia"
        ),
        new Paragraph({ children: [new PageBreak()] }),

        // CAPÍTULO 5
        createSectionHeader("Capítulo 5: Erros Comuns e Como Evitá-los"),
        new Paragraph({ spacing: { before: 300 }, children: [] }),
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun("1. Prompts Vagos Demais")]
        }),
        new Paragraph({
          spacing: { after: 200 },
          children: [new TextRun({ text: "O erro mais comum é ser genérico demais. \"Escreva um texto sobre vendas\" é um convite para respostas medíocres. Seja específico sobre o público, objetivo, tom e formato.", size: 24, font: "Arial" })]
        }),
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun("2. Ignorar o Contexto")]
        }),
        new Paragraph({
          spacing: { after: 200 },
          children: [new TextRun({ text: "A IA não conhece sua situação específica. Forneça contexto relevante: seu setor, público-alvo, objetivos, restrições. Quanto mais contexto, melhor a resposta.", size: 24, font: "Arial" })]
        }),
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun("3. Esperar Perfeição na Primeira Tentativa")]
        }),
        new Paragraph({
          spacing: { after: 200 },
          children: [new TextRun({ text: "Engenharia de prompt é um processo iterativo. A primeira resposta raramente é perfeita. Use-a como ponto de partida e refine progressivamente.", size: 24, font: "Arial" })]
        }),
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun("4. Não Verificar as Respostas")]
        }),
        new Paragraph({
          spacing: { after: 200 },
          children: [new TextRun({ text: "IAs podem \"alucinar\" — gerar informações que parecem corretas mas não são. Sempre verifique fatos, dados e referências antes de usar o conteúdo.", size: 24, font: "Arial" })]
        }),
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun("5. Prompts Longos Demais")]
        }),
        new Paragraph({
          spacing: { after: 200 },
          children: [new TextRun({ text: "Mais texto nem sempre é melhor. Prompts muito longos podem confundir a IA. Seja conciso e direto, incluindo apenas informações relevantes.", size: 24, font: "Arial" })]
        }),
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun("6. Não Definir Restrições")]
        }),
        new Paragraph({
          spacing: { after: 200 },
          children: [new TextRun({ text: "Defina claramente o que você NÃO quer. Limites de palavras, tópicos a evitar, tom inadequado — restrições são tão importantes quanto instruções.", size: 24, font: "Arial" })]
        }),
        new Paragraph({ children: [new PageBreak()] }),

        // CAPÍTULO 6
        createSectionHeader("Capítulo 6: O Futuro da Engenharia de Prompt"),
        new Paragraph({ spacing: { before: 300 }, children: [] }),
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun("Tendências para 2026 e Além")]
        }),
        new Paragraph({
          spacing: { after: 200 },
          children: [new TextRun({ text: "O campo da engenharia de prompt está evoluindo rapidamente. Aqui estão as principais tendências que moldarão o futuro:", size: 24, font: "Arial" })]
        }),
        new Paragraph({
          heading: HeadingLevel.HEADING_3,
          children: [new TextRun("Prompts Multimodais")]
        }),
        new Paragraph({
          spacing: { after: 200 },
          children: [new TextRun({ text: "A comunicação com IA não será apenas texto. Combinações de texto, imagem, áudio e vídeo permitirão instruções mais ricas e respostas mais completas.", size: 24, font: "Arial" })]
        }),
        new Paragraph({
          heading: HeadingLevel.HEADING_3,
          children: [new TextRun("Agentes Autônomos")]
        }),
        new Paragraph({
          spacing: { after: 200 },
          children: [new TextRun({ text: "Sistemas de IA que executam tarefas complexas de forma autônoma, usando prompts como \"objetivos de missão\" em vez de instruções passo a passo.", size: 24, font: "Arial" })]
        }),
        new Paragraph({
          heading: HeadingLevel.HEADING_3,
          children: [new TextRun("Prompts Personalizados")]
        }),
        new Paragraph({
          spacing: { after: 200 },
          children: [new TextRun({ text: "IAs que aprendem seu estilo e preferências, adaptando-se automaticamente para entregar resultados cada vez mais alinhados com suas necessidades.", size: 24, font: "Arial" })]
        }),
        new Paragraph({
          heading: HeadingLevel.HEADING_3,
          children: [new TextRun("Democratização Total")]
        }),
        new Paragraph({
          spacing: { after: 200 },
          children: [new TextRun({ text: "Interfaces que traduzem linguagem natural em prompts otimizados, tornando o poder da IA acessível a qualquer pessoa, independente de conhecimento técnico.", size: 24, font: "Arial" })]
        }),
        createPullQuote(
          "Em 2026, não saber usar IA será como não saber usar email em 2010. A engenharia de prompt é a alfabetização digital da nova era.",
          "Futurista de Tecnologia"
        ),
        new Paragraph({ children: [new PageBreak()] }),

        // CONCLUSÃO
        createSectionHeader("Conclusão: Sua Jornada Começa Agora"),
        new Paragraph({ spacing: { before: 300 }, children: [] }),
        new Paragraph({
          spacing: { after: 200 },
          children: [new TextRun({ text: "Você chegou ao final deste eBook, mas está apenas no início da sua jornada como engenheiro de prompts. O conhecimento que você adquiriu aqui é uma base sólida, mas o verdadeiro aprendizado vem da prática.", size: 24, font: "Arial" })]
        }),
        new Paragraph({
          spacing: { after: 200 },
          children: [new TextRun({ text: "A engenharia de prompt não é apenas uma habilidade técnica — é uma nova forma de pensar. É a capacidade de traduzir suas ideias em instruções que máquinas podem executar. E essa capacidade vai se tornar cada vez mais valiosa.", size: 24, font: "Arial" })]
        }),
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun("Seus Próximos Passos")]
        }),
        new Paragraph({
          numbering: { reference: "numbered-list-2", level: 0 },
          spacing: { after: 100 },
          children: [
            new TextRun({ text: "Pratique diariamente: ", bold: true, size: 24, font: "Arial", color: PURPLE }),
            new TextRun({ text: "Use IA para pelo menos uma tarefa real todo dia.", size: 24, font: "Arial" })
          ]
        }),
        new Paragraph({
          numbering: { reference: "numbered-list-2", level: 0 },
          spacing: { after: 100 },
          children: [
            new TextRun({ text: "Documente seus prompts: ", bold: true, size: 24, font: "Arial", color: PURPLE }),
            new TextRun({ text: "Crie uma biblioteca pessoal de prompts que funcionam.", size: 24, font: "Arial" })
          ]
        }),
        new Paragraph({
          numbering: { reference: "numbered-list-2", level: 0 },
          spacing: { after: 100 },
          children: [
            new TextRun({ text: "Experimente diferentes modelos: ", bold: true, size: 24, font: "Arial", color: PURPLE }),
            new TextRun({ text: "Cada IA tem pontos fortes diferentes.", size: 24, font: "Arial" })
          ]
        }),
        new Paragraph({
          numbering: { reference: "numbered-list-2", level: 0 },
          spacing: { after: 100 },
          children: [
            new TextRun({ text: "Compartilhe conhecimento: ", bold: true, size: 24, font: "Arial", color: PURPLE }),
            new TextRun({ text: "Ensinar é a melhor forma de aprender.", size: 24, font: "Arial" })
          ]
        }),
        new Paragraph({
          numbering: { reference: "numbered-list-2", level: 0 },
          spacing: { after: 100 },
          children: [
            new TextRun({ text: "Mantenha-se atualizado: ", bold: true, size: 24, font: "Arial", color: PURPLE }),
            new TextRun({ text: "O campo evolui rapidamente. Continue aprendendo.", size: 24, font: "Arial" })
          ]
        }),
        new Paragraph({ spacing: { before: 300 }, children: [] }),
        new Paragraph({
          spacing: { after: 200 },
          children: [new TextRun({ text: "O futuro pertence a quem sabe se comunicar com as máquinas. E agora você tem as ferramentas para estar na vanguarda dessa revolução.", size: 24, font: "Arial", bold: true })]
        }),
        new Paragraph({
          spacing: { before: 400, after: 200 },
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "Boa sorte na sua jornada!", size: 32, font: "Arial", bold: true, color: PURPLE })]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "O conhecimento que vai mudar sua vida começa com um único prompt.", size: 24, font: "Arial", italics: true, color: ACCENT_GOLD })]
        })
      ]
    }
  ]
});

Packer.toBuffer(doc).then(buffer => {
  const outputPath = path.join(rootDir, 'output', 'Engenharia_de_Prompt_2026.docx');
  fs.writeFileSync(outputPath, buffer);
  console.log(`eBook criado com sucesso: ${outputPath}`);
});
