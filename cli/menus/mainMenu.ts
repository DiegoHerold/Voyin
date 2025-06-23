import inquirer from 'inquirer'
import chalk from 'chalk'

import { showFileMenu } from './fileMenu.js'
import { showFolderMenu } from './folderMenu.js'
import { showOrganizerMenu } from './organizerMenu.js'
import { showReportMenu } from './reportMenu.js'
import { showDuplicatorMenu } from './duplicatorMenu.js'
import { showExtraMenu } from './extraMenu.js'
import { showSettingsMenu } from './settings/settingsMenu.js' 

export async function showMainMenu(): Promise<void> {
  console.clear()
  console.log(chalk.bold.cyan('\n📦 Voyin - Gerenciador de Arquivos\n'))

  const choices = [
    { name: '📁 Gerenciar Arquivos', value: 'file' },
    { name: '📂 Gerenciar Pastas', value: 'folder' },
    { name: '🧠 Organizar Arquivos', value: 'organizer' },
    { name: '📊 Relatórios', value: 'report' },
    { name: '♻️  Detectar Duplicados', value: 'duplicator' },
    { name: '🛠️  Extras', value: 'extras' },
    { name: '⚙️  Configurações', value: 'settings' },
    { name: chalk.red('❌ Sair'), value: 'exit' }
  ]

  const { option } = await inquirer.prompt([
    {
      type: 'list',
      name: 'option',
      message: chalk.bold('Selecione uma opção:'),
      pageSize: 20,
      choices
    }
  ])

  switch (option) {
    case 'file':
      return showFileMenu()
    case 'folder':
      return showFolderMenu()
    case 'organizer':
      return showOrganizerMenu()
    case 'report':
      return showReportMenu()
    case 'duplicator':
      return showDuplicatorMenu()
    case 'extras':
      return showExtraMenu()
    case 'settings':
      return showSettingsMenu()
    case 'exit':
      console.log(chalk.green('\nAté logo!\n'))
      process.exit()
    default:
      console.log(chalk.yellow('\n⚠️  Esta funcionalidade estará disponível em breve!\n'))
      await pause()
      return showMainMenu()
  }
}

async function pause() {
  await inquirer.prompt([
    {
      type: 'input',
      name: 'continue',
      message: chalk.gray('Pressione [Enter] para voltar ao menu...')
    }
  ])
}
