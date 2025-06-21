import inquirer from 'inquirer'
import chalk from 'chalk'
import { menus } from './menuData.js'

export async function navigateMenu(
  menuKey: string = 'main',
  history: string[] = []
): Promise<void> {
  const menu = menus[menuKey]
  if (!menu) {
    console.log(chalk.red('Menu não encontrado.'))
    return
  }

  console.clear()
  const breadcrumb = ['Voyin', ...history.map(k => menus[k].label), menu.label].join(
    chalk.gray(' » ')
  )
  console.log(chalk.magentaBright.bold(breadcrumb))

  const { option } = await inquirer.prompt([
    {
      type: 'list',
      name: 'option',
      message: chalk.bold(menu.message),
      choices: menu.options.map(o => ({ name: o.name, value: o.value }))
    }
  ])

  const choice = menu.options.find(c => c.value === option)
  if (!choice) return

  if (choice.action) {
    await choice.action()
  }

  if (choice.next === 'exit') {
    console.log(chalk.green('Até logo!'))
    return
  }

  if (choice.next === '..') {
    const prev = history.pop() || 'main'
    await navigateMenu(prev, history)
    return
  }

  if (choice.next) {
    history.push(menuKey)
    await navigateMenu(choice.next, history)
    return
  }

  await navigateMenu(menuKey, history)
}
