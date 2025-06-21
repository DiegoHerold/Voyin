import { navigateMenu } from './navigator.js'

export async function displayMainMenu(): Promise<void> {
  await navigateMenu('main')
}

export default displayMainMenu
