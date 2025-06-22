export interface MenuOption {
  name: string
  value: string
  next?: string
  action?: () => Promise<void>
}

export interface MenuDefinition {
  label: string
  message: string
  options: MenuOption[]
}
