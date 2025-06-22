import fs from 'fs-extra'
import path from 'path'
import { moveFileToFolder } from './moveFileToFolder.js'

/**
 * Organiza arquivos por prefixo de nome.
 * O prefixo é definido como a parte anterior a um '_' ou '-'.
 */
export async function organizeByName(pastaOrigem: string): Promise<void> {
  const arquivos = await fs.readdir(pastaOrigem)

  for (const nome of arquivos) {
    const caminhoCompleto = path.join(pastaOrigem, nome)
    const stat = await fs.stat(caminhoCompleto)

    if (stat.isFile()) {
      const prefixo = nome.split(/[_-]/)[0].trim()
      const pastaDestino = prefixo || 'outros'
      const destino = path.join(pastaOrigem, pastaDestino)
      await moveFileToFolder(caminhoCompleto, destino)
    }
  }

  console.log('📦 Organização por nome concluída!')
}
