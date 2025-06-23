import fs from 'fs-extra'
import path from 'path'

/**
 * Exclui múltiplos arquivos ou pastas de forma segura.
 * 
 * @param paths Array de caminhos a serem excluídos
 * @returns true se todos os arquivos/pastas forem excluídos com sucesso
 * @throws Erro caso algum caminho não exista ou falhe a exclusão
 */
export async function deleteFile(paths: string[]): Promise<boolean> {
  try {
    for (const filePath of paths) {
      const resolvedPath = path.resolve(filePath)

      if (!(await fs.pathExists(resolvedPath))) {
        throw new Error(`Arquivo ou pasta não encontrado: ${resolvedPath}`)
      }

      await fs.remove(resolvedPath)
    }

    return true
  } catch (error) {
    console.error(`Erro ao excluir: ${(error as Error).message}`)
    throw error
  }
}
