
import { navigateMenu } from './navigator.js'

export async function displayFileMenu(): Promise<void> {
  await navigateMenu('file')
}

export default displayFileMenu
