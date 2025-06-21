# 📊 Reporter Module

O módulo `reporter` do **Voyin** fornece um relatório completo sobre uma pasta, incluindo quantidade de arquivos, tamanho por pasta, tipos de arquivos e arquivos modificados recentemente.

---

## ✅ Funcionalidades

- **`generateFullReport(dir)`**: Executa todo o relatório e exibe no terminal.
- **`getTotalFilesAndFolders(dir)`**: Conta arquivos e subpastas.
- **`getFolderSizes(dir)`**: Calcula tamanho em MB por subpasta.
- **`getFileTypesSummary(dir)`**: Agrupa arquivos por extensão.
- **`getRecentFiles(dir, limit)`**: Retorna arquivos mais recentes.

---

## 🚀 Como usar

```ts
import { generateFullReport } from '@/core/reporter'

await generateFullReport('/caminho/para/sua/pasta')
🔗 Voltar / Navegar
⬅ Voltar para o Core

🏠 Voltar para o projeto principal (Voyin)
"""