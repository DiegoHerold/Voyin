import { MenuDefinition } from './menuTypes.js'
import { handleDuplicator } from '../actions/index.js'

export const duplicatorMenu: MenuDefinition = {
  label: 'Duplicados',
  message: 'Detectar duplicados:',
  options: [
    { name: 'Abrir menu de duplicados', value: 'run', action: handleDuplicator },
    { name: '🔙 Voltar', value: 'back', next: '..' }
  ]
}
