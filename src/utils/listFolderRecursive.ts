import fs from 'fs-extra'
import path from 'path'

/**
 * Lista todos os arquivos de uma pasta e suas subpastas.
 * 
 * @param basePath Caminho inicial da pasta
 * @returns Lista de caminhos completos dos arquivos encontrados
 */
export async function listFolderRecursive(basePath: string): Promise<string[]> {
  const arquivos: string[] = []

  async function explorar(pastaAtual: string) {
    const itens = await fs.readdir(pastaAtual)

    for (const item of itens) {
      const caminho = path.join(pastaAtual, item)
      const stats = await fs.stat(caminho)

      if (stats.isDirectory()) {
        await explorar(caminho)
      } else {
        arquivos.push(caminho)
      }
    }
  }

  await explorar(basePath)
  return arquivos
}
