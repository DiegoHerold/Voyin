import fs from 'fs-extra'
import path from 'path'

/**
 * Move arquivos duplicados para uma subpasta chamada `duplicados` dentro da pasta raiz.
 * Preserva o primeiro arquivo de cada grupo e move os demais.
 *
 * @param duplicatas Objeto onde cada chave representa um grupo e o valor é a lista de caminhos duplicados
 * @param pastaRaiz Diretório onde a subpasta `duplicados` será criada
 */
export async function groupDuplicates(duplicatas: Record<string, string[]>, pastaRaiz: string) {
  const destino = path.join(pastaRaiz, 'duplicados')
  await fs.ensureDir(destino)

  for (const grupo of Object.values(duplicatas)) {
    const [original, ...copias] = grupo

    for (const arquivo of copias) {
      const nomeArquivo = path.basename(arquivo)
      const novoCaminho = path.join(destino, nomeArquivo)

      try {
        await fs.move(arquivo, novoCaminho, { overwrite: false })
        console.log(`📦 Movido para duplicados/: ${nomeArquivo}`)
      } catch (err) {
        console.warn(`⚠️  Erro ao mover ${nomeArquivo}:`, err)
      }
    }
  }
}
