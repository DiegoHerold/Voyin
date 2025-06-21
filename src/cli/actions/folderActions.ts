import inquirer from 'inquirer'
import chalk from 'chalk'
import {
  createFolder,
  listFolder,
  renameFolder,
  moveFolder,
  copyFolder,
  deleteFolder
} from '../../core/folderManager'

export async function handleCreateFolder() {
  const { path } = await inquirer.prompt({ name: 'path', message: 'Caminho da nova pasta:' })
  try {
    const created = await createFolder(path)
    console.log(chalk.green(`Criada: ${created}`))
  } catch (err) {
    console.error(chalk.red((err as Error).message))
  }
}

export async function handleListFolder() {
  const { path } = await inquirer.prompt({ name: 'path', message: 'Pasta a listar:' })
  try {
    const items = await listFolder(path)
    console.log(chalk.blue(items.join('\n')))
  } catch (err) {
    console.error(chalk.red((err as Error).message))
  }
}

export async function handleRenameFolder() {
  const { path, name } = await inquirer.prompt([
    { name: 'path', message: 'Pasta a renomear:' },
    { name: 'name', message: 'Novo nome:' }
  ])
  try {
    const newPath = await renameFolder(path, name)
    console.log(chalk.green(`Renomeada para ${newPath}`))
  } catch (err) {
    console.error(chalk.red((err as Error).message))
  }
}

export async function handleMoveFolder() {
  const { path, dest } = await inquirer.prompt([
    { name: 'path', message: 'Pasta de origem:' },
    { name: 'dest', message: 'Destino:' }
  ])
  try {
    const moved = await moveFolder(path, dest)
    console.log(chalk.green(`Movida para ${moved}`))
  } catch (err) {
    console.error(chalk.red((err as Error).message))
  }
}

export async function handleCopyFolder() {
  const { path, dest } = await inquirer.prompt([
    { name: 'path', message: 'Pasta de origem:' },
    { name: 'dest', message: 'Destino:' }
  ])
  try {
    const copied = await copyFolder(path, dest)
    console.log(chalk.green(`Copiada para ${copied}`))
  } catch (err) {
    console.error(chalk.red((err as Error).message))
  }
}

export async function handleDeleteFolder() {
  const { path } = await inquirer.prompt({ name: 'path', message: 'Pasta a excluir:' })
  try {
    await deleteFolder(path)
    console.log(chalk.green('Pasta excluída'))
  } catch (err) {
    console.error(chalk.red((err as Error).message))
  }
}
