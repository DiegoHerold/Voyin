import inquirer from 'inquirer'
import chalk from 'chalk'
import {
  handleCreateFolder,
  handleListFolder,
  handleRenameFolder,
  handleMoveFolder,
  handleCopyFolder,
  handleDeleteFolder
} from '../actions/folderActions.js'
import { showMainMenu } from './mainMenu.js'

export async function showFolderMenu(): Promise<void> {
  while (true) {
    console.clear()
    console.log(chalk.bold('\n📂 Gerenciar Pastas\n'))

    const { action } = await inquirer.prompt({
      type: 'list',
      name: 'action',
      message: 'Escolha uma ação:',
      pageSize: 20,
      choices: [
        { name: '📁 Criar pasta', value: 'create' },
        { name: '📄 Listar conteúdo', value: 'list' },
        { name: '✏️  Renomear pasta', value: 'rename' },
        { name: '📤 Mover pasta', value: 'move' },
        { name: '📋 Copiar pasta', value: 'copy' },
        { name: '🗑️  Excluir pasta', value: 'delete' },
        new inquirer.Separator(),
        { name: '⬅️  Voltar ao menu principal', value: 'back' }
      ]
    })

    switch (action) {
      case 'create':
        await handleCreateFolder()
        break
      case 'list':
        await handleListFolder()
        break
      case 'rename':
        await handleRenameFolder()
        break
      case 'move':
        await handleMoveFolder()
        break
      case 'copy':
        await handleCopyFolder()
        break
      case 'delete':
        await handleDeleteFolder()
        break
      case 'back':
        await showMainMenu()
    }

    await inquirer.prompt([
      {
        type: 'input',
        name: 'continue',
        message: '\nPressione [Enter] para voltar ao menu...',
      }
    ])
  }
}
