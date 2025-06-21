
import { navigateMenu } from './navigator.js'

export async function displayOrganizerMenu(): Promise<void> {
  await navigateMenu('organizer')
}

export default displayOrganizerMenu
