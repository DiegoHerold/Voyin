import fs from 'fs-extra'
import path from 'path'

/**
 * Renomeia um arquivo existente, mantendo-o na mesma pasta.
 * 
 * @param currentPath Caminho atual do arquivo
 * @param newName Novo nome para o arquivo (ex: "novo.txt")
 * @returns Caminho completo do novo arquivo
 * @throws Erro se o arquivo original não existir ou se já existir outro com o novo nome
 */
export async function renameFile(currentPath: string, newName: string): Promise<string> {
  try {
    const resolvedCurrent = path.resolve(currentPath)

    // Verifica se o arquivo original existe
    if (!(await fs.pathExists(resolvedCurrent))) {
      throw new Error(`Arquivo original não encontrado: ${resolvedCurrent}`)
    }

    const dir = path.dirname(resolvedCurrent)
    const resolvedNew = path.join(dir, newName)

    // Verifica se já existe um arquivo com o novo nome
    if (await fs.pathExists(resolvedNew)) {
      throw new Error(`Já existe um arquivo com o nome: ${resolvedNew}`)
    }

    // Renomeia
    await fs.rename(resolvedCurrent, resolvedNew)
    return resolvedNew
  } catch (error) {
    console.error(`Erro ao renomear o arquivo: ${(error as Error).message}`)
    throw error
  }
}
