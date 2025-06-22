import { showMainMenu } from './menus/mainMenu.js';

export async function startCli() {
  console.clear()
  await showMainMenu()
}
