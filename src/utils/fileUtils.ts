import fs from 'fs-extra'
import path from 'path'

/**
 * Garante que um nome de arquivo seja único no destino.
 * Adiciona sufixo (1), (2)... se já existir.
 * 
 * @param destino Pasta onde será salvo o arquivo
 * @param nomeOriginal Nome do arquivo original
 * @returns Caminho final seguro para o arquivo
 */
export async function gerarCaminhoUnico(destino: string, nomeOriginal: string): Promise<string> {
  let destinoFinal = path.join(destino, nomeOriginal)
  const { name, ext } = path.parse(nomeOriginal)
  let count = 1

  while (await fs.pathExists(destinoFinal)) {
    const novoNome = `${name} (${count})${ext}`
    destinoFinal = path.join(destino, novoNome)
    count++
  }

  return destinoFinal
}

/**
 * Move um arquivo com segurança para uma nova pasta.
 * Evita sobrescrever arquivos duplicados.
 * 
 * @param origem Caminho original do arquivo
 * @param destino Caminho da pasta de destino
 */
export async function moveFileSafe(origem: string, destino: string): Promise<void> {
  const nomeOriginal = path.basename(origem)
  const destinoFinal = await gerarCaminhoUnico(destino, nomeOriginal)
  await fs.ensureDir(destino)
  await fs.move(origem, destinoFinal)
}

/**
 * Copia um arquivo com segurança para uma nova pasta.
 * Evita sobrescrever arquivos duplicados.
 * 
 * @param origem Caminho original do arquivo
 * @param destino Caminho da pasta de destino
 */
export async function copyFileSafe(origem: string, destino: string): Promise<void> {
  const nomeOriginal = path.basename(origem)
  const destinoFinal = await gerarCaminhoUnico(destino, nomeOriginal)
  await fs.ensureDir(destino)
  await fs.copy(origem, destinoFinal)
}
