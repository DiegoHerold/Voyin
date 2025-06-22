import { MenuDefinition } from './menuTypes.js'
import { mainMenu } from './mainMenu.js'
import { fileMenu } from './fileMenu.js'
import { folderMenu } from './folderMenu.js'
import { organizerMenu } from './organizerMenu.js'
import { reportMenu } from './reportMenu.js'
import { duplicatorMenu } from './duplicatorMenu.js'
import { converterMenu } from './converterMenu.js'
import { extrasMenu } from './extrasMenu.js'

export const menus: Record<string, MenuDefinition> = {
  main: mainMenu,
  file: fileMenu,
  folder: folderMenu,
  organizer: organizerMenu,
  report: reportMenu,
  duplicator: duplicatorMenu,
  converter: converterMenu,
  extras: extrasMenu
}
