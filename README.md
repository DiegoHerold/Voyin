# 🔍 Voyin

> Um gerenciador inteligente de arquivos com interface de linha de comando (CLI) e interface gráfica (GUI).

O **Voyin** é uma ferramenta poderosa para desenvolvedores e usuários avançados que desejam **organizar, analisar e manipular arquivos e pastas com eficiência**. Com suporte para múltiplas funcionalidades e uma interface amigável, você pode automatizar tarefas repetitivas ou explorar visualmente seus diretórios.

---

## ✨ Funcionalidades

- 📂 Leitura de subpastas e movimentação de arquivos
- 🧠 Organização inteligente com base em regras
- 📊 Relatórios completos de arquivos (extensão, tamanho, data)
- 🔄 Unificação de arquivos duplicados
- 🔁 Conversão de arquivos (PDF, Word, Imagem, Excel, etc.)
- 💻 CLI interativo com navegação por pastas
- 🖥️ GUI moderna para explorar arquivos visualmente

---

## 🧱 Estrutura do Projeto

```bash
voyin/
├── package.json              # Dependências e scripts do projeto
├── tsconfig.json             # Configuração do TypeScript
├── README.md                 # Documentação do projeto
├── .gitignore                # Arquivos ignorados pelo Git
└── src/
    ├── index.ts              # Entrada principal do sistema
    ├── cli/
    │   └── index.ts          # CLI interativa (terminal)
    ├── core/
    │   ├── fileManager.ts    # Funções de leitura e movimentação de arquivos
    │   ├── organizer.ts      # Funções de organização inteligente
    │   └── report.ts         # Geração de relatórios
    ├── gui/
    │   ├── main.ts           # Processo principal (Electron)
    │   ├── renderer.ts       # Renderizador da GUI
    │   └── components/
    │       └── Gui.tsx       # Componente principal da interface
    └── types/
        └── index.ts          # Tipagens compartilhadas
