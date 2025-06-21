
import { navigateMenu } from './navigator.js'

export async function displayExtrasMenu(): Promise<void> {
  await navigateMenu('extras')
}

export default displayExtrasMenu
