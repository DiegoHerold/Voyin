import inquirer from 'inquirer'
import chalk from 'chalk'
import {
  findDuplicateNames,
  findDuplicateContents,
  deleteDuplicates
} from '../../src/core/duplicator/index.js'

export async function handleDuplicator(): Promise<void> {
  while (true) {
    const { action } = await inquirer.prompt({
      type: 'list',
      name: 'action',
      message: 'Opções de duplicados:',
      choices: [
        { name: 'Procurar nomes duplicados', value: 'names' },
        { name: 'Procurar conteúdo duplicado', value: 'contents' },
        { name: 'Voltar', value: 'back' }
      ]
    })

    if (action === 'back') return

    const { dir } = await inquirer.prompt({
      type: 'input',
      name: 'dir',
      message: 'Diretório para analisar:'
    })

    try {
      const duplicates =
        action === 'names'
          ? findDuplicateNames(dir)
          : findDuplicateContents(dir)

      if (Object.keys(duplicates).length === 0) {
        console.log(chalk.green('Nenhum duplicado encontrado.'))
        continue
      }

      console.log(chalk.yellow('Duplicados encontrados:'))
      Object.values(duplicates).forEach(grp =>
        console.log(' - ' + grp.join('\n   '))
      )

      const { remove } = await inquirer.prompt({
        type: 'confirm',
        name: 'remove',
        message: 'Deletar cópias deixando apenas uma?' ,
        default: false
      })

      if (remove) {
        await deleteDuplicates(duplicates)
      }
    } catch (err) {
      console.log(chalk.red(`Erro: ${(err as Error).message}`))
    }
  }
}
