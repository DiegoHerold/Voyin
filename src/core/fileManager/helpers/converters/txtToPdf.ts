import fs from 'fs-extra'
import path from 'path'
import PDFDocument from 'pdfkit'

/**
 * Converte um arquivo de texto (.txt) simples em PDF.
 * 
 * @param caminhoTxt Caminho do arquivo .txt de entrada
 * @param destinoPdf Caminho onde o PDF será salvo
 * @returns Caminho absoluto do PDF gerado
 */
export async function txtToPdf(caminhoTxt: string, destinoPdf: string): Promise<string> {
  const texto = await fs.readFile(caminhoTxt, 'utf-8')

  const doc = new PDFDocument()
  const writeStream = fs.createWriteStream(destinoPdf)
  doc.pipe(writeStream)

  doc.fontSize(12).text(texto, {
    align: 'left',
    lineGap: 4
  })

  doc.end()

  return new Promise((resolve, reject) => {
    writeStream.on('finish', () => resolve(path.resolve(destinoPdf)))
    writeStream.on('error', (err: unknown) => {
      console.error('Erro ao criar PDF:', err)
      reject(err)
    })
  })
}
