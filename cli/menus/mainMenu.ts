import chalk from 'chalk'
import { MenuDefinition } from './menuTypes.js'

export const mainMenu: MenuDefinition = {
  label: 'Principal',
  message: 'Selecione uma opção:',
  options: [
    { name: '📁 Gerenciar Arquivos', value: 'file', next: 'file' },
    { name: '📂 Gerenciar Pastas', value: 'folder', next: 'folder' },
    { name: '🧠 Organizar Arquivos', value: 'organizer', next: 'organizer' },
    { name: '📊 Relatórios', value: 'report', next: 'report' },
    { name: '♻️ Detectar Duplicados', value: 'duplicator', next: 'duplicator' },
    { name: '🔁 Conversores', value: 'converter', next: 'converter' },
    { name: '⚙️ Extras', value: 'extras', next: 'extras' },
    { name: chalk.red('❌ Sair'), value: 'exit', next: 'exit' }
  ]
}
