import inquirer from 'inquirer'
import chalk from 'chalk'
import {
  handleCreateFile,
  handleReadFile,
  handleRenameFile,
  handleMoveFile,
  handleCopyFile,
  handleDeleteFile,
  handleConvertFile
} from '../actions/fileActions'

export async function showFileMenu(): Promise<void> {
  while (true) {
    const { action } = await inquirer.prompt({
      type: 'list',
      name: 'action',
      message: chalk.yellow('Arquivos > Escolha uma ação'),
      choices: [
        { name: 'Criar arquivo', value: 'create' },
        { name: 'Ler arquivo', value: 'read' },
        { name: 'Renomear arquivo', value: 'rename' },
        { name: 'Mover arquivo', value: 'move' },
        { name: 'Copiar arquivo', value: 'copy' },
        { name: 'Excluir arquivo', value: 'delete' },
        { name: 'Converter arquivo', value: 'convert' },
        new inquirer.Separator(),
        { name: 'Voltar', value: 'back' }
      ]
    })

    switch (action) {
      case 'create':
        await handleCreateFile()
        break
      case 'read':
        await handleReadFile()
        break
      case 'rename':
        await handleRenameFile()
        break
      case 'move':
        await handleMoveFile()
        break
      case 'copy':
        await handleCopyFile()
        break
      case 'delete':
        await handleDeleteFile()
        break
      case 'convert':
        await handleConvertFile()
        break
      case 'back':
        return
    }
  }
}
