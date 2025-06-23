import inquirer from 'inquirer'
import chalk from 'chalk'
import path from 'path'
import fs from 'fs-extra' // necessário para appendFile
import { createFile } from '../../src/core/fileManager/createFile.js'
import { readFile } from '../../src/core/fileManager/readFile.js'
import { renameFile } from '../../src/core/fileManager/renameFile.js'
import { moveFile } from '../../src/core/fileManager/moveFile.js'
import { copyFile } from '../../src/core/fileManager/copyFile.js'
import { deleteFile } from '../../src/core/fileManager/deleteFile.js'
import { convertFile } from '../../src/core/fileManager/convertFile.js'
import { navigateFolders } from '../helpers/navigateFolders.js'
import { selectMultipleFromFolder } from '../helpers/selectMultipleFromFolder.js'

const EXTENSOES_DISPONIVEIS = [
  'txt', 'md', 'json', 'csv',
  'docx', 'pdf', 'xlsx',
  'png', 'jpg', 'gif',
  'html', 'xml', 'zip', 'log',
  '✏️ Outra (especificar)'
]

const conversionMap: Record<string, string> = {
  pdfToPng: '.png',
  pdfToWord: '.docx',
  wordToPdf: '.pdf',
  excelToPdf: '.pdf',
  txtToPdf: '.pdf'
}

export async function handleCreateFile() {
  const folderPath = await navigateFolders('pasta', '📂 Selecione a pasta onde o arquivo será criado:')

  const { baseName, selectedExt } = await inquirer.prompt([
    {
      type: 'input',
      name: 'baseName',
      message: '📛 Nome do arquivo (sem extensão):',
      validate: input => input.trim() !== '' || 'O nome do arquivo é obrigatório.'
    },
    {
      type: 'list',
      name: 'selectedExt',
      message: '📦 Escolha a extensão do arquivo:',
      choices: EXTENSOES_DISPONIVEIS
    }
  ])

  let extension = selectedExt
  if (selectedExt === '✏️ Outra (especificar)') {
    const { customExt } = await inquirer.prompt([
      {
        type: 'input',
        name: 'customExt',
        message: '🔤 Digite a extensão desejada (sem ponto):',
        validate: input => /^[a-zA-Z0-9]+$/.test(input) || 'Digite uma extensão válida, sem ponto.'
      }
    ])
    extension = customExt
  }

  const { content } = await inquirer.prompt([
    {
      type: 'input',
      name: 'content',
      message: '📝 Conteúdo inicial (opcional):',
      default: ''
    }
  ])

  const fileName = `${baseName}.${extension}`
  const fullPath = path.join(folderPath, fileName)

  try {
    const created = await createFile(fullPath, content)
    console.log(chalk.green(`✅ Arquivo criado: ${created}`))
  } catch (err) {
    console.error(chalk.red((err as Error).message))
  }
}

export async function handleReadFile() {
  const path = await navigateFolders('arquivo', '📄 Selecione o arquivo a ser lido:')
  try {
    const data = await readFile(path)
    console.log(chalk.blue('\n' + data + '\n'))
  } catch (err) {
    console.error(chalk.red((err as Error).message))
  }
}

export async function handleRenameFile() {
  const filePath = await navigateFolders('arquivo', '📄 Selecione o arquivo a ser renomeado:')
  const originalExt = path.extname(filePath)

  const { name } = await inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: `✏️  Novo nome para o arquivo (sem extensão para manter "${originalExt}"):`.trim()
    }
  ])

  // Se o usuário já incluiu extensão, usa como está; se não, adiciona a original
  const finalName = path.extname(name) ? name : `${name}${originalExt}`

  try {
    const newPath = await renameFile(filePath, finalName)
    console.log(chalk.green(`✅ Renomeado para: ${newPath}`))
  } catch (err) {
    console.error(chalk.red((err as Error).message))
  }
}

export async function handleMoveFile() {

  const arquivos = await selectMultipleFromFolder('arquivo', '📄 Selecione os arquivos que deseja mover:')
  if (arquivos.length === 0) return

  const destino = await navigateFolders('pasta', '📂 Selecione a pasta de destino:')

  try {
    const resultados = await moveFile(arquivos, destino)
    for (const caminhoFinal of resultados) {
      console.log(chalk.green(`✅ Movido para: ${caminhoFinal}`))
    }
  } catch (err) {
    console.error(chalk.red(`❌ Falha ao mover arquivos: ${(err as Error).message}`))
  }
}

export async function handleCopyFile() {
  const arquivos = await selectMultipleFromFolder('arquivo', '📄 Selecione os arquivos que deseja copiar:')
  if (arquivos.length === 0) return

  const destino = await navigateFolders('pasta', '📂 Selecione a pasta de destino:')

  try {
    const resultados = await copyFile(arquivos, destino)
    for (const caminhoFinal of resultados) {
      console.log(chalk.green(`✅ Copiado para: ${caminhoFinal}`))
    }
  } catch (err) {
    console.error(chalk.red(`❌ Falha ao copiar arquivos: ${(err as Error).message}`))
  }
}

export async function handleDeleteFile() {
  const arquivos = await selectMultipleFromFolder('arquivo', '🗑️ Selecione os arquivos que deseja excluir:')
  if (arquivos.length === 0) return

  try {
    await deleteFile(arquivos)
    for (const caminho of arquivos) {
      console.log(chalk.green(`✅ Excluído: ${path.basename(caminho)}`))
    }
  } catch (err) {
    console.error(chalk.red(`❌ Erro ao excluir: ${(err as Error).message}`))
  }
}

export async function handleConvertFile() {
  const input = await navigateFolders('arquivo', '📄 Selecione o arquivo de origem para conversão:')

  const { type } = await inquirer.prompt({
    type: 'list',
    name: 'type',
    message: '🔄 Tipo de conversão:',
    choices: Object.keys(conversionMap)
  })

  const outputFolder = await navigateFolders('pasta', '📁 Selecione a pasta de destino:')
  const extNova = conversionMap[type]
  const nomeBase = path.basename(input, path.extname(input))
  const caminhoFinal = path.join(outputFolder, `${nomeBase}${extNova}`)

  try {
    await fs.ensureDir(path.dirname(caminhoFinal))
    await convertFile({ input, output: caminhoFinal, type })
    console.log(chalk.green(`✅ Conversão concluída: ${caminhoFinal}`))
  } catch (err) {
    console.error(chalk.red(`❌ Erro ao converter: ${(err as Error).message}`))
  }
}

export async function handleUpdateFile() {
  const filePath = await navigateFolders('arquivo', '📄 Selecione o arquivo que deseja atualizar:')

  const ext = path.extname(filePath).toLowerCase()
  const extensoesPermitidas = ['.txt', '.md', '.csv', '.json', '.log', '.html']

  if (!extensoesPermitidas.includes(ext)) {
    console.log(chalk.red(`❌ A extensão "${ext}" não é compatível com atualização via texto.`))
    return
  }

  const { contentToAdd } = await inquirer.prompt([
    {
      type: 'editor',
      name: 'contentToAdd',
      message: '✍️ Digite o conteúdo a ser adicionado ao final do arquivo:'
    }
  ])

  try {
    await fs.appendFile(filePath, contentToAdd + '\n', 'utf8')
    console.log(chalk.green('✅ Conteúdo adicionado com sucesso!'))
  } catch (err) {
    console.error(chalk.red(`Erro ao atualizar o arquivo: ${(err as Error).message}`))
  }
}
