import { getTotalFilesAndFolders } from './getTotalFilesAndFolders.js'
import { getFolderSizes } from './getFolderSizes.js'
import { getFileTypesSummary } from './getFileTypesSummary.js'
import { getRecentFiles } from './getRecentFiles.js'

/**
 * Gera um relatório completo de uma pasta, com contagem de arquivos/pastas, tamanhos, tipos e arquivos recentes.
 * @param dir Caminho da pasta a ser analisada
 */
export async function generateFullReport(dir: string): Promise<void> {
  console.log(`📁 Relatório da pasta: ${dir}\n`)

  const { files, folders } = await getTotalFilesAndFolders(dir)
  console.log(`📦 Total de arquivos: ${files}`)
  console.log(`📁 Total de subpastas: ${folders}\n`)

  const folderSizes = await getFolderSizes(dir)
  console.log(`📂 Tamanho por pasta:`)
  Object.entries(folderSizes).forEach(([folder, size]) => {
    console.log(`  - ${folder}: ${size} MB`)
  })

  const fileTypes = await getFileTypesSummary(dir)
  console.log(`\n📄 Arquivos por tipo:`)
  Object.entries(fileTypes).forEach(([ext, count]) => {
    console.log(`  - ${ext}: ${count}`)
  })

  const recentFiles = await getRecentFiles(dir)
  console.log(`\n🕒 Arquivos modificados recentemente:`)
  recentFiles.forEach(file => {
    console.log(`  - ${file.name} — ${file.modified.toLocaleDateString()}`)
  })

  console.log('\n✅ Fim do relatório.\n')
}
