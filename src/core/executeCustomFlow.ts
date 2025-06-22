import { filter } from './flows/filter.js'
import { move } from './flows/move.js'
import { removeDuplicates } from './flows/removeDuplicates.js'

type Step = {
  action: string
  [key: string]: any
}

type Flow = {
  name: string
  steps: Step[]
}

// 🔧 Registro de handlers: cada ação aponta para sua função correspondente
const actionHandlers: Record<string, Function> = {
  filter,
  move,
  removeDuplicates
}

/**
 * Executa um fluxo personalizado com base nas etapas definidas.
 * 
 * @param fluxo Objeto contendo o nome e etapas (steps) do fluxo
 */
export async function executeCustomFlow(fluxo: Flow): Promise<void> {
  console.log(`\n🚀 Executando fluxo: ${fluxo.name}\n`)

  let arquivos: string[] = []

  for (const [i, step] of fluxo.steps.entries()) {
    const handler = actionHandlers[step.action]

    if (!handler) {
      console.warn(`⚠️ Etapa não reconhecida: ${step.action}`)
      continue
    }

    console.log(`🔸 Etapa ${i + 1}: ${step.action}`)

    // Se a função espera entrada (ex: arquivos anteriores), passa como parâmetro
    arquivos = await handler(arquivos, step)
  }

  console.log('\n✅ Fluxo concluído com sucesso!\n')
}
