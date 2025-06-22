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
    console.log(chalk.green(`Criada: ${created}`))
  } catch (err) {
    console.error(chalk.red((err as Error).message))
  }
}

export async function handleListFolder() {
  const path = await navigateFolders('pasta', '📁 Selecione a pasta para listar:')
  try {
    const items = await listFolder(path)
    console.log(chalk.blue(items.join('\n')))
  } catch (err) {
    console.error(chalk.red((err as Error).message))
  }
}

export async function handleRenameFolder() {
  const path = await navigateFolders('pasta', '📁 Selecione a pasta a ser renomeada:')
  const { name } = await inquirer.prompt([
    { type: 'input', name: 'name', message: 'Novo nome:' }
  ])
  try {
    const newPath = await renameFolder(path, name)
    console.log(chalk.green(`Renomeada para ${newPath}`))
  } catch (err) {
    console.error(chalk.red((err as Error).message))
  }
}

export async function handleMoveFolder() {
  const path = await navigateFolders('pasta', '📁 Selecione a pasta de origem:')
  const dest = await navigateFolders('pasta', '📂 Selecione o destino:')
  try {
    const moved = await moveFolder(path, dest)
    console.log(chalk.green(`Movida para ${moved}`))
  } catch (err) {
    console.error(chalk.red((err as Error).message))
  }
}

export async function handleCopyFolder() {
  const path = await navigateFolders('pasta', '📁 Selecione a pasta de origem:')
  const dest = await navigateFolders('pasta', '📂 Selecione o destino:')
  try {
    const copied = await copyFolder(path, dest)
    console.log(chalk.green(`Copiada para ${copied}`))
  } catch (err) {
    console.error(chalk.red((err as Error).message))
  }
}

export async function handleDeleteFolder() {
  const path = await navigateFolders('pasta', '📁 Selecione a pasta a excluir:')
  try {
    await deleteFolder(path)
    console.log(chalk.green('Pasta excluída'))
  } catch (err) {
    console.error(chalk.red((err as Error).message))
  }
}
