import fs from 'fs-extra'
import path from 'path'
import libre from 'libreoffice-convert'

/**
 * Converte um documento Word (.docx) em PDF usando LibreOffice.
 * 
 * @param caminhoDocx Caminho do arquivo DOCX de entrada
 * @param destinoPdf Caminho onde o PDF será salvo
 * @returns Caminho absoluto do PDF gerado
 */
export async function wordToPdf(caminhoDocx: string, destinoPdf: string): Promise<string> {
  const docxBuffer = await fs.readFile(caminhoDocx)

  return new Promise((resolve, reject) => {
    libre.convert(docxBuffer, '.pdf', undefined, async (err, buffer) => {
      if (err) {
        console.error('Erro ao converter Word para PDF:', err)
        return reject(err)
      }

      await fs.outputFile(destinoPdf, buffer)
      resolve(path.resolve(destinoPdf))
    })
  })
}
