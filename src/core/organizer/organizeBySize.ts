import fs from 'fs-extra'
import path from 'path'
import { moveFileToFolder } from './moveFileToFolder.js'

/**
 * Organiza arquivos com base no tamanho.
 * - small: até 1MB
 * - medium: entre 1MB e 10MB
 * - large: acima de 10MB
 */
export async function organizeBySize(pastaOrigem: string): Promise<void> {
  const arquivos = await fs.readdir(pastaOrigem)

  for (const nome of arquivos) {
    const caminhoCompleto = path.join(pastaOrigem, nome)
    const stat = await fs.stat(caminhoCompleto)

    if (stat.isFile()) {
      const tamanho = stat.size
      let categoria: string

      if (tamanho <= 1024 * 1024) {
        categoria = 'small'
      } else if (tamanho <= 10 * 1024 * 1024) {
        categoria = 'medium'
      } else {
        categoria = 'large'
      }

      const destino = path.join(pastaOrigem, categoria)
      await moveFileToFolder(caminhoCompleto, destino)
    }
  }

  console.log('📦 Organização por tamanho concluída!')
}
