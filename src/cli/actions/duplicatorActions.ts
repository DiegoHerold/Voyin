import inquirer from 'inquirer'
import chalk from 'chalk'
import {
  findDuplicateNames,
  findDuplicateContents,
  deleteDuplicates,
  groupDuplicates
} from '../../core/duplicator'

export async function handleFindDuplicateNames() {
  const { path } = await inquirer.prompt({ name: 'path', message: 'Pasta para buscar duplicados por nome:' })
  try {
    const dup = findDuplicateNames(path)
    console.log(chalk.blue(JSON.stringify(dup, null, 2)))
  } catch (err) {
    console.error(chalk.red((err as Error).message))
  }
}

export async function handleFindDuplicateContents() {
  const { path } = await inquirer.prompt({ name: 'path', message: 'Pasta para buscar duplicados por conteúdo:' })
  try {
    const dup = findDuplicateContents(path)
    console.log(chalk.blue(JSON.stringify(dup, null, 2)))
  } catch (err) {
    console.error(chalk.red((err as Error).message))
  }
}

export async function handleDeleteDuplicates() {
  const { path } = await inquirer.prompt({ name: 'path', message: 'Pasta onde deletar duplicados (por nome):' })
  try {
    const dup = findDuplicateNames(path)
    await deleteDuplicates(dup)
  } catch (err) {
    console.error(chalk.red((err as Error).message))
  }
}

export async function handleGroupDuplicates() {
  const { path } = await inquirer.prompt({ name: 'path', message: 'Pasta onde agrupar duplicados (por nome):' })
  try {
    const dup = findDuplicateNames(path)
    await groupDuplicates(dup, path)
  } catch (err) {
    console.error(chalk.red((err as Error).message))
  }
}
