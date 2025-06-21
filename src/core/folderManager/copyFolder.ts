import fs from 'fs-extra'
import path from 'path'

/**
 * Copia uma pasta (e todo seu conteúdo) para outro local.
 * 
 * @param sourcePath Caminho da pasta de origem
 * @param destinationDir Diretório onde a pasta será copiada
 * @returns Caminho final da pasta copiada
 * @throws Erro se a origem não existir ou se o destino já contiver pasta com o mesmo nome
 */
export async function copyFolder(sourcePath: string, destinationDir: string): Promise<string> {
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

    await fs.copy(resolvedSource, finalDestination)
    return finalDestination
  } catch (error) {
    console.error(`Erro ao copiar a pasta: ${(error as Error).message}`)
    throw error
  }
}
