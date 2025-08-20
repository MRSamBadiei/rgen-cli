export type AIModels = 'gemini-2.5-flash'

export interface RGenDefaults {
  base: string
  debug: boolean
  /* AI stuff */
  useAI: boolean
  model: AIModels
}

export type BuildType = 'contexts' | 'hooks' | 'routes' | 'layouts' | 'components' | 'pages' | 'store' | 'forms'
