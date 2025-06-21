# 📁 Folder Manager - Core Module

O módulo **Folder Manager** é responsável por todas as operações relacionadas a **pastas/diretórios** no sistema **Voyin**.

---

## ✅ Funcionalidades disponíveis

| Função           | Descrição                                                                 |
|------------------|---------------------------------------------------------------------------|
| `createFolder`   | Cria uma nova pasta, mesmo em caminhos aninhados                         |
| `deleteFolder`   | Remove uma pasta e todo seu conteúdo                                     |
| `renameFolder`   | Renomeia uma pasta mantendo sua estrutura                                |
| `moveFolder`     | Move uma pasta para outro diretório                                      |
| `copyFolder`     | Copia uma pasta com todo o seu conteúdo                                  |
| `listFolder`     | Lista o conteúdo de uma pasta (arquivos e/ou subpastas)                 |

---

## 🛠️ Exemplos de uso

### 🆕 Criar uma nova pasta
```ts
await createFolder('projetos/novoProjeto')
```

---

### ❌ Excluir uma pasta
```ts
await deleteFolder('projetos/antigoProjeto')
```

---

### 🏷️ Renomear pasta
```ts
await renameFolder('projetos/novoProjeto', 'projetos/projetoRenomeado')
```

---

### 📦 Mover pasta
```ts
await moveFolder('projetos/projetoRenomeado', 'arquivos/movidos')
```

---

### 🧬 Copiar pasta
```ts
await copyFolder('arquivos/movidos/projetoRenomeado', 'backup')
```

---

### 📂 Listar conteúdo de uma pasta
```ts
const arquivos = await listFolder('projetos')
const apenasPastas = await listFolder('projetos', true)
```

---

## 🌐 Navegação entre módulos

- [⬅ Voltar para o README principal](../../README.md)
- [📁 fileManager](../fileManager/README.md)
- [🧰 helpers](../../helpers/README.md)
- [🧠 CLI](../../cli/README.md)

---

## 📌 Observações

- Todas as funções são assíncronas e usam `fs-extra` e `path.resolve`.
- Utilizadas em conjunto com o menu da CLI do **Voyin**.
- Asseguram que caminhos inválidos ou duplicações sejam tratadas com segurança.

---

> Parte do núcleo confiável do **core** da plataforma **Voyin**