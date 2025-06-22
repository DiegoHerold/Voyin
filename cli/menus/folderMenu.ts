import { MenuDefinition } from './menuTypes.js'
import { handleFolder } from '../actions/index.js'

export const folderMenu: MenuDefinition = {
  label: 'Pastas',
  message: 'Gerenciar pastas:',
  options: [
    { name: 'Abrir menu de pastas', value: 'run', action: handleFolder },
    { name: '🔙 Voltar', value: 'back', next: '..' }
  ]
}
