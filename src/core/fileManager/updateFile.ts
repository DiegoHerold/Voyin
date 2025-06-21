import fs from 'fs-extra'
import path from 'path'

/**
 * Atualiza um arquivo com novo conteúdo, que pode vir de uma string direta
 * ou de um arquivo de origem.
 * 
 * @param targetFile Caminho completo do arquivo que será atualizado
 * @param contentOrSource Conteúdo novo direto ou caminho do arquivo de origem
 * @param isPath Define se o segundo parâmetro é um caminho de arquivo (true) ou conteúdo direto (false)
 * @returns true se a operação for bem-sucedida
 * @throws Erro se o arquivo de destino não existir ou houver falha na leitura/escrita
 */
export async function updateFile(
  targetFile: string,
  contentOrSource: string,
  isPath: boolean = false
): Promise<boolean> {
  try {
    const resolvedTarget = path.resolve(targetFile)

    // Verifica se o arquivo de destino existe
    if (!(await fs.pathExists(resolvedTarget))) {
      throw new Error(`Arquivo de destino não encontrado: ${resolvedTarget}`)
    }

    let newContent = contentOrSource

    // Se for um caminho, lê o conteúdo do arquivo de origem
    if (isPath) {
      const resolvedSource = path.resolve(contentOrSource)
      if (!(await fs.pathExists(resolvedSource))) {
        throw new Error(`Arquivo de origem não encontrado: ${resolvedSource}`)
      }

      newContent = await fs.readFile(resolvedSource, 'utf-8')
    }

    // Atualiza o conteúdo do arquivo
    await fs.writeFile(resolvedTarget, newContent, 'utf-8')
    return true
  } catch (error) {
    console.error(`Erro ao atualizar o arquivo: ${(error as Error).message}`)
    throw error
  }
}
