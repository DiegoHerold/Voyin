import fs from 'fs-extra'
import path from 'path'

/**
 * Move uma ou mais pastas para um diretório de destino.
 * 
 * @param sourcePaths Array com caminhos das pastas a serem movidas
 * @param destinationDir Pasta de destino
 * @returns Lista com os caminhos finais das pastas movidas
 * @throws Erro se qualquer pasta de origem não existir ou se já existir no destino
 */
export async function moveFolder(
  sourcePaths: string[] | string,
  destinationDir: string
): Promise<string[]> {
  const resolvedDestDir = path.resolve(destinationDir)
  const paths = Array.isArray(sourcePaths) ? sourcePaths : [sourcePaths]
  const resultados: string[] = []

  await fs.ensureDir(resolvedDestDir)

  for (const source of paths) {
    const resolvedSource = path.resolve(source)

    if (!(await fs.pathExists(resolvedSource))) {
      throw new Error(`Pasta de origem não encontrada: ${resolvedSource}`)
    }

    const folderName = path.basename(resolvedSource)
    const finalDestination = path.join(resolvedDestDir, folderName)

    if (await fs.pathExists(finalDestination)) {
      throw new Error(`Já existe uma pasta no destino: ${finalDestination}`)
    }

    await fs.move(resolvedSource, finalDestination)
    resultados.push(finalDestination)
  }

  return resultados
}
