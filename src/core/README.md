# 🧠 Núcleo Voyin – `@voyin/core`

> Módulo central com todas as funcionalidades reutilizáveis do sistema **Voyin**. Cada pasta representa um domínio funcional isolado e bem definido, utilizado tanto pela interface de terminal (CLI) quanto pela futura interface gráfica (GUI).

---

## 📦 Módulos Disponíveis

| Módulo                     | Descrição                                                                 |
|----------------------------|---------------------------------------------------------------------------|
| [`duplicator`](./duplicator/README.md)     | 📄 Detecta arquivos duplicados por nome ou conteúdo e permite unificação |
| [`fileManager`](./fileManager/README.md)   | 📁 Manipula arquivos: mover, renomear, copiar, excluir                      |
| [`folderManager`](./folderManager/README.md) | 📂 Gerencia pastas: criação, exclusão, navegação interativa via terminal |
| [`organizer`](./organizer/README.md)       | 🧠 Analisa padrões e reorganiza automaticamente arquivos desorganizados   |
| [`reporter`](./reporter/README.md)         | 📊 Gera relatórios de arquivos: tipos, tamanhos, datas de modificação     |

---

## 🔧 Como utilizar

Você pode importar os módulos separadamente em qualquer parte do projeto:

```ts
import { moveFile } from '@voyin/core/fileManager'
import { analyzeFolderPattern } from '@voyin/core/organizer'
```

Cada módulo possui um `README.md` específico com instruções detalhadas de uso e exemplos práticos. Basta acessar os links acima.

---

## 📁 Estrutura do diretório

```
core/
├── duplicator/        # Detecta e unifica arquivos duplicados
├── fileManager/       # Manipulação de arquivos
├── folderManager/     # Criação, deleção e navegação entre pastas
├── organizer/         # Organização automática de arquivos
├── reporter/          # Geração de relatórios sobre arquivos
└── README.md          # Este arquivo
```

---

## 🧭 Navegação entre pacotes da plataforma

| Pacote         | Descrição                                                                |
|----------------|--------------------------------------------------------------------------|
| [`@voyin/cli`](../cli/README.md)       | Interface de linha de comando para uso das ferramentas core |
| [`@voyin/gui`](../gui/README.md)       | Interface gráfica do Voyin com recursos visuais e operacionais |
| [`@voyin/core`](./README.md)           | ✅ Módulos reutilizáveis com lógica pura e testável          |

---

## 👨‍💻 Contribuindo

Para desenvolver ou estender este núcleo:

```bash
cd packages/core
npm install
npm run dev
```

---

## 📄 Licença

MIT – Diego Herold © 2025