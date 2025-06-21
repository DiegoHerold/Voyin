import fs from 'fs-extra'
import path from 'path'

/**
 * Lê o conteúdo de um arquivo como texto.
 * 
 * @param filePath Caminho completo do arquivo a ser lido
 * @returns Conteúdo do arquivo como string
 * @throws Erro caso o arquivo não exista ou a leitura falhe
 */
export async function readFile(filePath: string): Promise<string> {
  try {
    const resolvedPath = path.resolve(filePath)

    // Verifica se o arquivo existe
    const exists = await fs.pathExists(resolvedPath)
    if (!exists) {
      throw new Error(`Arquivo não encontrado: ${resolvedPath}`)
    }

    // Lê o conteúdo do arquivo como texto
    const content = await fs.readFile(resolvedPath, 'utf-8')
    return content
  } catch (error) {
    console.error(`Erro ao ler o arquivo: ${(error as Error).message}`)
    throw error
  }
}
