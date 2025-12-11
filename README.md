# eBook Maker

> Gere eBooks profissionais com capas geradas por IA em minutos. Zero conhecimento técnico necessário.

![Capa de Exemplo](sample/cover_image.png)

---

## Para Iniciantes: Use com Claude Code (Mais Fácil!)

Se você tem o **Claude Code** instalado, não precisa fazer nada manual. Basta dizer:

> "Crie um ebook sobre [seu tópico]"

O Claude faz todo o trabalho automaticamente!

**Não tem Claude Code?** [Instale aqui](https://claude.ai/code) e siga o tutorial abaixo.

---

## Tutorial Completo para Leigos (Passo a Passo)

### O Que Você Vai Precisar

| Ferramenta | Para Que Serve | Link |
|------------|----------------|------|
| **Claude Code** | Assistente IA que cria o eBook | [claude.ai/code](https://claude.ai/code) |
| **Conta Google** | Para gerar imagens de capa | Você já tem! |

### Passo 1: Instalar o Claude Code

1. Acesse [claude.ai/code](https://claude.ai/code)
2. Baixe o instalador para seu sistema (Windows/Mac/Linux)
3. Execute o instalador e siga as instruções
4. Abra o terminal e digite `claude` para verificar se funcionou

### Passo 2: Baixar Este Projeto

Abra o terminal e digite:

```bash
git clone https://github.com/inematds/ebook-maker.git
cd ebook-maker
```

### Passo 3: Obter Chave da API do Google (Grátis)

1. Acesse [aistudio.google.com/apikey](https://aistudio.google.com/apikey)
2. Faça login com sua conta Google
3. Clique em **"Create API Key"**
4. Copie a chave gerada (parece com: `AIzaSy...`)

### Passo 4: Iniciar o Claude Code

No terminal, dentro da pasta do projeto:

```bash
claude
```

### Passo 5: Configurar e Criar Seu eBook

Agora é só conversar com o Claude! Diga:

> "Configure a chave da API: [cole sua chave aqui]"

Depois:

> "Crie um ebook sobre [seu tema]"

**Exemplo:**
> "Crie um ebook sobre Marketing Digital para Pequenas Empresas"

O Claude vai:
1. Perguntar o título e subtítulo
2. Gerar uma capa profissional com IA
3. Criar todo o conteúdo formatado
4. Exportar para PDF

**Pronto! Seu eBook estará na pasta `output/`**

---

## 3 Layouts Disponíveis

Este projeto inclui 3 estilos de layout profissionais:

### 1. Editorial Clássico
**Arquivo:** `layout_editorial_classico.js`

**Ideal para:** Romances, biografias, livros de história

**Características:**
- Fonte serifada elegante (Georgia)
- Capitulares decorativas (letra grande no início)
- Epígrafes (citações no início dos capítulos)
- Margens largas com proporção clássica
- Ornamentos tipográficos (❦)
- Numeração de página centralizada

**Inspiração:** Penguin Classics, livros da Companhia das Letras

```
+------------------------+
|                        |
|    CAPÍTULO I          |
|    O Início            |
|         ❧              |
|  "Citação elegante"    |
|      — Autor           |
|                        |
|  ERA uma vez, em um    |
|  reino distante...     |
|                        |
|         12             |
+------------------------+
```

---

### 2. Moderno Funcional
**Arquivo:** `layout_moderno_funcional.js`

**Ideal para:** Guias, tutoriais, eBooks de marketing, manuais

**Características:**
- Fonte sans-serif limpa (Arial)
- Caixas coloridas de destaque (Dicas, Avisos, Resumos)
- Listas e bullets bem definidos
- Cabeçalhos numerados com linhas divisórias
- Foco em escaneabilidade e aprendizado rápido

**Inspiração:** Livros da O'Reilly, A Book Apart

```
+------------------------+
|  GUIA PRÁTICO      P.4 |
|  ________________      |
|                        |
|  # 1. O Conceito       |
|                        |
|  +------------------+  |
|  | 💡 DICA:         |  |
|  | Sempre comece... |  |
|  +------------------+  |
|                        |
|  • Item 1              |
|  • Item 2              |
|  • Item 3              |
|                        |
+------------------------+
```

---

### 3. Minimalista Suíço
**Arquivo:** `layout_minimalista_suico.js`

**Ideal para:** Portfólios, manifestos, livros de design/arquitetura

**Características:**
- Grid assimétrico (coluna de notas + texto principal)
- Muito espaço em branco intencional
- Títulos gigantes em negrito
- Apenas preto, branco e cinza
- Texto alinhado à esquerda (nunca justificado)

**Inspiração:** Josef Müller-Brockmann, Vignelli Canon

```
+------------------------+
|                        |
|  01.                   |
|  A BASE                |
|                        |
|  Nota:     O design    |
|            não é só    |
|            aparência.  |
|                        |
|            É função.   |
|                        |
|                        |
|  2                     |
+------------------------+
```

---

## Como Usar os Layouts

### Método 1: Via Claude Code (Recomendado)

Simplesmente peça ao Claude:

> "Crie um eBook usando o layout Editorial Clássico sobre [tema]"

ou

> "Use o layout Moderno Funcional para criar um guia sobre [tema]"

ou

> "Quero um eBook estilo Minimalista Suíço sobre [tema]"

### Método 2: Executar Diretamente

```bash
# Entrar na pasta do projeto
cd ebook-maker/ai_report_package

# Gerar com Layout Editorial Clássico
node layout_editorial_classico.js

# Gerar com Layout Moderno Funcional
node layout_moderno_funcional.js

# Gerar com Layout Minimalista Suíço
node layout_minimalista_suico.js

# Converter para PDF (Linux)
libreoffice --headless --convert-to pdf ../output/Layout_Editorial_Classico.docx
```

### Método 3: Personalizar o Layout

Cada arquivo de layout exporta funções reutilizáveis. Exemplo com Editorial Clássico:

```javascript
const {
  createChapterTitle,  // Título de capítulo elegante
  createEpigraph,      // Citação no início
  createDropCap,       // Capitular decorativa
  createParagraph,     // Parágrafo com indentação
  createSectionBreak   // Separador * * *
} = require('./layout_editorial_classico.js');

// Use as funções para criar seu conteúdo personalizado
```

---

## Estrutura do Projeto

```
ebook-maker/
├── ai_report_package/
│   ├── create_report.js              # Layout McKinsey (padrão)
│   ├── layout_editorial_classico.js  # Layout 1: Romances
│   ├── layout_moderno_funcional.js   # Layout 2: Guias/Tutoriais
│   ├── layout_minimalista_suico.js   # Layout 3: Design/Portfólio
│   ├── logo.png
│   └── package.json
├── .claude/
│   └── skills/
│       └── ebook-creator.md          # Skill do Claude Code
├── output/                           # Arquivos gerados
├── sample/                           # Exemplos
├── generate_image.py                 # Gerador de capas com IA
├── requirements.txt
├── CLAUDE.md
└── README.md
```

---

## Instalação Manual (Para Desenvolvedores)

Se preferir não usar o Claude Code:

### Pré-requisitos

- Node.js v16+ — [nodejs.org](https://nodejs.org/)
- Python 3.8+ — [python.org](https://python.org/)
- LibreOffice — [libreoffice.org](https://libreoffice.org/)

### Instalação

```bash
# Clonar repositório
git clone https://github.com/inematds/ebook-maker.git
cd ebook-maker

# Configurar API
echo "GEMINI_API_KEY=sua_chave_aqui" > .env

# Instalar dependências Python
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Instalar dependências Node.js
cd ai_report_package && npm install && cd ..

# Criar pasta de saída
mkdir -p output
```

### Gerar eBook

```bash
# 1. Gerar imagem de capa
source venv/bin/activate && python generate_image.py

# 2. Gerar documento (escolha um layout)
cd ai_report_package
node create_report.js                  # McKinsey (padrão)
# ou
node layout_editorial_classico.js      # Clássico
# ou
node layout_moderno_funcional.js       # Funcional
# ou
node layout_minimalista_suico.js       # Minimalista

# 3. Converter para PDF
cd ..
libreoffice --headless --convert-to pdf output/*.docx
```

---

## Personalização Avançada

### Alterar Cores

Cada layout tem constantes de cor no topo do arquivo:

**Editorial Clássico:**
```javascript
const DARK_BROWN = "3D2914";
const GOLD = "8B7355";
```

**Moderno Funcional:**
```javascript
const PRIMARY_BLUE = "0066CC";
const ACCENT_ORANGE = "FF6600";
```

**Minimalista Suíço:**
```javascript
const BLACK = "000000";
const MEDIUM_GRAY = "999999";
```

### Alterar Fontes

Procure por `font: "Georgia"` ou `font: "Arial"` e substitua por:
- Serifadas: `"Times New Roman"`, `"Garamond"`, `"Palatino"`
- Sans-serif: `"Helvetica"`, `"Roboto"`, `"Open Sans"`

### Adicionar Novas Seções

Use as funções auxiliares de cada layout:

```javascript
// Editorial Clássico
createChapterTitle("III", "Novo Capítulo")
createEpigraph("Citação inspiradora", "Autor")
createDropCap("A", "qui começa o texto...")

// Moderno Funcional
createSectionHeader("03", "NOVA SEÇÃO")
createTipBox("DICA", "Conteúdo da dica")
createWarningBox("Aviso importante!")
createSummaryBox(["Item 1", "Item 2", "Item 3"])

// Minimalista Suíço
createSectionTitle("03.", "NOVO TEMA")
createTwoColumnLayout("Nota lateral", "Texto principal aqui")
createQuote("Citação impactante")
```

---

## Solução de Problemas

### "Module not found"
```bash
cd ai_report_package && npm install
```

### "GEMINI_API_KEY not found"
```bash
echo "GEMINI_API_KEY=sua_chave" > .env
```

### PDF não gera
```bash
# Linux
sudo apt install libreoffice

# macOS
brew install libreoffice
```

### Imagem de capa não aparece
Certifique-se de que existe `output/cover_image.png` antes de rodar o layout.

---

## Exemplos de Prompts para o Claude

```
"Crie um eBook sobre Inteligência Artificial para Iniciantes"

"Use o layout Editorial Clássico para criar um livro de poesias"

"Gere um guia prático de Marketing Digital com layout Moderno Funcional"

"Crie um portfólio minimalista sobre Design de Interiores"

"Faça um eBook sobre Produtividade com capa azul e dourada"
```

---

## Stack Tecnológica

| Componente | Tecnologia |
|------------|------------|
| Geração de Capa | Google Gemini 3 Pro Image |
| Criação de Documento | Node.js + [docx](https://www.npmjs.com/package/docx) |
| Exportação PDF | LibreOffice (headless) |
| Assistente IA | Claude Code |

---

## Licença

MIT — use como quiser.

---

<p align="center">
  <b>Construído com Claude Code</b><br>
  <a href="https://claude.ai/code">claude.ai/code</a>
</p>
