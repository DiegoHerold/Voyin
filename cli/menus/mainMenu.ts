import inquirer from 'inquirer'
import chalk from 'chalk'

export async function displayMainMenu(): Promise<void> {
  const choices = [
    { name: '📁 Gerenciar Arquivos', value: 'file' },
    { name: '📂 Gerenciar Pastas', value: 'folder' },
    { name: '🧠 Organizar Arquivos', value: 'organizer' },
    { name: '📊 Relatórios', value: 'report' },
    { name: '♻️ Detectar Duplicados', value: 'duplicator' },
    { name: '🔁 Conversores', value: 'converter' },
    { name: '⚙️ Extras', value: 'extras' },
    { name: chalk.red('❌ Sair'), value: 'exit' }
  ]

  const { option } = await inquirer.prompt([
    {
      type: 'list',
      name: 'option',
      message: chalk.bold('Selecione uma opção:'),
      choices
    }
  ])

  switch (option) {
    case 'exit':
      console.log(chalk.green('Até logo!'))
      return
    default:
      console.log(chalk.yellow('Funcionalidade ainda não implementada.'))
      return displayMainMenu()
  }
}
