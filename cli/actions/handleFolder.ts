import inquirer from 'inquirer'
import chalk from 'chalk'
import {
  createFolder,
  listFolder,
  renameFolder,
  moveFolder,
  copyFolder,
  deleteFolder
} from '../../src/core/folderManager/index.js'

export async function handleFolder(): Promise<void> {
  while (true) {
    const { action } = await inquirer.prompt({
      type: 'list',
      name: 'action',
      message: 'Operações de pasta:',
      choices: [
        { name: 'Criar pasta', value: 'create' },
        { name: 'Listar pasta', value: 'list' },
        { name: 'Renomear pasta', value: 'rename' },
        { name: 'Mover pasta', value: 'move' },
        { name: 'Copiar pasta', value: 'copy' },
        { name: 'Deletar pasta', value: 'delete' },
        { name: 'Voltar', value: 'back' }
      ]
    })

    try {
      switch (action) {
        case 'create': {
          const { path } = await inquirer.prompt({
            type: 'input',
            name: 'path',
            message: 'Nova pasta:'
          })
          await createFolder(path)
          console.log(chalk.green('✅ Pasta criada.'))
          break
        }
        case 'list': {
          const { path } = await inquirer.prompt({
            type: 'input',
            name: 'path',
            message: 'Pasta a listar:'
          })
          const items = await listFolder(path)
          console.log(items.join('\n') || '(vazio)')
          break
        }
        case 'rename': {
          const { path, name } = await inquirer.prompt([
            { type: 'input', name: 'path', message: 'Pasta a renomear:' },
            { type: 'input', name: 'name', message: 'Novo nome:' }
          ])
          await renameFolder(path, name)
          console.log(chalk.green('✅ Pasta renomeada.'))
          break
        }
        case 'move': {
          const { from, to } = await inquirer.prompt([
            { type: 'input', name: 'from', message: 'Pasta de origem:' },
            { type: 'input', name: 'to', message: 'Diretório destino:' }
          ])
          await moveFolder(from, to)
          console.log(chalk.green('✅ Pasta movida.'))
          break
        }
        case 'copy': {
          const { from, to } = await inquirer.prompt([
            { type: 'input', name: 'from', message: 'Pasta de origem:' },
            { type: 'input', name: 'to', message: 'Diretório destino:' }
          ])
          await copyFolder(from, to)
          console.log(chalk.green('✅ Pasta copiada.'))
          break
        }
        case 'delete': {
          const { path } = await inquirer.prompt({
            type: 'input',
            name: 'path',
            message: 'Pasta a deletar:'
          })
          await deleteFolder(path)
          console.log(chalk.green('✅ Pasta deletada.'))
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
