# 🧩 Duplicator Module – Voyin Core

The `duplicator` module provides utilities to **detect**, **group**, and **delete** duplicated files based on either their names or content.

---

## 📁 Functions Overview

| Function | Description |
|----------|-------------|
| `findDuplicateNames()` | Recursively finds files with the same name |
| `findDuplicateContents()` | Recursively finds files with identical content (SHA-256 hash) |
| `deleteDuplicates()` | Deletes duplicates while preserving the first of each group |
| `groupDuplicates()` | Moves duplicates to a `duplicados/` folder for manual review |

---

## 🧠 Usage Examples

### 1. Detect files with the same **name**
```ts
import { findDuplicateNames } from './duplicator'

const duplicatas = findDuplicateNames('/path/to/scan')
console.log(duplicatas)
```

---

### 2. Detect files with the same **content**
```ts
import { findDuplicateContents } from './duplicator'

const duplicatas = findDuplicateContents('/path/to/scan')
console.log(duplicatas)
```

---

### 3. Delete duplicates (preserving one)
```ts
import { deleteDuplicates } from './duplicator'

await deleteDuplicates(duplicatas)
```

---

### 4. Group duplicates into a folder
```ts
import { groupDuplicates } from './duplicator'

await groupDuplicates(duplicatas, '/path/to/scan')
```

---

## ✅ Best Practices

- Run `groupDuplicates()` before deletion for safety
- Always review before running destructive actions like `deleteDuplicates()`
- Works with deeply nested folders and mixed file types

---

## 📦 Notes

- This module does not mutate or delete anything by default — actions are explicit
- Uses `fs-extra` for better reliability
- All operations are asynchronous and safe

---

Return to [Core Modules](../README.md)
| Módulo            | Link                                                             |
| ----------------- | ---------------------------------------------------------------- |
| ⬅ Voltar ao Core  | [Voltar ao README principal do Core](../README.md)               |
| 📂 File Manager   | [fileManager README](../fileManager/fileManager_README.md)       |
| 📂 Folder Manager | [folderManager README](../folderManager/folderManager_README.md) |
| 🧩 Duplicator     | **(Você está aqui)**                                             |
| 🔎 Search         | [search README](../search/search_README.md)                      |
| 📊 Report         | [report README](../report/report_README.md)                      |
| 🔁 Organizer      | [organizer README](../organizer/organizer_README.md)             |
