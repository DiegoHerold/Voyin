import fs from 'fs-extra'
import path from 'path'

/**
 * Conta a quantidade total de arquivos e pastas dentro de um diretório.
 * @param dir Caminho da pasta alvo
 * @returns Objeto com total de arquivos e subpastas
 */
export async function getTotalFilesAndFolders(dir: string): Promise<{ files: number; folders: number }> {
  let totalFiles = 0
  let totalFolders = 0

  async function walk(currentPath: string) {
    const items = await fs.readdir(currentPath, { withFileTypes: true })
    for (const item of items) {
      const fullPath = path.join(currentPath, item.name)
      if (item.isDirectory()) {
        totalFolders++
        await walk(fullPath)
      } else {
        totalFiles++
      }
    }
  }

  await walk(dir)
  return { files: totalFiles, folders: totalFolders }
}
