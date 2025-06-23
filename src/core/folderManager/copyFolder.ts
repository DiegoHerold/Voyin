import fs from 'fs-extra'
import path from 'path'

/**
 * Copia uma ou mais pastas (e seus conteúdos) para outro local.
 * 
 * @param sourcePaths Caminhos das pastas de origem
 * @param destinationDir Diretório onde as pastas serão copiadas
 * @returns Lista de caminhos finais das pastas copiadas
 * @throws Erro se alguma pasta não existir ou se houver conflito no destino
 */
export async function copyFolder(
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

    await fs.copy(resolvedSource, finalDestination)
    resultados.push(finalDestination)
  }

  return resultados
}
