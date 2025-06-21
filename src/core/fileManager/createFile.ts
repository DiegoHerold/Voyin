import fs from 'fs-extra'
import path from 'path'

/**
 * Cria um novo arquivo com conteúdo opcional, de forma segura.
 * 
 * @param filePath Caminho completo do novo arquivo
 * @param content Conteúdo inicial do arquivo (opcional)
 * @returns Caminho do arquivo criado ou erro lançado
 */
export async function createFile(filePath: string, content = ''): Promise<string> {
  try {
    const resolvedPath = path.resolve(filePath)

    // Verifica se o arquivo já existe
    const exists = await fs.pathExists(resolvedPath)
    if (exists) {
      throw new Error(`Arquivo já existe: ${resolvedPath}`)
    }

    // Garante que o diretório pai existe
    await fs.ensureDir(path.dirname(resolvedPath))

    // Cria o arquivo
    await fs.writeFile(resolvedPath, content, 'utf8')

    return resolvedPath
  } catch (error) {
    console.error(`Erro ao criar o arquivo: ${(error as Error).message}`)
    throw error
  }
}
