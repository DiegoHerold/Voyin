import inquirer from 'inquirer'
import chalk from 'chalk'
import path from 'path'
import { createFolder } from '../../src/core/folderManager/createFolder.js'
import { listFolder, listFlatPaths } from '../../src/core/folderManager/listFolder.js'
import { renameFolder } from '../../src/core/folderManager/renameFolder.js'
import { moveFolder } from '../../src/core/folderManager/moveFolder.js'
import { copyFolder } from '../../src/core/folderManager/copyFolder.js'
import { deleteFolder } from '../../src/core/folderManager/deleteFolder.js'
import { navigateFolders } from '../helpers/navigateFolders.js'
import { selectMultipleFromFolder } from '../helpers/selectMultipleFromFolder.js'

export async function handleCreateFolder() {
  try {
    const basePath = await navigateFolders('pasta', '📁 Selecione o local onde deseja criar a nova pasta:')
    
    const { nome } = await inquirer.prompt({
      type: 'input',
      name: 'nome',
      message: '📛 Nome da nova pasta:',
      validate: input => input.trim() !== '' || 'O nome não pode ser vazio.'
    })

    const fullPath = path.join(basePath, nome)
    const criada = await createFolder(fullPath)

    console.log(chalk.green(`✅ Pasta criada em: ${criada}`))
  } catch (error) {
    console.error(chalk.red(`❌ Falha ao criar pasta: ${(error as Error).message}`))
  }
}

export async function handleListFolder() {
  const path = await navigateFolders('pasta', '📁 Selecione a pasta para listar:')

  const { modo, profundidade } = await inquirer.prompt([
    {
      type: 'list',
      name: 'modo',
      message: 'Como deseja exibir os itens?',
      choices: [
        { name: '🎨 Formato bonito com emojis', value: 'formatado' },
        { name: '📁 Caminho completo', value: 'caminho' }
      ]
    },
    {
      type: 'number',
      name: 'profundidade',
      message: '🔢 Profundidade máxima (ex: 5):',
      default: 5,
      validate: (input) =>
        Number.isInteger(input) && input > 0 || 'Informe um número inteiro positivo.'
    }
  ])

  try {
    let items: string[] = []
    if (modo === 'formatado') {
      items = await listFolder(path, false, 0, profundidade)
    } else {
      const allPaths = await listFlatPaths(path)
      items = allPaths.filter(p => {
        const relative = p.replace(path, '')
        const depth = relative.split(/[\\/]/).filter(Boolean).length
        return depth <= profundidade
      })
    }

    if (items.length === 0) {
      console.log(chalk.yellow('⚠️ Nenhum item encontrado.'))
      return
    }

    console.log(chalk.blue(`\n📂 Conteúdo de ${path}:\n`))
    for (const item of items) {
      console.log('•', item)
    }
  } catch (err) {
    console.error(chalk.red(`❌ Erro: ${(err as Error).message}`))
  }
}

export async function handleRenameFolder(): Promise<void> {
  // Seleciona a pasta original
  const currentPath = await navigateFolders('pasta', '📁 Selecione a pasta a ser renomeada:')

  // Pergunta o novo nome
  const { name } = await inquirer.prompt([
    { type: 'input', name: 'name', message: '✏️ Novo nome da pasta:' }
  ])

  // Caminho do novo nome (mantendo o mesmo diretório)
  const newPath = path.join(path.dirname(currentPath), name)

  try {
    const resultado = await renameFolder(currentPath, name)
    console.log(chalk.green(`✅ Pasta renomeada para: ${resultado}`))
  } catch (err) {
    console.error(chalk.red(`❌ Falha ao renomear: ${(err as Error).message}`))
  }
}

export async function handleMoveFolder() {
  const pastas = await selectMultipleFromFolder('pasta', '📁 Selecione as pastas que deseja mover:')
  if (pastas.length === 0) return

  const destino = await navigateFolders('pasta', '📂 Selecione a pasta de destino:')
  try {
    for (const pasta of pastas) {
      const moved = await moveFolder(pasta, destino)
      console.log(chalk.green(`✅ Pasta movida para: ${moved}`))
    }
  } catch (err) {
    console.error(chalk.red(`❌ Erro ao mover pastas: ${(err as Error).message}`))
  }
}

export async function handleCopyFolder() {
  const pastas = await selectMultipleFromFolder('pasta', '📁 Selecione as pastas que deseja copiar:')
  if (pastas.length === 0) return

  const destino = await navigateFolders('pasta', '📂 Selecione a pasta de destino:')
  try {
    for (const pasta of pastas) {
      const copied = await copyFolder(pasta, destino)
      console.log(chalk.green(`✅ Pasta copiada para: ${copied}`))
    }
  } catch (err) {
    console.error(chalk.red(`❌ Erro ao copiar pastas: ${(err as Error).message}`))
  }
}

export async function handleDeleteFolder() {
  const pastas = await selectMultipleFromFolder('pasta', '🗑️ Selecione as pastas que deseja excluir:')
  if (pastas.length === 0) return

  try {
    await deleteFolder(pastas)
    console.log(chalk.green('✅ Pastas excluídas com sucesso'))
  } catch (err) {
    console.error(chalk.red(`❌ Erro ao excluir pastas: ${(err as Error).message}`))
  }
}

