import fs from 'fs-extra'
import path from 'path'

/**
 * Renomeia uma pasta, mantendo-a no mesmo diretório.
 * 
 * @param currentPath Caminho atual da pasta
 * @param newName Novo nome da pasta (não o caminho completo)
 * @returns Caminho completo da nova pasta
 * @throws Erro se a pasta original não existir ou se já houver uma pasta com o novo nome
 */
export async function renameFolder(currentPath: string, newName: string): Promise<string> {
  try {
    const resolvedCurrent = path.resolve(currentPath)

    if (!(await fs.pathExists(resolvedCurrent))) {
      throw new Error(`Pasta original não encontrada: ${resolvedCurrent}`)
    }

    const parentDir = path.dirname(resolvedCurrent)
    const resolvedNew = path.join(parentDir, newName)

    if (await fs.pathExists(resolvedNew)) {
      throw new Error(`Já existe uma pasta com o nome: ${resolvedNew}`)
    }

    await fs.rename(resolvedCurrent, resolvedNew)
    return resolvedNew
  } catch (error) {
    console.error(`Erro ao renomear a pasta: ${(error as Error).message}`)
    throw error
  }
}
