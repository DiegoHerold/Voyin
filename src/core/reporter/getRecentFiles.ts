import fs from 'fs-extra'
import path from 'path'

/**
 * Retorna uma lista dos arquivos mais recentemente modificados em uma pasta.
 * @param dir Caminho da pasta alvo
 * @param limit Quantos arquivos retornar (padrão: 10)
 * @returns Lista com objetos contendo nome, caminho e data de modificação
 */
export async function getRecentFiles(
  dir: string,
  limit: number = 10
): Promise<{ name: string; path: string; modified: Date }[]> {
  const allFiles: { name: string; path: string; modified: Date }[] = []

  async function walk(currentPath: string) {
    const items = await fs.readdir(currentPath, { withFileTypes: true })

    for (const item of items) {
      const fullPath = path.join(currentPath, item.name)
      if (item.isDirectory()) {
        await walk(fullPath)
      } else {
        const stats = await fs.stat(fullPath)
        allFiles.push({ name: item.name, path: fullPath, modified: stats.mtime })
      }
    }
  }

  await walk(dir)

  return allFiles
    .sort((a, b) => b.modified.getTime() - a.modified.getTime())
    .slice(0, limit)
}
