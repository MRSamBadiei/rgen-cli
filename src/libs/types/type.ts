export type AIModels = 'gemini-2.5-flash'

export interface RGenDefaults {
  base: string
  debug: boolean
  model: AIModels
  /* AI stuff */
  useAI: boolean
}

export type BuildType = 'components' | 'contexts' | 'forms' | 'hooks' | 'layouts' | 'pages' | 'routes' | 'store'

export type RouterFlag = {
  desc?: string
  page?: string
}

export type PageFlag = {
  desc?: string
}

export type ComponentFlag = {
  desc?: string
}

export type FormFlag = {
  page: string
}

export type HookFlag = {
  desc?: string
}

export type LayoutFlag = {
  desc?: string
}

export type AllFlags = ComponentFlag | FormFlag | HookFlag | LayoutFlag | PageFlag | RouterFlag | undefined
