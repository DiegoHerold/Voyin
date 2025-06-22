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

export async function showFolderMenu(): Promise<void> {
  while (true) {
    const { action } = await inquirer.prompt({
      type: 'list',
      name: 'action',
      message: chalk.yellow('Pastas > Escolha uma ação'),
      choices: [
        { name: 'Criar pasta', value: 'create' },
        { name: 'Listar pasta', value: 'list' },
        { name: 'Renomear pasta', value: 'rename' },
        { name: 'Mover pasta', value: 'move' },
        { name: 'Copiar pasta', value: 'copy' },
        { name: 'Excluir pasta', value: 'delete' },
        new inquirer.Separator(),
        { name: 'Voltar', value: 'back' }
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
        return
    }
  }
}
