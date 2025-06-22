import fs from 'fs-extra'
import path from 'path'
import { moveFileToFolder } from './moveFileToFolder.js'

/**
 * Organiza arquivos com base na data de modificação (ano ou ano-mês).
 */
export async function organizeByDate(pastaOrigem: string): Promise<void> {
  const arquivos = await fs.readdir(pastaOrigem)

  for (const nome of arquivos) {
    const caminhoCompleto = path.join(pastaOrigem, nome)
    const stat = await fs.stat(caminhoCompleto)

    if (stat.isFile()) {
      const data = stat.mtime
      const ano = data.getFullYear()
      const mes = String(data.getMonth() + 1).padStart(2, '0')
      const destino = path.join(pastaOrigem, `${ano}-${mes}`)

      await moveFileToFolder(caminhoCompleto, destino)
    }
  }

  console.log('📦 Organização por data concluída!')
}
