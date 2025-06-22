// Menu definitions for the CLI
import chalk from 'chalk'
import {
  handleFile,
  handleFolder,
  handleOrganizer,
  handleReport,
  handleDuplicator,
  handleConverter,
  handleExtras
} from '../actions/index.js'

export interface MenuOption {
  name: string
  value: string
  next?: string
  action?: () => Promise<void>
}

export interface MenuDefinition {
  label: string
  message: string
  options: MenuOption[]
}

export const menus: Record<string, MenuDefinition> = {
  main: {
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
  },
  file: {
    label: 'Arquivos',
    message: 'Gerenciar arquivos:',
    options: [
      { name: 'Abrir menu de arquivos', value: 'run', action: handleFile },
      { name: '🔙 Voltar', value: 'back', next: '..' }
    ]
  },
  folder: {
    label: 'Pastas',
    message: 'Gerenciar pastas:',
    options: [
      { name: 'Abrir menu de pastas', value: 'run', action: handleFolder },
      { name: '🔙 Voltar', value: 'back', next: '..' }
    ]
  },
  organizer: {
    label: 'Organizador',
    message: 'Organizar arquivos:',
    options: [
      { name: 'Abrir menu do organizador', value: 'run', action: handleOrganizer },
      { name: '🔙 Voltar', value: 'back', next: '..' }
    ]
  },
  report: {
    label: 'Relatórios',
    message: 'Gerar relatórios:',
    options: [
      { name: 'Gerar relatório', value: 'run', action: handleReport },
      { name: '🔙 Voltar', value: 'back', next: '..' }
    ]
  },
  duplicator: {
    label: 'Duplicados',
    message: 'Detectar duplicados:',
    options: [
      { name: 'Abrir menu de duplicados', value: 'run', action: handleDuplicator },
      { name: '🔙 Voltar', value: 'back', next: '..' }
    ]
  },
  converter: {
    label: 'Conversores',
    message: 'Converter arquivos:',
    options: [
      { name: 'Converter arquivo', value: 'run', action: handleConverter },
      { name: '🔙 Voltar', value: 'back', next: '..' }
    ]
  },
  extras: {
    label: 'Extras',
    message: 'Opções extras:',
    options: [
      { name: 'Executar extras', value: 'run', action: handleExtras },
      { name: '🔙 Voltar', value: 'back', next: '..' }
    ]
  }
}
;
