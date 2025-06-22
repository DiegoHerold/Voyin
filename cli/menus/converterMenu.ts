import { MenuDefinition } from './menuTypes.js'
import { handleConverter } from '../actions/index.js'

export const converterMenu: MenuDefinition = {
  label: 'Conversores',
  message: 'Converter arquivos:',
  options: [
    { name: 'Converter arquivo', value: 'run', action: handleConverter },
    { name: '🔙 Voltar', value: 'back', next: '..' }
  ]
}
