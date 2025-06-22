import fs from 'fs-extra'
import path from 'path'
import inquirer from 'inquirer'

/**
 * Navega dinamicamente pelo sistema de arquivos até o usuário escolher uma pasta ou arquivo.
 * @param tipo 'arquivo' | 'pasta'
 * @param mensagem Mensagem exibida no topo
 */
export async function navigateFolders(
  tipo: 'arquivo' | 'pasta' = 'pasta',
  mensagem = 'Selecione um caminho:'
): Promise<string> {
  let currentPath = process.cwd()

  while (true) {
    const itens = await fs.readdir(currentPath, { withFileTypes: true })

    const opcoes = [
      ...(currentPath !== path.parse(currentPath).root ? ['⬅ Voltar'] : []),
      ...(tipo === 'pasta' ? ['✅ Usar esta pasta'] : []),
      ...itens.map((item) =>
        item.isDirectory() ? `📁 ${item.name}` : `📄 ${item.name}`
      )
    ]

    const { escolha } = await inquirer.prompt({
      type: 'list',
      name: 'escolha',
      message: `${mensagem}\n📂 ${currentPath}`,
      pageSize: 20,
      choices: opcoes
    })

    if (escolha === '⬅ Voltar') {
      currentPath = path.dirname(currentPath)
      continue
    }

    if (escolha === '✅ Usar esta pasta') {
      return currentPath
    }

    const selecionado = escolha.replace(/^📁 |^📄 /, '')
    const caminhoSelecionado = path.join(currentPath, selecionado)
    const stat = await fs.stat(caminhoSelecionado)

    if (stat.isDirectory()) {
      currentPath = caminhoSelecionado
    } else if (tipo === 'arquivo' && stat.isFile()) {
      return caminhoSelecionado
    }
  }
}
