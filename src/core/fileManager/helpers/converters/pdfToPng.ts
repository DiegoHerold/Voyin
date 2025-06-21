import { fromPath } from 'pdf2pic'
import path from 'path'
import fs from 'fs-extra'

/**
 * Converte um PDF em PNGs (uma imagem por página).
 * 
 * @param caminhoPdf Caminho do arquivo PDF de entrada
 * @param pastaSaida Pasta onde as imagens PNG serão salvas
 * @returns Lista de caminhos das imagens geradas
 */
export async function pdfToPng(caminhoPdf: string, pastaSaida: string): Promise<string[]> {
  const nomeBase = path.basename(caminhoPdf, path.extname(caminhoPdf))
  const resolvedSaida = path.resolve(pastaSaida)

  await fs.ensureDir(resolvedSaida)

  const converter = fromPath(caminhoPdf, {
    density: 150,
    saveFilename: nomeBase,
    savePath: resolvedSaida,
    format: 'png',
    width: 1200,
    height: 1600
  })

  // Mesmo usando 'buffer', os arquivos ainda são salvos se savePath for definido
  await converter.bulk(-1, { responseType: 'buffer' })

  // Construir nomes dos arquivos com base no padrão gerado
  // Ex: nomeBase_1.png, nomeBase_2.png, ...
  const arquivosSalvos: string[] = []

  let i = 1
  while (true) {
    const caminho = path.join(resolvedSaida, `${nomeBase}_${i}.png`)
    if (await fs.pathExists(caminho)) {
      arquivosSalvos.push(caminho)
      i++
    } else {
      break
    }
  }

  return arquivosSalvos
}
