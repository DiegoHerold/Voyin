import chalk from 'chalk'
import { displayMainMenu } from './menus/mainMenu.js'

console.clear()
console.log(chalk.cyanBright('🚀  Bem-vindo ao ') + chalk.magentaBright.bold('Voyin'))

await displayMainMenu()
