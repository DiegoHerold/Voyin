import inquirer from 'inquirer'
import chalk from 'chalk'
import {
  createFile,
  readFile,
  renameFile,
  moveFile,
  copyFile,
  deleteFile,
  convertFile
} from '../../core/fileManager'

export async function handleCreateFile() {
  const { path, content } = await inquirer.prompt([
    { name: 'path', message: 'Caminho do novo arquivo:' },
    { name: 'content', message: 'Conteúdo inicial (opcional):', default: '' }
  ])

  try {
    const created = await createFile(path, content)
    console.log(chalk.green(`Criado: ${created}`))
  } catch (err) {
    console.error(chalk.red((err as Error).message))
  }
}

export async function handleReadFile() {
  const { path } = await inquirer.prompt({ name: 'path', message: 'Arquivo a ler:' })
  try {
    const data = await readFile(path)
    console.log(chalk.blue('\n' + data + '\n'))
  } catch (err) {
    console.error(chalk.red((err as Error).message))
  }
}

export async function handleRenameFile() {
  const { path, name } = await inquirer.prompt([
    { name: 'path', message: 'Arquivo a renomear:' },
    { name: 'name', message: 'Novo nome:' }
  ])
  try {
    const newPath = await renameFile(path, name)
    console.log(chalk.green(`Renomeado para ${newPath}`))
  } catch (err) {
    console.error(chalk.red((err as Error).message))
  }
}

export async function handleMoveFile() {
  const { path, dest } = await inquirer.prompt([
    { name: 'path', message: 'Arquivo de origem:' },
    { name: 'dest', message: 'Pasta destino:' }
  ])
  try {
    const moved = await moveFile(path, dest)
    console.log(chalk.green(`Movido para ${moved}`))
  } catch (err) {
    console.error(chalk.red((err as Error).message))
  }
}

export async function handleCopyFile() {
  const { path, dest } = await inquirer.prompt([
    { name: 'path', message: 'Arquivo de origem:' },
    { name: 'dest', message: 'Pasta destino:' }
  ])
  try {
    const copied = await copyFile(path, dest)
    console.log(chalk.green(`Copiado para ${copied}`))
  } catch (err) {
    console.error(chalk.red((err as Error).message))
  }
}

export async function handleDeleteFile() {
  const { path } = await inquirer.prompt({ name: 'path', message: 'Arquivo a excluir:' })
  try {
    await deleteFile(path)
    console.log(chalk.green('Arquivo excluído'))
  } catch (err) {
    console.error(chalk.red((err as Error).message))
  }
}

export async function handleConvertFile() {
  const { input, output, type } = await inquirer.prompt([
    { name: 'input', message: 'Arquivo de origem:' },
    { name: 'output', message: 'Arquivo de destino:' },
    {
      type: 'list',
      name: 'type',
      message: 'Tipo de conversão:',
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
