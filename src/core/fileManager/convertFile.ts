import {
  pdfToPng,
  pdfToWord,
  wordToPdf,
  excelToPdf,
  txtToPdf
} from './helpers/converters'

type ConversionType =
  | 'pdfToPng'
  | 'pdfToWord'
  | 'wordToPdf'
  | 'pngToPdf'
  | 'excelToPdf'
  | 'pdfToText'
  | 'txtToPdf'

interface ConversionOptions {
  input: string
  output: string
  type: ConversionType
}

export async function convertFile({ input, output, type }: ConversionOptions): Promise<string | string[] | void> {
  switch (type) {
    case 'pdfToPng':
      return await pdfToPng(input, output)
    case 'pdfToWord':
      return await pdfToWord(input, output)
    case 'wordToPdf':
      return await wordToPdf(input, output)
    case 'excelToPdf':
      return await excelToPdf(input, output)
    case 'txtToPdf':
      return await txtToPdf(input, output)
    default:
      throw new Error(`Conversão não suportada: ${type}`)
  }
}
