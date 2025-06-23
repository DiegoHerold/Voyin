import { loadSettings } from './core/settings/loadSettings.js'
import { startCli } from '../cli/index.js'

async function start() {
  await loadSettings() // Carrega ou gera o settings.json automaticamente
  await startCli()     // Inicia o CLI com tudo pronto
}

start()
