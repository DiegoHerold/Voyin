import inquirer from 'inquirer'
import chalk from 'chalk'
import { generateFullReport } from '../../src/core/reporter/index.js'

export async function handleReport(): Promise<void> {
  const { dir } = await inquirer.prompt({
    type: 'input',
    name: 'dir',
    message: 'Diretório para gerar relatório:'
  })

  try {
    await generateFullReport(dir)
  } catch (err) {
    console.log(chalk.red(`Erro: ${(err as Error).message}`))
  }
}
