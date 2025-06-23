import fs from 'fs-extra'
import path from 'path'

/**
 * Move um ou vários arquivos para uma pasta de destino.
 *
 * @param sourcePaths Caminho(s) do(s) arquivo(s) a ser(em) movido(s)
 * @param destinationDir Pasta de destino
 * @returns Lista com os caminhos finais dos arquivos movidos
 * @throws Erro se algum arquivo não existir ou já existir no destino
 */
export async function moveFile(
  sourcePaths: string | string[],
  destinationDir: string
): Promise<string[]> {
  try {
    const resolvedDestinationDir = path.resolve(destinationDir)
    await fs.ensureDir(resolvedDestinationDir)

    const sources = Array.isArray(sourcePaths) ? sourcePaths : [sourcePaths]
    const movedPaths: string[] = []

    for (const source of sources) {
      const resolvedSource = path.resolve(source)

      if (!(await fs.pathExists(resolvedSource))) {
        throw new Error(`Arquivo de origem não encontrado: ${resolvedSource}`)
      }

      const fileName = path.basename(resolvedSource)
      const destinationPath = path.join(resolvedDestinationDir, fileName)

      if (await fs.pathExists(destinationPath)) {
        throw new Error(`Já existe um arquivo no destino: ${destinationPath}`)
      }

      await fs.move(resolvedSource, destinationPath)
      movedPaths.push(destinationPath)
    }

    return movedPaths
  } catch (error) {
    console.error('❌ Erro ao mover arquivo(s):', (error as Error).message)
    throw error
  }
}
