import fs from 'fs-extra'
import path from 'path'
import { moveFileToFolder } from './moveFileToFolder'

/**
 * Organiza os arquivos de uma pasta baseando-se na extensão dos arquivos.
 * Cria subpastas como /pdf/, /jpg/, /docx/ etc.
 */
export async function organizeByExtension(pastaOrigem: string): Promise<void> {
  const arquivos = await fs.readdir(pastaOrigem)

  for (const nome of arquivos) {
    const caminhoCompleto = path.join(pastaOrigem, nome)
    const stat = await fs.stat(caminhoCompleto)

    if (stat.isFile()) {
      const ext = path.extname(nome).replace('.', '').toLowerCase() || 'sem_extensao'
      const destino = path.join(pastaOrigem, ext)
      await moveFileToFolder(caminhoCompleto, destino)
    }
  }

  console.log('📦 Organização por extensão concluída!')
}
