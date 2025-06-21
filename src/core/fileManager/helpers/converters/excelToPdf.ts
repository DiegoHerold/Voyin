import fs from 'fs-extra'
import path from 'path'
import libre from 'libreoffice-convert'

/**
 * Converte um arquivo Excel para PDF usando LibreOffice.
 * 
 * @param caminhoExcel Caminho do arquivo Excel
 * @param pastaSaida Pasta onde o PDF convertido será salvo
 * @returns Caminho do arquivo PDF gerado
 */
export async function excelToPdf(caminhoExcel: string, pastaSaida: string): Promise<string> {
  const buffer = await fs.readFile(caminhoExcel)

  const pdfBuffer: Buffer = await new Promise((resolve, reject) => {
    libre.convert(buffer, '.pdf', undefined, (err, done) => {
      if (err) {
        reject(`Erro ao converter Excel para PDF: ${err}`)
      } else {
        resolve(done)
      }
    })
  })

  const nomeBase = path.basename(caminhoExcel, path.extname(caminhoExcel))
  const destinoPdf = path.join(pastaSaida, `${nomeBase}.pdf`)
  await fs.writeFile(destinoPdf, pdfBuffer)

  return destinoPdf
}
