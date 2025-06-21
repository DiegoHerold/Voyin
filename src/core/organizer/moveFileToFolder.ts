import fs from 'fs-extra'
import path from 'path'

/**
 * Move um arquivo para uma pasta, garantindo que a pasta exista.
 * Se já existir um arquivo com o mesmo nome, adiciona um sufixo numérico.
 */
export async function moveFileToFolder(caminhoArquivo: string, pastaDestino: string): Promise<void> {
  await fs.ensureDir(pastaDestino)

  const nomeArquivo = path.basename(caminhoArquivo)
  let destino = path.join(pastaDestino, nomeArquivo)

  let contador = 1
  while (await fs.pathExists(destino)) {
    const { name, ext } = path.parse(nomeArquivo)
    const novoNome = `${name}_${contador}${ext}`
    destino = path.join(pastaDestino, novoNome)
    contador++
  }

  await fs.move(caminhoArquivo, destino)
}
