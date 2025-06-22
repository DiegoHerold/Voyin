import inquirer from 'inquirer'
import chalk from 'chalk'
import {
  createFile,
  readFile,
  updateFile,
  renameFile,
  moveFile,
  copyFile,
  deleteFile,
  convertFile
} from '../../src/core/fileManager/index.js'

export async function handleFile(): Promise<void> {
  while (true) {
    const { action } = await inquirer.prompt({
      type: 'list',
      name: 'action',
      message: 'Escolha uma operação de arquivo:',
      choices: [
        { name: 'Criar arquivo', value: 'create' },
        { name: 'Ler arquivo', value: 'read' },
        { name: 'Atualizar arquivo', value: 'update' },
        { name: 'Renomear arquivo', value: 'rename' },
        { name: 'Mover arquivo', value: 'move' },
        { name: 'Copiar arquivo', value: 'copy' },
        { name: 'Deletar arquivo', value: 'delete' },
        { name: 'Converter arquivo', value: 'convert' },
        { name: 'Voltar', value: 'back' }
      ]
    })

    try {
      switch (action) {
        case 'create': {
          const { path, content } = await inquirer.prompt([
            { type: 'input', name: 'path', message: 'Caminho do novo arquivo:' },
            {
              type: 'input',
              name: 'content',
              message: 'Conteúdo inicial (opcional):',
              default: ''
            }
          ])
          await createFile(path, content)
          console.log(chalk.green('✅ Arquivo criado.'))
          break
        }
        case 'read': {
          const { path } = await inquirer.prompt({
            type: 'input',
            name: 'path',
            message: 'Caminho do arquivo:'
          })
          const content = await readFile(path)
          console.log(chalk.cyan('\n' + content + '\n'))
          break
        }
        case 'update': {
          const { path, newContent } = await inquirer.prompt([
            { type: 'input', name: 'path', message: 'Arquivo a atualizar:' },
            { type: 'input', name: 'newContent', message: 'Novo conteúdo:' }
          ])
          await updateFile(path, newContent)
          console.log(chalk.green('✅ Arquivo atualizado.'))
          break
        }
        case 'rename': {
          const { path, name } = await inquirer.prompt([
            { type: 'input', name: 'path', message: 'Arquivo a renomear:' },
            { type: 'input', name: 'name', message: 'Novo nome:' }
          ])
          await renameFile(path, name)
          console.log(chalk.green('✅ Arquivo renomeado.'))
          break
        }
        case 'move': {
          const { from, to } = await inquirer.prompt([
            { type: 'input', name: 'from', message: 'Arquivo de origem:' },
            { type: 'input', name: 'to', message: 'Pasta destino:' }
          ])
          await moveFile(from, to)
          console.log(chalk.green('✅ Arquivo movido.'))
          break
        }
        case 'copy': {
          const { from, to } = await inquirer.prompt([
            { type: 'input', name: 'from', message: 'Arquivo de origem:' },
            { type: 'input', name: 'to', message: 'Pasta destino:' }
          ])
          await copyFile(from, to)
          console.log(chalk.green('✅ Arquivo copiado.'))
          break
        }
        case 'delete': {
          const { path } = await inquirer.prompt({
            type: 'input',
            name: 'path',
            message: 'Arquivo a deletar:'
          })
          await deleteFile(path)
          console.log(chalk.green('✅ Arquivo deletado.'))
          break
        }
        case 'convert': {
          const { input, output, type } = await inquirer.prompt([
            { type: 'input', name: 'input', message: 'Arquivo de entrada:' },
            { type: 'input', name: 'output', message: 'Arquivo de saída:' },
            {
              type: 'list',
              name: 'type',
              message: 'Tipo de conversão:',
              choices: [
                'pdfToPng',
                'pdfToWord',
                'wordToPdf',
                'excelToPdf',
                'txtToPdf'
              ]
            }
          ])
          await convertFile({ input, output, type })
          console.log(chalk.green('✅ Conversão concluída.'))
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
