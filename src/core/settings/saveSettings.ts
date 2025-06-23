import fs from 'fs-extra'
import path from 'path'

const settingsPath = path.resolve('data/settings.json')

export async function saveSettings(updatedSettings: any) {
  try {
    await fs.outputJson(settingsPath, updatedSettings, { spaces: 2 })
  } catch (error) {
    console.error('Erro ao salvar configurações:', error)
  }
}
