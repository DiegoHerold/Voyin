import chalk from 'chalk'
import { generateFullReport } from '../../src/core/reporter/generateFullReport.js'
import { navigateFolders } from '../helpers/navigateFolders.js'

export async function handleGenerateReport() {
  const path = await navigateFolders('pasta', '📊 Selecione a pasta para gerar o relatório:')
  try {
    await generateFullReport(path)
  } catch (err) {
    console.error(chalk.red((err as Error).message))
  }
}
