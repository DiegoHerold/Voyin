import fs from 'fs-extra'
import path from 'path'
import { getFileHash } from '../../utils/hashUtils.js'

type RemoveDuplicatesStep = {
  action: 'removeDuplicates'
  mode: Array<'name' | 'content'>
}

/**
 * Remove arquivos duplicados com base em nome, conteúdo (hash), ou ambos.
 * Retorna apenas os arquivos únicos.
 */
export async function removeDuplicates(
  arquivos: string[],
  step: RemoveDuplicatesStep
): Promise<string[]> {
  const { mode } = step

  const vistosPorNome = new Set<string>()
  const vistosPorHash = new Set<string>()
  const resultado: string[] = []

  for (const caminho of arquivos) {
    const nome = path.basename(caminho)
    const usarNome = mode.includes('name')
    const usarHash = mode.includes('content')

    let duplicado = false

    if (usarNome && vistosPorNome.has(nome)) {
      duplicado = true
    }

    if (usarHash) {
      const hash = await getFileHash(caminho)
      if (vistosPorHash.has(hash)) {
        duplicado = true
      } else {
        vistosPorHash.add(hash)
      }
    }

    if (!duplicado) {
      if (usarNome) vistosPorNome.add(nome)
      resultado.push(caminho)
    }
  }

  console.log(`🧹 ${arquivos.length - resultado.length} arquivos duplicados removidos`)
  return resultado
}
