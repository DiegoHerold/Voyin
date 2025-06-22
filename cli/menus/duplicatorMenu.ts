import inquirer from 'inquirer'
import chalk from 'chalk'
import { showMainMenu } from './mainMenu.js'
import {
  handleFindDuplicateNames,
  handleFindDuplicateContents,
  handleDeleteDuplicates,
  handleGroupDuplicates
} from '../actions/duplicatorActions.js'

export async function showDuplicatorMenu(): Promise<void> {
  console.clear()
  console.log(chalk.bold.cyan('\n♻️ Detectar Arquivos Duplicados\n'))

  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: chalk.bold('O que deseja fazer?'),
      choices: [
        { name: '🔍 Duplicados por nome', value: 'name' },
        { name: '🧬 Duplicados por conteúdo', value: 'content' },
        { name: '🗑️ Deletar duplicados', value: 'delete' },
        { name: '📁 Agrupar duplicados em pasta', value: 'group' },
        new inquirer.Separator(),
        { name: '⬅️ Voltar ao menu principal', value: 'back' }
      ]
    }
  ])

  switch (action) {
    case 'name':
      await handleFindDuplicateNames()
      break
    case 'content':
      await handleFindDuplicateContents()
      break
    case 'delete':
      await handleDeleteDuplicates()
      break
    case 'group':
      await handleGroupDuplicates()
      break
    case 'back':
    default:
      return showMainMenu()
  }

  await pause()
  return showDuplicatorMenu()
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
