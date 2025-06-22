import { MenuDefinition } from './menuTypes.js'
import { handleExtras } from '../actions/index.js'

export const extrasMenu: MenuDefinition = {
  label: 'Extras',
  message: 'Opções extras:',
  options: [
    { name: 'Executar extras', value: 'run', action: handleExtras },
    { name: '🔙 Voltar', value: 'back', next: '..' }
  ]
}
