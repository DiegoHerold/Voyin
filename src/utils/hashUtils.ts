import fs from 'fs-extra'
import crypto from 'crypto'

/**
 * Gera um hash SHA-256 para o conteúdo de um arquivo.
 * 
 * @param filePath Caminho completo do arquivo
 * @returns Hash em hexadecimal
 */
export async function getFileHash(filePath: string): Promise<string> {
  const buffer = await fs.readFile(filePath)
  const hash = crypto.createHash('sha256').update(buffer).digest('hex')
  return hash
}
