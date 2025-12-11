# eBook Maker

Gere eBooks profissionais estilo McKinsey com capas geradas por IA.

## Início Rápido

Basta dizer:
> "Crie um ebook sobre [seu tópico]"

O Claude invocará a skill `ebook-creator` e guiará você pelo processo.

## O Que Você Obtém

Veja a pasta `sample/` para exemplo de saída:
- Capa profissional com imagem abstrata gerada por IA
- Tipografia limpa e esquema de cores corporativo
- Documento com múltiplas seções e índice
- PDF pronto para distribuição

## Configuração

### 1. Chave de API

Adicione sua chave de API do Gemini ao `.env`:
```
GEMINI_API_KEY=sua_chave_aqui
```

### 2. Instalar Dependências

```bash
# Python (para geração da imagem de capa)
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Node.js (para geração do documento)
cd ai_report_package && npm install
```

### 3. Conversão para PDF (Opcional)

Requer LibreOffice para conversão de .docx para .pdf.

## Estrutura do Projeto

```
eBook Maker/
├── .claude/skills/
│   └── ebook-creator.md    # Skill com fluxo completo
├── ai_report_package/
│   ├── create_report.js    # Gerador de documento (edite para conteúdo)
│   └── logo.png            # Logo da empresa
├── output/                 # Arquivos gerados vão aqui
│   ├── cover_image.png
│   └── State_of_AI_2026.docx/.pdf
├── sample/                 # Exemplo de saída para referência
├── generate_image.py       # Gerador de imagem de capa (edite o prompt)
├── requirements.txt
└── .env                    # Chave de API (não commitado)
```

## Personalização

| O quê | Onde |
|-------|------|
| Estilo da imagem de capa | `generate_image.py` → edite a variável `prompt` |
| Cores da marca | `ai_report_package/create_report.js` → topo do arquivo |
| Título e subtítulo | `ai_report_package/create_report.js` → seção da capa |
| Conteúdo do relatório | `ai_report_package/create_report.js` → seções de conteúdo |

## Referência de Comandos

```bash
# Gerar imagem de capa
source venv/bin/activate && python generate_image.py

# Gerar documento
cd ai_report_package && node create_report.js

# Converter para PDF (macOS)
/Applications/LibreOffice.app/Contents/MacOS/soffice --headless --convert-to pdf output/State_of_AI_2026.docx

# Converter para PDF (Linux)
libreoffice --headless --convert-to pdf output/State_of_AI_2026.docx
```

## Design Padrão

Estética de consultoria inspirada na McKinsey:
- Capa com imagem abstrata gerada por IA em sangria total
- Texto branco sobre fundo escuro semi-transparente
- Tipografia Arial em todo o documento
- Paleta de cores azul/verde-azulado corporativo
- Barra de destaque na parte inferior com tagline

## Notas

- Sempre execute os scripts diretamente — nunca peça ao usuário para executá-los
- A capa usa Gemini 3 Pro Image (`gemini-3-pro-image-preview`)
- O documento usa biblioteca docx v8.x
- Todas as medidas em unidades DXA (1440 DXA = 1 polegada)
