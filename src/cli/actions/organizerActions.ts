import inquirer from 'inquirer'
import chalk from 'chalk'
import { organizeByExtension, analyzeFolderPattern } from '../../core/organizer'

export async function handleOrganizeByExtension() {
  const { path } = await inquirer.prompt({ name: 'path', message: 'Pasta a organizar:' })
  try {
    await organizeByExtension(path)
  } catch (err) {
    console.error(chalk.red((err as Error).message))
  }
}

export async function handleAnalyzePattern() {
  const { path } = await inquirer.prompt({ name: 'path', message: 'Pasta a analisar:' })
  try {
    const result = analyzeFolderPattern(path)
    console.log(chalk.blue(JSON.stringify(result, null, 2)))
  } catch (err) {
    console.error(chalk.red((err as Error).message))
  }
}
