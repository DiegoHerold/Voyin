import { MenuDefinition } from './menuTypes.js'
import { handleOrganizer } from '../actions/index.js'

export const organizerMenu: MenuDefinition = {
  label: 'Organizador',
  message: 'Organizar arquivos:',
  options: [
    { name: 'Abrir menu do organizador', value: 'run', action: handleOrganizer },
    { name: '🔙 Voltar', value: 'back', next: '..' }
  ]
}
