import inquirer from 'inquirer'
import chalk from 'chalk'
import { createFile } from '../../src/core/fileManager/createFile.js'
import { readFile } from '../../src/core/fileManager/readFile.js'
import { renameFile } from '../../src/core/fileManager/renameFile.js'
import { moveFile } from '../../src/core/fileManager/moveFile.js'
import { copyFile } from '../../src/core/fileManager/copyFile.js'
import { deleteFile } from '../../src/core/fileManager/deleteFile.js'
import { convertFile } from '../../src/core/fileManager/convertFile.js'
import { navigateFolders } from '../helpers/navigateFolders.js'

export async function handleCreateFile() {
  const path = await navigateFolders('pasta', '📂 Escolha a pasta onde o arquivo será criado:')
  const { content } = await inquirer.prompt([
    { type: 'input', name: 'content', message: 'Conteúdo inicial (opcional):', default: '' }
  ])
  try {
    const created = await createFile(path, content)
    console.log(chalk.green(`Criado: ${created}`))
  } catch (err) {
    console.error(chalk.red((err as Error).message))
  }
}

export async function handleReadFile() {
  const path = await navigateFolders('arquivo', '📄 Selecione o arquivo a ser lido:')
  try {
    const data = await readFile(path)
    console.log(chalk.blue('\n' + data + '\n'))
  } catch (err) {
    console.error(chalk.red((err as Error).message))
  }
}

export async function handleRenameFile() {
  const path = await navigateFolders('arquivo', '📄 Selecione o arquivo a ser renomeado:')
  const { name } = await inquirer.prompt([
    { type: 'input', name: 'name', message: 'Novo nome:' }
  ])
  try {
    const newPath = await renameFile(path, name)
    console.log(chalk.green(`Renomeado para ${newPath}`))
  } catch (err) {
    console.error(chalk.red((err as Error).message))
  }
}

export async function handleMoveFile() {
  const path = await navigateFolders('arquivo', '📄 Selecione o arquivo a mover:')
  const dest = await navigateFolders('pasta', '📂 Selecione a pasta destino:')
  try {
    const moved = await moveFile(path, dest)
    console.log(chalk.green(`Movido para ${moved}`))
  } catch (err) {
    console.error(chalk.red((err as Error).message))
  }
}

export async function handleCopyFile() {
  const path = await navigateFolders('arquivo', '📄 Selecione o arquivo a copiar:')
  const dest = await navigateFolders('pasta', '📂 Selecione a pasta destino:')
  try {
    const copied = await copyFile(path, dest)
    console.log(chalk.green(`Copiado para ${copied}`))
  } catch (err) {
    console.error(chalk.red((err as Error).message))
  }
}

export async function handleDeleteFile() {
  const path = await navigateFolders('arquivo', '📄 Selecione o arquivo a excluir:')
  try {
    await deleteFile(path)
    console.log(chalk.green('Arquivo excluído'))
  } catch (err) {
    console.error(chalk.red((err as Error).message))
  }
}

export async function handleConvertFile() {
  const input = await navigateFolders('arquivo', '📄 Selecione o arquivo de origem para conversão:')
  const { output, type } = await inquirer.prompt([
    { type: 'input', name: 'output', message: '📁 Caminho do arquivo de destino:' },
    {
      type: 'list',
      name: 'type',
      message: '🔄 Tipo de conversão:',
      choices: ['pdfToPng', 'pdfToWord', 'wordToPdf', 'excelToPdf', 'txtToPdf']
    }
  ])
  try {
    await convertFile({ input, output, type })
    console.log(chalk.green('Conversão concluída'))
  } catch (err) {
    console.error(chalk.red((err as Error).message))
  }
}
