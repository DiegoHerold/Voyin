import { MenuDefinition } from './menuTypes.js'
import { handleFile } from '../actions/index.js'

export const fileMenu: MenuDefinition = {
  label: 'Arquivos',
  message: 'Gerenciar arquivos:',
  options: [
    { name: 'Abrir menu de arquivos', value: 'run', action: handleFile },
    { name: '🔙 Voltar', value: 'back', next: '..' }
  ]
}
