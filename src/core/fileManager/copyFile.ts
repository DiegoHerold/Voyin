import fs from 'fs-extra'
import path from 'path'

/**
 * Copia um arquivo de um local para outro.
 * 
 * @param sourcePath Caminho do arquivo original
 * @param destinationDir Pasta onde o arquivo será copiado
 * @returns Caminho final do arquivo copiado
 * @throws Erro se o arquivo original não existir ou se já existir no destino
 */
export async function copyFile(sourcePath: string, destinationDir: string): Promise<string> {
  try {
    const resolvedSource = path.resolve(sourcePath)
    const resolvedDestinationDir = path.resolve(destinationDir)

    // Verifica se o arquivo de origem existe
    if (!(await fs.pathExists(resolvedSource))) {
      throw new Error(`Arquivo de origem não encontrado: ${resolvedSource}`)
    }

    // Garante que a pasta de destino exista
    await fs.ensureDir(resolvedDestinationDir)

    const fileName = path.basename(resolvedSource)
    const destinationPath = path.join(resolvedDestinationDir, fileName)

    // Verifica se já existe um arquivo com o mesmo nome no destino
    if (await fs.pathExists(destinationPath)) {
      throw new Error(`Já existe um arquivo no destino: ${destinationPath}`)
    }

    // Copia o arquivo
    await fs.copy(resolvedSource, destinationPath)
    return destinationPath
  } catch (error) {
    console.error(`Erro ao copiar o arquivo: ${(error as Error).message}`)
    throw error
  }
}
