import path from 'path'
import { listFolderRecursive } from '../../utils/listFolderRecursive.js'

type FilterStep = {
  action: 'filter'
  criteria: {
    extensions: string[]
  }
}

/**
 * Etapa de filtro: busca arquivos por extensão.
 * Retorna os arquivos encontrados para a próxima etapa do fluxo.
 */
export async function filter(_: string[], step: FilterStep): Promise<string[]> {
  const diretorioAlvo = process.cwd() // por padrão, pasta atual
  const todasExtensoes = step.criteria.extensions.map((ext) => ext.toLowerCase().trim())

  const todosArquivos = await listFolderRecursive(diretorioAlvo)

  const filtrados = todosArquivos.filter((arquivo: string) => {
  const ext = path.extname(arquivo).toLowerCase()
  return todasExtensoes.includes(ext)
})


  console.log(`📂 ${filtrados.length} arquivos encontrados com as extensões: ${todasExtensoes.join(', ')}`)
  return filtrados
}
