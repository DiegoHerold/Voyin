import inquirer from 'inquirer'
import chalk from 'chalk'
import { createFolder } from '../../src/core/folderManager/createFolder.js'
import { listFolder } from '../../src/core/folderManager/listFolder.js'
import { renameFolder } from '../../src/core/folderManager/renameFolder.js'
import { moveFolder } from '../../src/core/folderManager/moveFolder.js'
import { copyFolder } from '../../src/core/folderManager/copyFolder.js'
import { deleteFolder } from '../../src/core/folderManager/deleteFolder.js'
import { navigateFolders } from '../helpers/navigateFolders.js'

export async function handleCreateFolder() {
  const path = await navigateFolders('pasta', '📁 Selecione o local onde criar a nova pasta:')
  try {
    const created = await createFolder(path)
    console.log(chalk.green(`✅ Pasta criada em: ${created}`))
  } catch (err) {
    console.error(chalk.red((err as Error).message))
  }
}

export async function handleListFolder() {
  const path = await navigateFolders('pasta', '📁 Selecione a pasta para listar:')
  try {
    const items = await listFolder(path)
    console.log(chalk.blue(`\n📂 Conteúdo de ${path}:\n` + items.join('\n')))
  } catch (err) {
    console.error(chalk.red((err as Error).message))
  }
}

export async function handleRenameFolder() {
  const path = await navigateFolders('pasta', '📁 Selecione a pasta a ser renomeada:')
  const { name } = await inquirer.prompt([
    { type: 'input', name: 'name', message: '✏️ Novo nome da pasta:' }
  ])
  try {
    const newPath = await renameFolder(path, name)
    console.log(chalk.green(`✅ Pasta renomeada para: ${newPath}`))
  } catch (err) {
    console.error(chalk.red((err as Error).message))
  }
}

export async function handleMoveFolder() {
  const path = await navigateFolders('pasta', '📁 Selecione a pasta a mover:')
  const dest = await navigateFolders('pasta', '📂 Selecione a pasta de destino:')
  try {
    const moved = await moveFolder(path, dest)
    console.log(chalk.green(`✅ Pasta movida para: ${moved}`))
  } catch (err) {
    console.error(chalk.red((err as Error).message))
  }
}

export async function handleCopyFolder() {
  const path = await navigateFolders('pasta', '📁 Selecione a pasta a copiar:')
  const dest = await navigateFolders('pasta', '📂 Selecione a pasta de destino:')
  try {
    const copied = await copyFolder(path, dest)
    console.log(chalk.green(`✅ Pasta copiada para: ${copied}`))
  } catch (err) {
    console.error(chalk.red((err as Error).message))
  }
}

export async function handleDeleteFolder() {
  const path = await navigateFolders('pasta', '📁 Selecione a pasta a excluir:')
  try {
    await deleteFolder(path)
    console.log(chalk.green('✅ Pasta excluída com sucesso'))
  } catch (err) {
    console.error(chalk.red((err as Error).message))
  }
}
