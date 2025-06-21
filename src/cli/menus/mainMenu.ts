import inquirer from 'inquirer'
import chalk from 'chalk'
import { showFileMenu } from './fileMenu'
import { showFolderMenu } from './folderMenu'
import { showOrganizerMenu } from './organizerMenu'
import { showDuplicatorMenu } from './duplicatorMenu'
import { showReportMenu } from './reportMenu'

export async function showMainMenu(): Promise<void> {
  while (true) {
    const { option } = await inquirer.prompt({
      type: 'list',
      name: 'option',
      message: chalk.cyanBright('=== VOYIN CLI ==='),
      choices: [
        { name: 'Gerenciar Arquivos', value: 'files' },
        { name: 'Gerenciar Pastas', value: 'folders' },
        { name: 'Organizador', value: 'organizer' },
        { name: 'Duplicados', value: 'duplicator' },
        { name: 'Relatórios', value: 'reports' },
        new inquirer.Separator(),
        { name: chalk.red('Sair'), value: 'exit' }
      ]
    })

    switch (option) {
      case 'files':
        await showFileMenu()
        break
      case 'folders':
        await showFolderMenu()
        break
      case 'organizer':
        await showOrganizerMenu()
        break
      case 'duplicator':
        await showDuplicatorMenu()
        break
      case 'reports':
        await showReportMenu()
        break
      case 'exit':
        console.log(chalk.green('Até logo!'))
        return
    }
  }
}
