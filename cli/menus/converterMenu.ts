
import { navigateMenu } from './navigator.js'

export async function displayConverterMenu(): Promise<void> {
  await navigateMenu('converter')
}

export default displayConverterMenu
