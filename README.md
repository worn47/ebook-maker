# eBook Maker

> Gere eBooks profissionais estilo McKinsey com capas geradas por IA em minutos.

![Capa de Exemplo](sample/cover_image.png)

Transforme seu conteúdo em eBooks polidos e profissionais com capas impressionantes geradas por IA. Nenhuma habilidade de design necessária.

## O Que Você Vai Criar

- **Capas Profissionais** — Imagens abstratas geradas por IA em sangria total
- **Tipografia Limpa** — Estética corporativa inspirada na McKinsey
- **Documentos Completos** — Índice, seções estilizadas, cabeçalhos/rodapés
- **PDFs Prontos para Impressão** — Exporte para PDF com um comando

[Veja exemplo de saída →](sample/State_of_AI_2026.pdf)

---

## Início Rápido (5 Minutos)

### Pré-requisitos

- **Node.js** (v16+) — [Download](https://nodejs.org/)
- **Python 3.8+** — [Download](https://python.org/)
- **LibreOffice** (para exportar PDF) — [Download](https://libreoffice.org/)

### Passo 1: Clonar o Repositório

```bash
git clone https://github.com/inematds/ebook-maker.git
cd ebook-maker
```

### Passo 2: Obter Sua Chave de API

Você precisará de uma **chave de API do Google Gemini** (plano gratuito disponível):

1. Vá para [Google AI Studio](https://aistudio.google.com/apikey)
2. Clique em **"Create API Key"**
3. Copie sua chave

### Passo 3: Configurar

Crie um arquivo `.env` no diretório raiz:

```bash
echo "GEMINI_API_KEY=sua_chave_api_aqui" > .env
```

### Passo 4: Instalar Dependências

```bash
# Dependências Python (para geração da imagem de capa)
python3 -m venv venv
source venv/bin/activate  # No Windows: venv\Scripts\activate
pip install -r requirements.txt

# Dependências Node.js (para geração do documento)
cd ai_report_package && npm install && cd ..
```

### Passo 5: Gerar Seu Primeiro eBook

```bash
# Criar diretório de saída
mkdir -p output

# Gerar imagem de capa
source venv/bin/activate && python generate_image.py

# Gerar documento
cd ai_report_package && node create_report.js && cd ..

# Converter para PDF (macOS)
/Applications/LibreOffice.app/Contents/MacOS/soffice --headless --convert-to pdf output/State_of_AI_2026.docx

# Converter para PDF (Linux)
libreoffice --headless --convert-to pdf output/State_of_AI_2026.docx
```

Seu eBook está pronto em `output/`!

---

## Guia de Personalização

### Alterar a Imagem de Capa

Edite `generate_image.py` e modifique a variável `prompt`:

```python
prompt = "Abstract visualization of SEU_TOPICO, swirling blue and teal patterns, professional corporate style, soft gradients, ethereal atmosphere"
```

**Dicas para ótimos prompts:**
- Seja específico sobre as cores (combine com sua marca)
- Use "abstract" ou "visualization" para aparência profissional
- Adicione "corporate", "professional", "clean" para estética empresarial
- Evite: fotos, clipart, padrões muito ocupados

### Alterar Título e Marca

Edite `ai_report_package/create_report.js`:

**1. Encontre a seção da capa** (procure por `McKINSEY-STYLE COVER PAGE`)

**2. Atualize estes valores:**
```javascript
// Nome da empresa
new TextRun({ text: "Sua Empresa", ... })

// Título principal
new TextRun({ text: "SEU TÍTULO", ... })

// Subtítulo
new TextRun({ text: "Seu subtítulo aqui", ... })
```

### Alterar Cores

No topo de `create_report.js`, modifique:

```javascript
const BLUE = "1E5FAA";        // Azul principal
const DARK_BLUE = "0A2744";   // Cabeçalhos, barra do rodapé
const ACCENT_BLUE = "2B7DE9"; // Cor de destaque (palavras destacadas)
```

Use qualquer cor hexadecimal (sem o `#`).

---

## Estrutura do Projeto

```
ebook-maker/
├── .claude/
│   └── skills/
│       └── ebook-creator.md    # Skill do Claude Code (opcional)
├── ai_report_package/
│   ├── create_report.js        # Gerador principal de documentos
│   ├── logo.png                # Logo da sua empresa
│   └── package.json
├── output/                     # Arquivos gerados (gitignored)
├── sample/                     # Exemplo de saída
│   ├── cover_image.png
│   └── State_of_AI_2026.pdf
├── generate_image.py           # Gerador de capa com IA
├── requirements.txt            # Dependências Python
├── CLAUDE.md                   # Instruções do Claude Code
└── README.md                   # Você está aqui
```

---

## Usando com Claude Code

Este repositório inclui uma skill para [Claude Code](https://claude.ai/code). Basta dizer:

> "Crie um ebook sobre [seu tópico]"

O Claude vai:
1. Perguntar seu título, subtítulo e nome da empresa
2. Gerar uma imagem de capa personalizada
3. Construir o documento
4. Exportar para PDF

---

## Chaves de API Explicadas

### Google Gemini API (Obrigatória)

**Para que serve:** Gerar as imagens de capa com IA

**Custo:** Plano gratuito inclui 60 requisições/minuto

**Como obter:**
1. Visite [Google AI Studio](https://aistudio.google.com/apikey)
2. Faça login com Google
3. Clique em "Create API Key"
4. Adicione ao arquivo `.env`

---

## Solução de Problemas

### Erros de "Module not found"

```bash
# Certifique-se de estar no ambiente virtual
source venv/bin/activate
pip install -r requirements.txt
```

### Imagem de capa não está gerando

1. Verifique sua chave de API no `.env`
2. Certifique-se de ter conexão com a internet
3. Tente um prompt mais simples primeiro

### Conversão para PDF falha

**macOS:** Certifique-se de que o LibreOffice está instalado em `/Applications/`

**Linux:** Instale com `sudo apt install libreoffice`

**Windows:** Use a interface do LibreOffice ou instale via [chocolatey](https://chocolatey.org/): `choco install libreoffice`

### Documento parece errado

- Verifique se `output/cover_image.png` existe antes de executar `create_report.js`
- Certifique-se de que as dependências Node.js estão instaladas: `cd ai_report_package && npm install`

---

## Stack Tecnológica

| Componente | Tecnologia |
|------------|------------|
| Geração de Capa | Google Gemini 3 Pro Image |
| Criação de Documento | Node.js + biblioteca [docx](https://www.npmjs.com/package/docx) |
| Exportação PDF | LibreOffice (headless) |
| Assistente IA | Claude Code (opcional) |

---

## Exemplos

### Relatório Empresarial
```python
prompt = "Abstract visualization of business growth and data analytics, ascending geometric shapes in navy blue and gold, professional corporate style"
```

### Whitepaper de Tecnologia
```python
prompt = "Abstract neural network and cloud computing visualization, glowing blue nodes connected by light streams, futuristic tech aesthetic"
```

### Guia de Saúde
```python
prompt = "Abstract visualization of medical innovation, soft teal and white flowing patterns, clean and calming healthcare aesthetic"
```

---

## Contribuindo

PRs são bem-vindos! Ideias para melhorias:
- [ ] Mais templates de documentos
- [ ] Interface web
- [ ] Múltiplos presets de estilo de capa
- [ ] Geração em lote

---

## Licença

MIT — use como quiser.

---

<p align="center">
  <b>Construído com Claude Code</b><br>
  <a href="https://claude.ai/code">claude.ai/code</a>
</p>
