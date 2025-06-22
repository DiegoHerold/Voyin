import fs from 'fs-extra'
import path from 'path'

type MoveStep = {
  action: 'move'
  destination: string
}

/**
 * Move arquivos para uma pasta de destino.
 * Se o arquivo já existir no destino, renomeia com sufixo numérico para evitar sobrescrita.
 */
export async function move(arquivos: string[], step: MoveStep): Promise<string[]> {
  const destino = step.destination
  await fs.ensureDir(destino)

  for (const arquivo of arquivos) {
    const nomeOriginal = path.basename(arquivo)
    let destinoFinal = path.join(destino, nomeOriginal)

    let count = 1
    const { name, ext } = path.parse(nomeOriginal)

    while (await fs.pathExists(destinoFinal)) {
      const novoNome = `${name} (${count})${ext}`
      destinoFinal = path.join(destino, novoNome)
      count++
    }

    await fs.move(arquivo, destinoFinal)
    console.log(`📦 Movido: ${nomeOriginal} → ${path.relative(process.cwd(), destinoFinal)}`)
  }

  return [] // retorno vazio porque não precisa passar adiante
}
