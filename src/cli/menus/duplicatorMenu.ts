import inquirer from 'inquirer'
import chalk from 'chalk'
import {
  handleFindDuplicateNames,
  handleFindDuplicateContents,
  handleDeleteDuplicates,
  handleGroupDuplicates
} from '../actions/duplicatorActions'

export async function showDuplicatorMenu(): Promise<void> {
  while (true) {
    const { action } = await inquirer.prompt({
      type: 'list',
      name: 'action',
      message: chalk.yellow('Duplicados > Escolha uma ação'),
      choices: [
        { name: 'Encontrar duplicados (nome)', value: 'names' },
        { name: 'Encontrar duplicados (conteúdo)', value: 'contents' },
        { name: 'Deletar duplicados', value: 'delete' },
        { name: 'Agrupar duplicados', value: 'group' },
        new inquirer.Separator(),
        { name: 'Voltar', value: 'back' }
      ]
    })

    switch (action) {
      case 'names':
        await handleFindDuplicateNames()
        break
      case 'contents':
        await handleFindDuplicateContents()
        break
      case 'delete':
        await handleDeleteDuplicates()
        break
      case 'group':
        await handleGroupDuplicates()
        break
      case 'back':
        return
    }
  }
}
