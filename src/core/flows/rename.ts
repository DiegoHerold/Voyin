import path from 'path'
import { renameFile } from '../fileManager/renameFile.js'
import fs from 'fs-extra'

type RenameStep = {
  action: 'rename'
  pattern: string // ex: "arquivo-{{index}}{{ext}}"
}

/**
 * Renomeia apenas arquivos com base em padrão.
 * Ignora diretórios. Usa a função utilitária `renameFile()`.
 */
export async function renameFileFlow(arquivos: string[], step: RenameStep): Promise<string[]> {
  const resultado: string[] = []

  let index = 1
  for (const origem of arquivos) {
    const stat = await fs.stat(origem)
    if (!stat.isFile()) {
      console.log(`⚠️ Ignorado (não é arquivo): ${origem}`)
      continue
    }

    const ext = path.extname(origem)
    const novoNome = step.pattern
      .replace('{{index}}', String(index))
      .replace('{{ext}}', ext)

    const novoCaminho = await renameFile(origem, novoNome)
    resultado.push(novoCaminho)
    console.log(`✏️  Renomeado: ${path.basename(origem)} → ${path.basename(novoCaminho)}`)

    index++
  }

  return resultado
}
