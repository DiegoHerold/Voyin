import fs from 'fs-extra'
import path from 'path'

/**
 * Exclui uma ou mais pastas e seus conteúdos.
 * 
 * @param folderPaths Caminhos das pastas a serem removidas
 * @returns true se todas forem removidas com sucesso
 * @throws Erro se alguma pasta não existir ou não puder ser excluída
 */
export async function deleteFolder(folderPaths: string[] | string): Promise<boolean> {
  const paths = Array.isArray(folderPaths) ? folderPaths : [folderPaths]

  for (const folderPath of paths) {
    const resolvedPath = path.resolve(folderPath)

    if (!(await fs.pathExists(resolvedPath))) {
      throw new Error(`Pasta não encontrada: ${resolvedPath}`)
    }

    await fs.remove(resolvedPath)
  }

  return true
}
