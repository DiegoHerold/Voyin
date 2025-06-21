import fs from 'fs-extra'
import path from 'path'

/**
 * Calcula o tamanho total de cada subpasta dentro do diretório fornecido.
 * @param dir Caminho da pasta alvo
 * @returns Mapa com o caminho de cada subpasta e seu tamanho em MB
 */
export async function getFolderSizes(dir: string): Promise<Record<string, number>> {
  const result: Record<string, number> = {}

  async function calculateSize(folderPath: string): Promise<number> {
    let total = 0
    const items = await fs.readdir(folderPath, { withFileTypes: true })

    for (const item of items) {
      const fullPath = path.join(folderPath, item.name)
      if (item.isDirectory()) {
        total += await calculateSize(fullPath)
      } else {
        const stats = await fs.stat(fullPath)
        total += stats.size
      }
    }

    return total
  }

  const entries = await fs.readdir(dir, { withFileTypes: true })
  for (const item of entries) {
    if (item.isDirectory()) {
      const subfolder = path.join(dir, item.name)
      const size = await calculateSize(subfolder)
      result[subfolder] = +(size / (1024 * 1024)).toFixed(2) // Convert to MB
    }
  }

  return result
}
