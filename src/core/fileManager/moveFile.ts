import fs from 'fs-extra'
import path from 'path'

/**
 * Move um arquivo de um local para outro.
 * 
 * @param sourcePath Caminho atual do arquivo
 * @param destinationDir Pasta de destino (pode existir ou não)
 * @returns Caminho final do arquivo movido
 * @throws Erro se o arquivo de origem não existir ou se o destino já contiver um arquivo com o mesmo nome
 */
export async function moveFile(sourcePath: string, destinationDir: string): Promise<string> {
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

    // Verifica se já existe um arquivo no destino com o mesmo nome
    if (await fs.pathExists(destinationPath)) {
      throw new Error(`Já existe um arquivo no destino: ${destinationPath}`)
    }

    // Move o arquivo
    await fs.move(resolvedSource, destinationPath)
    return destinationPath
  } catch (error) {
    console.error(`Erro ao mover o arquivo: ${(error as Error).message}`)
    throw error
  }
}
