import fs from 'fs-extra'
import path from 'path'

/**
 * Exclui um arquivo de forma segura.
 * 
 * @param filePath Caminho completo do arquivo a ser excluído
 * @returns true se excluído com sucesso
 * @throws Erro caso o arquivo não exista ou falhe a exclusão
 */
export async function deleteFile(filePath: string): Promise<boolean> {
  try {
    const resolvedPath = path.resolve(filePath)

    // Verifica se o arquivo existe
    const exists = await fs.pathExists(resolvedPath)
    if (!exists) {
      throw new Error(`Arquivo não encontrado: ${resolvedPath}`)
    }

    // Remove o arquivo
    await fs.remove(resolvedPath)
    return true
  } catch (error) {
    console.error(`Erro ao excluir o arquivo: ${(error as Error).message}`)
    throw error
  }
}
