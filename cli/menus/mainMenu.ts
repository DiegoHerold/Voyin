import inquirer from 'inquirer'
import chalk from 'chalk'

import { showFileMenu } from './fileMenu.js'
import { showFolderMenu } from './folderMenu.js'
import { showOrganizerMenu } from './organizerMenu.js'
import { showReportMenu } from './reportMenu.js'
import { showDuplicatorMenu } from './duplicatorMenu.js'
import { showExtraMenu } from './extraMenu.js' 

export async function showMainMenu(): Promise<void> {
  console.clear()
  console.log(chalk.bold.cyan('\n📦 Voyin - Gerenciador de Arquivos\n'))

  const choices = [
    { name: '📁 Gerenciar Arquivos', value: 'file' },
    { name: '📂 Gerenciar Pastas', value: 'folder' },
    { name: '🧠 Organizar Arquivos', value: 'organizer' },
    { name: '📊 Relatórios', value: 'report' },
    { name: '♻️  Detectar Duplicados', value: 'duplicator' },
    { name: '🔁 Conversores', value: 'converter' },
    { name: '⚙️  Extras', value: 'extras' },
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
    case 'converter':
      console.log(chalk.yellow('\n⚠️  Conversores ainda não foram implementados.\n'))
      await pause()
      return showMainMenu()
    case 'exit':
    default:
      console.log(chalk.green('\nAté logo!\n'))
      process.exit()
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
