import fs from 'fs-extra'
import path from 'path'

/**
 * Exclui uma pasta e todo o seu conteúdo, se existir.
 * 
 * @param folderPath Caminho da pasta a ser removida
 * @returns true se a pasta foi removida com sucesso
 * @throws Erro se a pasta não existir ou não puder ser excluída
 */
export async function deleteFolder(folderPath: string): Promise<boolean> {
  try {
    const resolvedPath = path.resolve(folderPath)

    // Verifica se a pasta existe
    if (!(await fs.pathExists(resolvedPath))) {
      throw new Error(`Pasta não encontrada: ${resolvedPath}`)
    }

    await fs.remove(resolvedPath)
    return true
  } catch (error) {
    console.error(`Erro ao excluir a pasta: ${(error as Error).message}`)
    throw error
  }
}
