import fs from 'fs-extra'
import path from 'path'

/**
 * Lista arquivos e pastas recursivamente com indentação e emojis.
 * 
 * @param folderPath Caminho da pasta base
 * @param apenasDiretorios Se verdadeiro, lista só pastas
 * @param depth Nível atual de profundidade (interno)
 * @param maxDepth Limite máximo de profundidade
 */
export async function listFolder(
  folderPath: string,
  apenasDiretorios = false,
  depth = 0,
  maxDepth = 5
): Promise<string[]> {
  const resolvedPath = path.resolve(folderPath)
  const output: string[] = []

  if (!(await fs.pathExists(resolvedPath))) {
    throw new Error(`Pasta não encontrada: ${resolvedPath}`)
  }

  const itens = await fs.readdir(resolvedPath, { withFileTypes: true })

  for (const item of itens) {
    if (apenasDiretorios && !item.isDirectory()) continue

    const prefix = '  '.repeat(depth) + (item.isDirectory() ? '📁 ' : '📄 ')
    output.push(prefix + item.name)

    if (item.isDirectory() && depth < maxDepth) {
      const subItens = await listFolder(
        path.join(resolvedPath, item.name),
        apenasDiretorios,
        depth + 1,
        maxDepth
      )
      output.push(...subItens)
    }
  }

  return output
}

/**
 * Lista caminhos absolutos de arquivos/pastas recursivamente, com limite de profundidade.
 * 
 * @param folder Caminho base
 * @param currentDepth Profundidade atual (não informar manualmente)
 * @param maxDepth Profundidade máxima
 */
export async function listFlatPaths(
  folder: string,
  currentDepth = 0,
  maxDepth = 5
): Promise<string[]> {
  const result: string[] = []

  const entries = await fs.readdir(folder, { withFileTypes: true })
  for (const entry of entries) {
    const fullPath = path.join(folder, entry.name)
    result.push(fullPath)

    if (entry.isDirectory() && currentDepth < maxDepth) {
      const sub = await listFlatPaths(fullPath, currentDepth + 1, maxDepth)
      result.push(...sub)
    }
  }

  return result
}
