import fs from 'fs-extra'
import path from 'path'
import { defaultSettings } from './settingsSchema.js'

const settingsPath = path.resolve('data/settings.json')

export async function loadSettings() {
  try {
    if (await fs.pathExists(settingsPath)) {
      const data = await fs.readJson(settingsPath)
      return { ...defaultSettings, ...data } // merge com padrão
    } else {
      await fs.outputJson(settingsPath, defaultSettings, { spaces: 2 })
      return defaultSettings
    }
  } catch (error) {
    console.error('Erro ao carregar configurações:', error)
    return defaultSettings
  }
}
