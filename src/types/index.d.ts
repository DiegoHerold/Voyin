declare module 'image-to-pdf' {
  const imageToPdf: (
    images: string[],
    options?: { format?: string }
  ) => import('stream').Readable

  export default imageToPdf
}

/**
 * Resultado padrão para operações em arquivos
 */
export interface FileOperationResult {
  success: boolean
  message: string
  path?: string
}

/**
 * Parâmetros para renomear arquivos
 */
export interface RenameParams {
  currentPath: string
  newName: string
}

/**
 * Parâmetros para mover ou copiar arquivos
 */
export interface MoveCopyParams {
  sourcePath: string
  destinationDir: string
}

/**
 * Parâmetros para atualização de arquivos
 */
export interface UpdateFileParams {
  targetFile: string
  contentOrSource: string
  isPath?: boolean
}
