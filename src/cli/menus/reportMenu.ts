import inquirer from 'inquirer'
import chalk from 'chalk'
import { handleGenerateReport } from '../actions/reportActions'

export async function showReportMenu(): Promise<void> {
  while (true) {
    const { action } = await inquirer.prompt({
      type: 'list',
      name: 'action',
      message: chalk.yellow('Relatórios > Escolha uma ação'),
      choices: [
        { name: 'Gerar relatório completo', value: 'full' },
        new inquirer.Separator(),
        { name: 'Voltar', value: 'back' }
      ]
    })

    switch (action) {
      case 'full':
        await handleGenerateReport()
        break
      case 'back':
        return
    }
  }
}
