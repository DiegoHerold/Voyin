# 📁 File Manager - Core Module

O módulo **File Manager** cuida de todas as operações com **arquivos individuais** no sistema **Voyin**.

---

## ✅ Funcionalidades disponíveis

| Função           | Descrição                                                  |
|------------------|------------------------------------------------------------|
| `createFile`     | Cria um novo arquivo com conteúdo opcional                |
| `deleteFile`     | Remove um arquivo existente                               |
| `readFile`       | Lê e retorna o conteúdo de um arquivo                     |
| `updateFile`     | Substitui o conteúdo de um arquivo                       |
| `renameFile`     | Renomeia um arquivo mantendo no mesmo diretório          |
| `moveFile`       | Move um arquivo para outro local                          |
| `copyFile`       | Copia um arquivo para outro local                         |

---

## 🛠️ Exemplos de uso

### 📄 Criar um arquivo
```ts
await createFile('temp/log.txt', 'Arquivo criado com sucesso!')
```

---

### ❌ Excluir um arquivo
```ts
await deleteFile('temp/log.txt')
```

---

### 📖 Ler um arquivo
```ts
const conteudo = await readFile('temp/log.txt')
console.log(conteudo)
```

---

### ✏️ Atualizar conteúdo
```ts
await updateFile('temp/log.txt', 'Novo conteúdo substituindo o anterior')
```

---

### 🏷️ Renomear arquivo
```ts
await renameFile('temp/log.txt', 'registro.txt')
```

---

### 📦 Mover arquivo
```ts
await moveFile('temp/registro.txt', 'backup/logs')
```

---

### 🧬 Copiar arquivo
```ts
await copyFile('backup/logs/registro.txt', 'temp/duplicado.txt')
```

---

## 🌐 Navegação entre módulos

- [⬅ Voltar para o README principal](../../README.md)
- [📁 folderManager](../folderManager/README.md)
- [🧰 helpers](../../helpers/README.md)
- [🧠 CLI](../../cli/README.md)

---

## 📌 Observações

- Todas as funções usam `fs-extra` para segurança, validações e multiplataforma.
- Os caminhos são resolvidos automaticamente com `path.resolve`.
- Ideal para ser utilizado junto com o menu da CLI do **Voyin**.

---

> Desenvolvido com dedicação para o módulo **core** do **Voyin**