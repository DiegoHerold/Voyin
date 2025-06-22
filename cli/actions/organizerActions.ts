import chalk from 'chalk'
import { organizeByExtension } from '../../src/core/organizer/organizeByExtension.js'
import { analyzeFolderPattern } from '../../src/core/organizer/analyzeFolderPattern.js'
import { navigateFolders } from '../helpers/navigateFolders.js'

export async function handleOrganizeByExtension() {
  const path = await navigateFolders('pasta', '📂 Selecione a pasta para organizar por extensão:')
  try {
    await organizeByExtension(path)
  } catch (err) {
    console.error(chalk.red((err as Error).message))
  }
}

export async function handleAnalyzePattern() {
  const path = await navigateFolders('pasta', '🔍 Selecione a pasta para analisar o padrão:')
  try {
    const result = analyzeFolderPattern(path)
    console.log(chalk.blue(JSON.stringify(result, null, 2)))
  } catch (err) {
    console.error(chalk.red((err as Error).message))
  }
}
