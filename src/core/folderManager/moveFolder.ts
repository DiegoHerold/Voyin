import fs from 'fs-extra'
import path from 'path'

/**
 * Move uma pasta de um local para outro.
 * 
 * @param sourcePath Caminho da pasta original
 * @param destinationDir Pasta de destino (a pasta será movida para dentro dela)
 * @returns Caminho final da pasta movida
 * @throws Erro se a pasta de origem não existir ou se o destino já contiver pasta com o mesmo nome
 */
export async function moveFolder(sourcePath: string, destinationDir: string): Promise<string> {
  try {
    const resolvedSource = path.resolve(sourcePath)
    const resolvedDestDir = path.resolve(destinationDir)

    if (!(await fs.pathExists(resolvedSource))) {
      throw new Error(`Pasta de origem não encontrada: ${resolvedSource}`)
    }

    await fs.ensureDir(resolvedDestDir)

    const folderName = path.basename(resolvedSource)
    const finalDestination = path.join(resolvedDestDir, folderName)

    if (await fs.pathExists(finalDestination)) {
      throw new Error(`Já existe uma pasta no destino: ${finalDestination}`)
    }

    await fs.move(resolvedSource, finalDestination)
    return finalDestination
  } catch (error) {
    console.error(`Erro ao mover a pasta: ${(error as Error).message}`)
    throw error
  }
}
