import inquirer from 'inquirer'
import chalk from 'chalk'
import { showMainMenu } from './mainMenu.js'
import {
  handleCreateFile,
  handleReadFile,
  handleRenameFile,
  handleMoveFile,
  handleCopyFile,
  handleDeleteFile,
  handleConvertFile,
  handleUpdateFile
} from '../actions/fileActions.js' 

export async function showFileMenu(): Promise<void> {
  console.clear()
  console.log(chalk.bold.cyan('\n📁 Gerenciar Arquivos\n'))

  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: chalk.bold('O que deseja fazer?'),
      pageSize: 20,
      choices: [
        { name: '📄 Criar Arquivo', value: 'create' },
        { name: '📖 Ler Arquivo', value: 'read' },
        { name: '✏️  Renomear Arquivo', value: 'rename' },
        { name: '🚚 Mover Arquivo', value: 'move' },
        { name: '📋 Copiar Arquivo', value: 'copy' },
        { name: '🗑️  Excluir Arquivo', value: 'delete' },
        { name: chalk.gray('🔁 Converter Arquivo (em breve...)'), value: 'disabled' },
        { name: '✍️  Atualizar Arquivo', value: 'update' }, 
        new inquirer.Separator(),
        { name: '⬅️  Voltar ao menu principal', value: 'back' }
      ]
    }
  ])

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
    case 'update':
      await handleUpdateFile()
      break
    case 'back':
    case 'disabled':
      console.log(chalk.yellow('\n⚠️  Esta funcionalidade estará disponível em breve!\n'))
      await pause()
      return showFileMenu
      ()
    default:
      return showMainMenu()
  }

  await pause()
  return showFileMenu()
}

async function pause() {
  await inquirer.prompt([
    {
      type: 'input',
      name: 'continue',
      message: chalk.gray('\nPressione [Enter] para continuar...')
    }
  ])
}
