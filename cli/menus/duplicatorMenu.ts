
import { navigateMenu } from './navigator.js'

export async function displayDuplicatorMenu(): Promise<void> {
  await navigateMenu('duplicator')
}

export default displayDuplicatorMenu
