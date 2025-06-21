import { showMainMenu } from './menus/mainMenu'

export async function startCli() {
  console.clear()
  await showMainMenu()
}
