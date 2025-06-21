import fs from 'fs-extra'

/**
 * Deleta arquivos duplicados com base em um mapa de duplicatas.
 * Preserva o primeiro arquivo de cada grupo e remove os demais.
 *
 * @param duplicatas Um objeto onde cada chave representa um grupo
 *                   e os valores são caminhos dos arquivos duplicados
 */
export async function deleteDuplicates(duplicatas: Record<string, string[]>) {
  for (const grupo of Object.values(duplicatas)) {
    // Mantém o primeiro arquivo e remove os outros
    const [original, ...copias] = grupo

    for (const arquivo of copias) {
      try {
        await fs.remove(arquivo)
        console.log(`🗑️  Deletado: ${arquivo}`)
      } catch (err) {
        console.warn(`⚠️  Erro ao deletar ${arquivo}:`, err)
      }
    }
  }
}
