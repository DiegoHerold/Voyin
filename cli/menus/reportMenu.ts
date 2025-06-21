
import { navigateMenu } from './navigator.js'

export async function displayReportMenu(): Promise<void> {
  await navigateMenu('report')
}

export default displayReportMenu
