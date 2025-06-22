import { MenuDefinition } from './menuTypes.js'
import { handleReport } from '../actions/index.js'

export const reportMenu: MenuDefinition = {
  label: 'Relatórios',
  message: 'Gerar relatórios:',
  options: [
    { name: 'Gerar relatório', value: 'run', action: handleReport },
    { name: '🔙 Voltar', value: 'back', next: '..' }
  ]
}
