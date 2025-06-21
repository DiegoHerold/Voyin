import chalk from 'chalk'
import { navigateMenu } from './menus/navigator.js'

console.clear()
console.log(chalk.cyanBright('🚀  Bem-vindo ao ') + chalk.magentaBright.bold('Voyin'))

await navigateMenu('main')
