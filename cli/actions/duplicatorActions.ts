import inquirer from 'inquirer'
import chalk from 'chalk'
import { findDuplicateNames } from '../../src/core/duplicator/findDuplicateNames.js'
import { findDuplicateContents } from '../../src/core/duplicator/findDuplicateContents.js'
import { deleteDuplicates } from '../../src/core/duplicator/deleteDuplicates.js'
import { groupDuplicates } from '../../src/core/duplicator/groupDuplicates.js'
import { navigateFolders } from '../helpers/navigateFolders.js'

export async function handleFindDuplicateNames() {
  const path = await navigateFolders('pasta', '📂 Selecione a pasta para buscar duplicados por nome:')
  try {
    const dup = findDuplicateNames(path)
    console.log(chalk.blue(JSON.stringify(dup, null, 2)))
  } catch (err) {
    console.error(chalk.red((err as Error).message))
  }
}

export async function handleFindDuplicateContents() {
  const path = await navigateFolders('pasta', '📂 Selecione a pasta para buscar duplicados por conteúdo:')
  try {
    const dup = findDuplicateContents(path)
    console.log(chalk.blue(JSON.stringify(dup, null, 2)))
  } catch (err) {
    console.error(chalk.red((err as Error).message))
  }
}

export async function handleDeleteDuplicates() {
  const path = await navigateFolders('pasta', '📂 Selecione a pasta onde deletar duplicados (por nome):')
  try {
    const dup = findDuplicateNames(path)
    await deleteDuplicates(dup)
  } catch (err) {
    console.error(chalk.red((err as Error).message))
  }
}

export async function handleGroupDuplicates() {
  const path = await navigateFolders('pasta', '📂 Selecione a pasta onde agrupar duplicados (por nome):')
  try {
    const dup = findDuplicateNames(path)
    await groupDuplicates(dup, path)
  } catch (err) {
    console.error(chalk.red((err as Error).message))
  }
}
