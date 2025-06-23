import { loadSettings } from './loadSettings.js'
import { saveSettings } from './saveSettings.js'

/**
 * Atualiza uma configuração específica.
 * Exemplo: updateSetting('appearance.theme', 'light')
 */
export async function updateSetting(path: string, value: any) {
  const settings = await loadSettings()
  const keys = path.split('.')
  let current: any = settings

  for (let i = 0; i < keys.length - 1; i++) {
    current = current[keys[i]]
    if (typeof current !== 'object') return
  }

  current[keys[keys.length - 1]] = value
  await saveSettings(settings)
}
