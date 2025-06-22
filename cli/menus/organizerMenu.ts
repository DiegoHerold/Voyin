import inquirer from 'inquirer'
import chalk from 'chalk'
import { showMainMenu } from './mainMenu.js'
import {
  handleOrganizeByExtension,
  handleAnalyzePattern
} from '../actions/organizerActions.js'

export async function showOrganizerMenu(): Promise<void> {
  console.clear()
  console.log(chalk.bold.cyan('\n🧠 Organizador Inteligente\n'))

  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: chalk.bold('O que deseja fazer?'),
      choices: [
        { name: '🗂️ Organizar por extensão', value: 'organizeByExtension' },
        { name: '🔎 Analisar padrão de organização', value: 'analyzePattern' },
        new inquirer.Separator(),
        { name: '⬅️ Voltar ao menu principal', value: 'back' }
      ]
    }
  ])

  switch (action) {
    case 'organizeByExtension':
      await handleOrganizeByExtension()
      break
    case 'analyzePattern':
      await handleAnalyzePattern()
      break
    case 'back':
    default:
      return showMainMenu()
  }

  await pause()
  return showOrganizerMenu()
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
