import inquirer from 'inquirer'
import chalk from 'chalk'
import { showMainMenu } from './mainMenu.js'
import { handleGenerateReport } from '../actions/reportActions.js'

export async function showReportMenu(): Promise<void> {
  console.clear()
  console.log(chalk.bold.cyan('\n📊 Relatórios de Pasta\n'))

  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: chalk.bold('O que deseja fazer?'),
      choices: [
        { name: '📄 Gerar relatório completo', value: 'generate' },
        new inquirer.Separator(),
        { name: '⬅️ Voltar ao menu principal', value: 'back' }
      ]
    }
  ])

  switch (action) {
    case 'generate':
      await handleGenerateReport()
      break
    case 'back':
    default:
      return showMainMenu()
  }

  await pause()
  return showReportMenu()
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
