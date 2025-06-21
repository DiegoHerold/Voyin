import fs from 'fs'
import path from 'path'

interface PadraoDetectado {
  padrao: 'porExtensao' | 'porPrefixo' | 'porData' | 'desorganizado'
  sugestao: string
  confianca: number // 0 a 100
}

/**
 * Analisa uma pasta e tenta identificar o padrão de organização atual.
 */
export function analyzeFolderPattern(diretorio: string): PadraoDetectado {
  const arquivos = listarArquivos(diretorio)
  if (arquivos.length === 0) {
    return {
      padrao: 'desorganizado',
      sugestao: 'A pasta está vazia.',
      confianca: 100,
    }
  }

  const porExtensao: Record<string, number> = {}
  const prefixos: Record<string, number> = {}
  const datas: Record<string, number> = {}

  for (const arquivo of arquivos) {
    const ext = path.extname(arquivo).toLowerCase()
    porExtensao[ext] = (porExtensao[ext] || 0) + 1

    const nomeBase = path.basename(arquivo)
    const prefix = nomeBase.split(/[_-]/)[0] || ''
    prefixos[prefix] = (prefixos[prefix] || 0) + 1

    const stat = fs.statSync(arquivo)
    const ano = new Date(stat.mtime).getFullYear()
    datas[ano] = (datas[ano] || 0) + 1
  }

  const total = arquivos.length

  const maiorExt = Math.max(...Object.values(porExtensao))
  const maiorPrefix = Math.max(...Object.values(prefixos))
  const maiorData = Math.max(...Object.values(datas))

  if (maiorExt / total > 0.6) {
    return {
      padrao: 'porExtensao',
      sugestao: 'Os arquivos parecem estar organizados por tipo (extensão).',
      confianca: Math.round((maiorExt / total) * 100),
    }
  }

  if (maiorPrefix / total > 0.6) {
    return {
      padrao: 'porPrefixo',
      sugestao: 'Os arquivos seguem um padrão de nomes com prefixo (ex: datas ou nomes).',
      confianca: Math.round((maiorPrefix / total) * 100),
    }
  }

  if (maiorData / total > 0.6) {
    return {
      padrao: 'porData',
      sugestao: 'A maioria dos arquivos é de um ano específico. Pode-se organizar por data.',
      confianca: Math.round((maiorData / total) * 100),
    }
  }

  return {
    padrao: 'desorganizado',
    sugestao: 'Não há padrão claro de organização. Reorganizar por extensão é recomendado.',
    confianca: 50,
  }
}

function listarArquivos(pasta: string): string[] {
  const itens = fs.readdirSync(pasta, { withFileTypes: true })
  let resultado: string[] = []

  for (const item of itens) {
    const caminho = path.join(pasta, item.name)
    if (item.isDirectory()) {
      resultado = resultado.concat(listarArquivos(caminho))
    } else {
      resultado.push(caminho)
    }
  }

  return resultado
}
