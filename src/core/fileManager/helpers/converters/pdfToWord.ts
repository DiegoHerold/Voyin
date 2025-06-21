import fs from 'fs-extra'
import path from 'path'
import libre from 'libreoffice-convert'

/**
 * Converte um arquivo PDF para DOCX usando LibreOffice.
 * 
 * @param caminhoPdf Caminho do arquivo PDF de entrada
 * @param destinoDocx Caminho onde o DOCX será salvo
 * @returns Caminho absoluto do arquivo gerado
 */
export async function pdfToWord(caminhoPdf: string, destinoDocx: string): Promise<string> {
  const pdfBuffer = await fs.readFile(caminhoPdf)

  return new Promise((resolve, reject) => {
    libre.convert(pdfBuffer, '.docx', undefined, async (err, done) => {
      if (err) {
        console.error('Erro na conversão PDF → Word:', err)
        return reject(err)
      }

      await fs.outputFile(destinoDocx, done)
      resolve(path.resolve(destinoDocx))
    })
  })
}
