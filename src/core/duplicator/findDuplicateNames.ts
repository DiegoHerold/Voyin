import fs from 'fs'
import path from 'path'

/**
 * Encontra arquivos com nomes duplicados dentro de uma pasta (recursivo)
 */
export function findDuplicateNames(diretorio: string): Record<string, string[]> {
  const arquivos: Record<string, string[]> = {}

  function buscar(caminho: string) {
    const itens = fs.readdirSync(caminho, { withFileTypes: true })

    for (const item of itens) {
      const itemPath = path.join(caminho, item.name)

      if (item.isDirectory()) {
        buscar(itemPath)
      } else {
        const lista = arquivos[item.name] ?? []
        lista.push(itemPath)
        arquivos[item.name] = lista
      }
    }
  }

  buscar(path.resolve(diretorio))

  const duplicados = Object.fromEntries(
    Object.entries(arquivos).filter(([_, paths]) => paths.length > 1)
  )

  return duplicados
}
