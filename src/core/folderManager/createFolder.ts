import fs from 'fs-extra'
import path from 'path'

/**
 * Cria uma nova pasta no caminho especificado.
 * 
 * @param folderPath Caminho da pasta a ser criada
 * @returns Caminho absoluto da pasta criada
 * @throws Erro se não for possível criar a pasta
 */
export async function createFolder(folderPath: string): Promise<string> {
  try {
    const resolvedPath = path.resolve(folderPath)

    await fs.ensureDir(resolvedPath)
    return resolvedPath
  } catch (error) {
    console.error(`Erro ao criar a pasta: ${(error as Error).message}`)
    throw error
  }
}
