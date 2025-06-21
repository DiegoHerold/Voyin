
import { navigateMenu } from './navigator.js'

export async function displayFolderMenu(): Promise<void> {
  await navigateMenu('folder')
}

export default displayFolderMenu
