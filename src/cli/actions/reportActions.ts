import inquirer from 'inquirer'
import chalk from 'chalk'
import { generateFullReport } from '../../core/reporter'

export async function handleGenerateReport() {
  const { path } = await inquirer.prompt({ name: 'path', message: 'Pasta para relatório:' })
  try {
    await generateFullReport(path)
  } catch (err) {
    console.error(chalk.red((err as Error).message))
  }
}
