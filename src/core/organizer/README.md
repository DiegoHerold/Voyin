# 📦 Organizer Module

Organiza arquivos automaticamente com base em **extensão**, **nome**, **data**, **tamanho** ou estrutura detectada.

---

## 🔧 Funcionalidades

| Função                  | Descrição                                                                 |
|-------------------------|---------------------------------------------------------------------------|
| `organizeByExtension`   | Move arquivos para pastas como `/pdf`, `/jpg`, `/docx`, etc.              |
| `organizeByName`        | Cria pastas com base no prefixo do nome (ex: `2023_relatorio.pdf` → `/2023/`) |
| `organizeByDate`        | Organiza por data de modificação (`/2024-05/`, `/2023-12/`...)            |
| `organizeBySize`        | Separa arquivos por tamanho: `small`, `medium`, `large`                   |
| `analyzeFolderPattern`  | Detecta padrões existentes e sugere organização (sem uso de IA)           |
| `moveFileToFolder`      | Utilitário confiável para mover arquivos sem sobrescrita                  |

---

## 🧠 Exemplo de uso

```ts
import {
  organizeByExtension,
  organizeByName,
  organizeByDate,
  organizeBySize,
  analyzeFolderPattern,
} from '@/core/organizer'

await organizeByExtension('/caminho/da/pasta')
```

---

## 🔍 Detectar padrão automaticamente

```ts
const resultado = analyzeFolderPattern('/caminho/da/pasta')

console.log(resultado.padrao)      // 'porExtensao' | 'porPrefixo' | 'porData' | 'desorganizado'
console.log(resultado.sugestao)    // Sugestão em português
console.log(resultado.confianca)  // Ex: 85
```

---

## 🧭 Navegação

- ← [🔁 Duplicator](../duplicator/README.md)
- ↑ [📂 Core](../../README.md)
- → [🧠 IA / Analyzer (em breve)](../analyzer/README.md)