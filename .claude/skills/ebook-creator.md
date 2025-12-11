# Skill Criador de eBook

Crie eBooks profissionais estilo McKinsey com imagens de capa geradas por IA.

## Quando Usar

Invoque esta skill quando o usuário pedir para:
- Criar um ebook, relatório ou whitepaper
- Gerar um documento profissional com página de capa
- Fazer um relatório em PDF ou conteúdo para download

## Filosofia de Design

O estilo padrão é a estética de **Consultoria McKinsey**:
- Imagem de capa abstrata em sangria total (gerada por IA)
- Texto branco limpo sobre sobreposição de fundo escuro
- Marca da empresa no canto superior esquerdo
- Títulos em negrito sans-serif (Arial)
- Cor de destaque para palavras-chave (ciano/verde-azulado)
- Barra de destaque escura na parte inferior

## Fluxo de Trabalho

### Passo 1: Coletar Requisitos

Antes de gerar, pergunte ao usuário:

1. **Título**: Qual é o nome do ebook?
2. **Subtítulo**: Uma linha descrevendo o conteúdo
3. **Empresa/Autor**: Quem está publicando?
4. **Estilo da Capa** (opcional): Padrão é visualização abstrata com IA

Se o usuário não especificar preferências de design, use nosso estilo McKinsey padrão. Recuse educadamente:
- Clipart ou fotos de banco de imagens → sugira imagens abstratas com IA
- Múltiplas fontes → mantenha Arial
- Cores brilhantes/neon → sugira azuis e verdes-azulados corporativos
- Comic Sans → apenas sans-serif profissional

### Passo 2: Gerar Imagem de Capa

Edite o prompt em `generate_image.py` para o tópico:

```python
prompt = "Abstract visualization of [TOPICO], swirling [CORES_DA_MARCA] patterns emanating from a luminous center, professional corporate style, soft gradients, ethereal atmosphere, suitable as ebook cover"
```

Execute:
```bash
source venv/bin/activate && python generate_image.py
```

Saída: `output/cover_image.png`

### Passo 3: Atualizar Documento

Edite `ai_report_package/create_report.js`:

**Cores** (topo do arquivo):
```javascript
const BLUE = '1E5FAA';
const DARK_BLUE = '0A2744';
const ACCENT_BLUE = '2B7DE9';
```

**Texto da capa** (procure por "McKINSEY-STYLE COVER PAGE"):
- Atualize "Prompt Advisers" → empresa do usuário
- Atualize "THE STATE OF AI 2026" → título do usuário
- Atualize texto do subtítulo

### Passo 4: Gerar Saída

```bash
cd ai_report_package && node create_report.js
```

Saída: `output/State_of_AI_2026.docx`

### Passo 5: Converter para PDF

macOS:
```bash
/Applications/LibreOffice.app/Contents/MacOS/soffice --headless --convert-to pdf output/State_of_AI_2026.docx
```

Linux:
```bash
libreoffice --headless --convert-to pdf output/State_of_AI_2026.docx
```

## Estrutura de Arquivos

```
eBook Maker/
├── .claude/skills/
│   └── ebook-creator.md    # Este arquivo
├── ai_report_package/
│   ├── create_report.js    # Gerador de documento
│   └── logo.png            # Logo da empresa
├── output/                 # Todos os arquivos gerados
│   ├── cover_image.png
│   └── *.docx, *.pdf
├── sample/                 # Exemplo de saída
├── generate_image.py       # Gerador de capa
├── requirements.txt
└── .env                    # GEMINI_API_KEY
```

## Exemplo

Veja a pasta `sample/` para exemplo de saída demonstrando o estilo padrão.
