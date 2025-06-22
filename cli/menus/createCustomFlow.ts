import inquirer from 'inquirer'
import fs from 'fs-extra'
import path from 'path'

const customFlowsPath = path.resolve('flows/custom')

type Step = {
  action: string
  [key: string]: any
}

export async function showCreateCustomFlow(): Promise<void> {
  console.clear()
  console.log('🛠️ Criar nova funcionalidade personalizada\n')

  const { name } = await inquirer.prompt({
    type: 'input',
    name: 'name',
    message: '📛 Nome da funcionalidade:'
  })

  const steps: Step[] = []

  while (true) {
    const { action } = await inquirer.prompt({
      type: 'list',
      name: 'action',
      message: '➕ Escolha a próxima etapa:',
      choices: [
        { name: '🔍 Filtrar arquivos por extensão', value: 'filter' },
        { name: '🧹 Remover arquivos duplicados', value: 'removeDuplicates' },
        { name: '📂 Mover arquivos para outra pasta', value: 'move' },
        { name: '📝 Renomear arquivos (em breve)', value: 'rename', disabled: true },
        { name: '🔁 Converter arquivos (em breve)', value: 'convert', disabled: true },
        { name: '📊 Gerar relatório (em breve)', value: 'report', disabled: true },
        new inquirer.Separator(),
        { name: '✅ Finalizar e salvar fluxo', value: 'finalizar' },
        { name: '❌ Cancelar criação', value: 'cancelar' }
      ]
    })

    if (action === 'cancelar') return
    if (action === 'finalizar') break

    if (action === 'filter') {
      const { extensoes } = await inquirer.prompt({
        type: 'input',
        name: 'extensoes',
        message: 'Extensões separadas por vírgula (ex: .pdf, .ptx):'
      })

      steps.push({
        action: 'filter',
        criteria: {
          extensions: extensoes.split(',').map((ext: string) => ext.trim().toLowerCase())
        }
      })
    }

    if (action === 'removeDuplicates') {
      const { modos } = await inquirer.prompt({
        type: 'checkbox',
        name: 'modos',
        message: 'Critérios de duplicidade:',
        choices: [
          { name: '🔁 Mesmo nome', value: 'name' },
          { name: '🔐 Mesmo conteúdo (hash)', value: 'content' }
        ]
      })

      steps.push({
        action: 'removeDuplicates',
        mode: modos
      })
    }

    if (action === 'move') {
      const { destino } = await inquirer.prompt({
        type: 'input',
        name: 'destino',
        message: 'Caminho da pasta de destino (ex: C:/destino):'
      })

      steps.push({
        action: 'move',
        destination: destino
      })
    }

    // Aqui você pode continuar adicionando etapas futuras de forma simples
  }

  const fluxo = { name, steps }
  const filename = name.toLowerCase().replace(/[^a-z0-9]/gi, '-').replace(/-+/g, '-') + '.flow.json'
  const savePath = path.join(customFlowsPath, filename)

  await fs.ensureDir(customFlowsPath)
  await fs.writeJson(savePath, fluxo, { spaces: 2 })

  console.log(`\n✅ Fluxo salvo com sucesso em: flows/custom/${filename}`)
  await inquirer.prompt({
  type: 'input',
  name: 'pause',
  message: 'Pressione Enter para continuar...'
})

}
