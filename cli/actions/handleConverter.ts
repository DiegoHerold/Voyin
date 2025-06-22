import inquirer from 'inquirer'
import chalk from 'chalk'
import { convertFile } from '../../src/core/fileManager/index.js'

export async function handleConverter(): Promise<void> {
  const { input, output, type } = await inquirer.prompt([
    { type: 'input', name: 'input', message: 'Arquivo de entrada:' },
    { type: 'input', name: 'output', message: 'Arquivo de saída:' },
    {
      type: 'list',
      name: 'type',
      message: 'Tipo de conversão:',
      choices: ['pdfToPng', 'pdfToWord', 'wordToPdf', 'excelToPdf', 'txtToPdf']
    }
  ])

  try {
    await convertFile({ input, output, type })
    console.log(chalk.green('✅ Conversão concluída.'))
  } catch (err) {
    console.log(chalk.red(`Erro: ${(err as Error).message}`))
  }
}
