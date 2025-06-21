import fs from 'fs-extra'
import path from 'path'

/**
 * Lista os itens de uma pasta.
 * 
 * @param folderPath Caminho da pasta a ser listada
 * @param apenasDiretorios Se verdadeiro, lista apenas subpastas
 * @returns Lista de nomes dos itens (arquivos ou pastas)
 * @throws Erro se a pasta não existir
 */
export async function listFolder(folderPath: string, apenasDiretorios = false): Promise<string[]> {
  try {
    const resolvedPath = path.resolve(folderPath)

    if (!(await fs.pathExists(resolvedPath))) {
      throw new Error(`Pasta não encontrada: ${resolvedPath}`)
    }

    const itens = await fs.readdir(resolvedPath, { withFileTypes: true })

    const nomes = itens
      .filter((item) => (apenasDiretorios ? item.isDirectory() : true))
      .map((item) => item.name)

    return nomes
  } catch (error) {
    console.error(`Erro ao listar a pasta: ${(error as Error).message}`)
    throw error
  }
}
