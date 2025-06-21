import fs from 'fs-extra'
import path from 'path'

/**
 * Agrupa arquivos por extensão e conta quantos existem de cada tipo.
 * @param dir Caminho da pasta alvo
 * @returns Objeto com extensões e suas quantidades
 */
export async function getFileTypesSummary(dir: string): Promise<Record<string, number>> {
  const summary: Record<string, number> = {}

  async function walk(currentPath: string) {
    const items = await fs.readdir(currentPath, { withFileTypes: true })

    for (const item of items) {
      const fullPath = path.join(currentPath, item.name)
      if (item.isDirectory()) {
        await walk(fullPath)
      } else {
        const ext = path.extname(item.name).toLowerCase() || 'semExtensão'
        summary[ext] = (summary[ext] || 0) + 1
      }
    }
  }

  await walk(dir)
  return summary
}
