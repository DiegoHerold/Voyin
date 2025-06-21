import fs from 'fs'
import path from 'path'
import crypto from 'crypto'

/**
 * Calcula o hash SHA-256 do conteúdo de um arquivo
 */
function calcularHash(arquivo: string): string {
  const buffer = fs.readFileSync(arquivo)
  return crypto.createHash('sha256').update(buffer).digest('hex')
}

/**
 * Encontra arquivos com o mesmo conteúdo, mesmo com nomes diferentes
 */
export function findDuplicateContents(diretorio: string): Record<string, string[]> {
  const arquivosPorHash: Record<string, string[]> = {}

  function buscar(caminho: string) {
    const itens = fs.readdirSync(caminho, { withFileTypes: true })

    for (const item of itens) {
      const itemPath = path.join(caminho, item.name)

      if (item.isDirectory()) {
        buscar(itemPath)
      } else {
        try {
          const hash = calcularHash(itemPath)
          if (!arquivosPorHash[hash]) arquivosPorHash[hash] = []
          arquivosPorHash[hash].push(itemPath)
        } catch (e) {
          console.warn(`Erro ao ler ${itemPath}:`, e)
        }
      }
    }
  }

  buscar(path.resolve(diretorio))

  const duplicados = Object.fromEntries(
    Object.entries(arquivosPorHash).filter(([_, paths]) => paths.length > 1)
  )

  return duplicados
}
