import inquirer from 'inquirer'
import chalk from 'chalk'
import fs from 'fs-extra'
import path from 'path'

const configPath = path.resolve('settings.json')

export async function showSettingsMenu(): Promise<void> {
  console.clear()
  console.log(chalk.bold.cyan('\n⚙️  Configurações do Voyin\n'))

  const { section } = await inquirer.prompt([
    {
      type: 'list',
      name: 'section',
      message: 'Escolha uma seção para configurar:',
      pageSize: 20,
      choices: [
        { name: '👤 Conta de Usuário', value: 'user' },
        { name: '📁 Caminhos Padrão', value: 'paths' },
        { name: '⚙️  Comportamento', value: 'behavior' },
        { name: '🚀 Performance', value: 'performance' },
        { name: '🎨 Aparência', value: 'appearance' },
        { name: '🌐 Rede', value: 'network' },
        { name: '🔄 Atualizações', value: 'updates' },
        { name: '🧪 Diagnóstico', value: 'diagnostics' },
        { name: '💻 CLI e Atalhos', value: 'cli' },
        new inquirer.Separator(),
        { name: chalk.red('⬅ Voltar'), value: 'back' }
      ]
    }
  ])

  if (section === 'back') return

  await configureSection(section)
  await showSettingsMenu()
}

async function configureSection(section: string) {
  const settings = await loadSettings()

  switch (section) {
    case 'user':
      const user = await inquirer.prompt([
        { type: 'input', name: 'githubUsername', message: 'GitHub: Nome de usuário:', default: settings.user.githubUsername },
        { type: 'password', name: 'githubToken', message: 'GitHub: Token pessoal (opcional):', mask: '*', default: settings.user.githubToken },
        { type: 'confirm', name: 'autoLogin', message: 'Login automático?', default: settings.user.autoLogin }
      ])
      settings.user = user
      break

    case 'paths':
      const paths = await inquirer.prompt([
        { type: 'input', name: 'defaultWorkspace', message: 'Pasta de trabalho padrão:', default: settings.paths.defaultWorkspace },
        { type: 'input', name: 'defaultExportPath', message: 'Pasta para exportações:', default: settings.paths.defaultExportPath },
        { type: 'confirm', name: 'rememberLastFolder', message: 'Lembrar última pasta usada?', default: settings.paths.rememberLastFolder }
      ])
      settings.paths = paths
      break

    case 'appearance':
      const appearance = await inquirer.prompt([
        { type: 'list', name: 'theme', message: 'Tema do terminal:', choices: ['dark', 'light'], default: settings.appearance.theme },
        { type: 'confirm', name: 'useEmoji', message: 'Mostrar emojis no terminal?', default: settings.appearance.useEmoji },
        { type: 'confirm', name: 'showFullPaths', message: 'Mostrar caminhos completos?', default: settings.appearance.showFullPaths }
      ])
      settings.appearance = appearance
      break

    // ⚙️ Você pode adicionar os outros casos como 'behavior', 'updates', 'cli', etc. com base no modelo acima

    default:
      console.log(chalk.red('⚠️ Configuração ainda não implementada.'))
      return
  }

  await saveSettings(settings)
  console.log(chalk.green('\n✅ Configuração salva com sucesso!\n'))
}

async function loadSettings() {
  try {
    return await fs.readJson(configPath)
  } catch {
    return {
      user: {}, paths: {}, appearance: {}, behavior: {},
      performance: {}, network: {}, updates: {}, diagnostics: {}, cli: {}
    }
  }
}

async function saveSettings(data: any) {
  await fs.writeJson(configPath, data, { spaces: 2 })
}
