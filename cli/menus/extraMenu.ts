import inquirer from 'inquirer'
import chalk from 'chalk'
import { showCreateCustomFlow } from './createCustomFlow.js'
import { executeCustomFlow } from '../../src/core/executeCustomFlow.js'
import fs from 'fs-extra'
import path from 'path'

const customFlowsPath = path.resolve('flows/custom')

export async function showExtraMenu(): Promise<void> {
  while (true) {
    console.clear()
    console.log(chalk.bold('\n🧪 Funcionalidades Extras'))

    // 🔍 Carrega as funcionalidades salvas
    const arquivos = (await fs.pathExists(customFlowsPath))
      ? await fs.readdir(customFlowsPath)
      : []

    const fluxos = arquivos
      .filter((f) => f.endsWith('.json'))
      .map((f) => ({
        name: `🚀 Executar: ${f.replace('.flow.json', '')}`,
        value: f
      }))

    // 🧩 Monta o menu com itens dinâmicos
    const { option } = await inquirer.prompt({
      name: 'option',
      type: 'list',
      message: 'Escolha uma opção:',
      choices: [
        { name: '➕ Criar nova funcionalidade personalizada', value: 'create' },
        ...fluxos,
        new inquirer.Separator(),
        { name: '⬅ Voltar', value: 'back' }
      ]
    })

    if (option === 'create') {
      await showCreateCustomFlow()
    } else if (option === 'back') {
      break
    } else {
      // Quando escolhe um fluxo salvo
      const fluxo = await fs.readJson(path.join(customFlowsPath, option))
      await executeCustomFlow(fluxo)
      await inquirer.prompt({
        type: 'input',
        name: 'pause',
        message: 'Pressione Enter para continuar...'
        })

    }
  }
}
