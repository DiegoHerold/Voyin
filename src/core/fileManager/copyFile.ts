import fs from 'fs-extra'
import path from 'path'

/**
 * Copia um ou vários arquivos para uma pasta de destino.
 * 
 * @param sourcePaths Caminhos dos arquivos originais
 * @param destinationDir Pasta onde os arquivos serão copiados
 * @returns Caminhos finais dos arquivos copiados
 * @throws Erro se algum arquivo não existir ou se houver conflito no destino
 */
export async function copyFile(sourcePaths: string[], destinationDir: string): Promise<string[]> {
  const resolvedDestinationDir = path.resolve(destinationDir)
  const resultados: string[] = []

  await fs.ensureDir(resolvedDestinationDir)

  for (const sourcePath of sourcePaths) {
    const resolvedSource = path.resolve(sourcePath)

    if (!(await fs.pathExists(resolvedSource))) {
      throw new Error(`Arquivo de origem não encontrado: ${resolvedSource}`)
    }

    const fileName = path.basename(resolvedSource)
    const destinationPath = path.join(resolvedDestinationDir, fileName)

    if (await fs.pathExists(destinationPath)) {
      throw new Error(`Já existe um arquivo no destino: ${destinationPath}`)
    }

    await fs.copy(resolvedSource, destinationPath)
    resultados.push(destinationPath)
  }

  return resultados
}
