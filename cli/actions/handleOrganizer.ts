import inquirer from 'inquirer'
import chalk from 'chalk'
import {
  organizeByExtension,
  analyzeFolderPattern
} from '../../src/core/organizer/index.js'

export async function handleOrganizer(): Promise<void> {
  while (true) {
    const { action } = await inquirer.prompt({
      type: 'list',
      name: 'action',
      message: 'Organização de arquivos:',
      choices: [
        { name: 'Organizar por extensão', value: 'byExt' },
        { name: 'Analisar padrão de pasta', value: 'analyze' },
        { name: 'Voltar', value: 'back' }
      ]
    })

    try {
      switch (action) {
        case 'byExt': {
          const { dir } = await inquirer.prompt({
            type: 'input',
            name: 'dir',
            message: 'Pasta para organizar:'
          })
          await organizeByExtension(dir)
          break
        }
        case 'analyze': {
          const { dir } = await inquirer.prompt({
            type: 'input',
            name: 'dir',
            message: 'Pasta para analisar:'
          })
          const result = analyzeFolderPattern(dir)
          console.log(
            chalk.cyan(
              `Padrão: ${result.padrao}\nSugestão: ${result.sugestao}\nConfiança: ${result.confianca}%`
            )
          )
          break
        }
        case 'back':
          return
      }
    } catch (err) {
      console.log(chalk.red(`Erro: ${(err as Error).message}`))
    }
  }
}
