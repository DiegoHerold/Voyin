import fs from 'fs-extra'
import path from 'path'
import inquirer from 'inquirer'
import { navigateFolders } from './navigateFolders.js'

/**
 * Permite selecionar múltiplos arquivos ou pastas dentro de uma pasta base.
 * @param tipo 'arquivo' | 'pasta' — define se será uma seleção de arquivos ou pastas.
 * @param mensagem Mensagem exibida no topo.
 * @returns Array com os caminhos absolutos dos itens selecionados.
 */
export async function selectMultipleFromFolder(
  tipo: 'arquivo' | 'pasta',
  mensagem = 'Selecione os itens:',
  pastaBase?: string
): Promise<string[]> {
  const base = pastaBase || await navigateFolders('pasta', '📁 Navegue até a pasta base:')
  const itens = await fs.readdir(base, { withFileTypes: true })

  const filtrados = itens.filter((item) =>
    tipo === 'arquivo' ? item.isFile() : item.isDirectory()
  )

  if (filtrados.length === 0) {
    console.log(tipo === 'arquivo'
      ? '⚠️ Nenhum arquivo encontrado na pasta.'
      : '⚠️ Nenhuma subpasta encontrada na pasta.')
    return []
  }

  const resposta = await inquirer.prompt([
    {
      type: 'checkbox',
      name: 'selecionados',
      message: `${mensagem}\n📂 ${base}`,
      choices: filtrados.map((item) => ({
        name: `${tipo === 'arquivo' ? '📄' : '📁'} ${item.name}`,
        value: path.join(base, item.name)
      })),
      validate: (input: string[]) =>
        input.length > 0 || 'Selecione pelo menos um item.'
    }
  ])

  return resposta.selecionados as string[]
}

