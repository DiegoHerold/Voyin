import inquirer from 'inquirer'
import chalk from 'chalk'
import { handleOrganizeByExtension, handleAnalyzePattern } from '../actions/organizerActions'

export async function showOrganizerMenu(): Promise<void> {
  while (true) {
    const { action } = await inquirer.prompt({
      type: 'list',
      name: 'action',
      message: chalk.yellow('Organizador > Escolha uma ação'),
      choices: [
        { name: 'Organizar por extensão', value: 'ext' },
        { name: 'Analisar padrão', value: 'analyze' },
        new inquirer.Separator(),
        { name: 'Voltar', value: 'back' }
      ]
    })

    switch (action) {
      case 'ext':
        await handleOrganizeByExtension()
        break
      case 'analyze':
        await handleAnalyzePattern()
        break
      case 'back':
        return
    }
  }
}
