import path from 'node:path'
import fs from 'node:fs'
import Build from './build.js'
import {Command} from '@oclif/core'
import chalk from 'chalk'

export default class Context extends Build {
  constructor(cmd: Command, name: string) {
    super(cmd, name, 'contexts')
  }

  async setup() {
    try {
      await this.init()

      // * Context Template

      const contextTemplate = `import { createContext } from 'react'
${this.typescript ? `import { type ${this.uname}ContextValue } from './types'\n` : ''}
export const ${this.uname}Context = createContext${
        this.typescript ? `<${this.uname}ContextValue | undefined>` : ''
      }(undefined)`

      // * Provider Template

      const providerTemplate = `import { ${this.typescript ? `type ReactNode, ` : ''}useState } from 'react'
import { ${this.uname}Context } from './${this.uname}Context'
${
  this.typescript
    ? `import { type ${this.uname}ContextValue } from './types'\ninterface Props {
  children: ReactNode
}\n`
    : ''
}
export const ${this.uname}Provider = ({ children }${this.typescript ? ' : Props' : ''}) => {
  const [state, setState] = useState${this.typescript ? '<any>' : ''}(null)

  const value${this.typescript ? `: ${this.uname}ContextValue` : ''} = { state, setState }

  return (
      <${this.uname}Context.Provider value={value}>
        { children }
      </${this.uname}Context.Provider>
  )
}`

      const useTemplate = `import { useContext } from 'react'
import { ${this.uname}Context } from './${this.uname}Context'

export function use${this.uname}() {
  const context = useContext(${this.uname}Context)
  if(!context){
      throw new Error('use${this.uname} must be used within a ${this.uname}Provider')
  }
  return context
}`

      const typeTemplate = `export interface ${this.uname}ContextValue {
  state: any,
  setState: React.Dispatch<React.SetStateAction<any>>
}`

      const indexTemplate = `export * from './${this.uname}Context'
export * from './${this.uname}Provider'
export * from './use${this.uname}'
export * from './types'`

      const contextPath = path.join(this.baseDir, `${this.uname}Context.${this.typescript ? 'tsx' : 'jsx'}`)
      const providerPath = path.join(this.baseDir, `${this.uname}Provider.${this.typescript ? 'tsx' : 'jsx'}`)
      const usePath = path.join(this.baseDir, `use${this.uname}.${this.typescript ? 'ts' : 'js'}`)
      const typePath = path.join(this.baseDir, 'types.ts')
      const indexPath = path.join(this.baseDir, `index.${this.typescript ? 'ts' : 'js'}`)

      fs.writeFileSync(contextPath, contextTemplate)
      fs.writeFileSync(providerPath, providerTemplate)
      fs.writeFileSync(usePath, useTemplate)
      if (this.typescript) {
        fs.writeFileSync(typePath, typeTemplate)
      }
      fs.writeFileSync(indexPath, indexTemplate)

      this.cmd.log(`${chalk.blue('[+]')} Creating new ${this.uname}Context - ${chalk.blue(contextPath)}`)
      this.cmd.log(`${chalk.blue('[+]')} Creating new ${this.uname}Provider - ${chalk.blue(providerPath)}`)
      this.cmd.log(`${chalk.blue('[+]')} Creating new use${this.uname} - ${chalk.blue(usePath)}`)
      if (this.typescript) {
        this.cmd.log(`${chalk.blue('[+]')} Creating new types - ${chalk.blue(typePath)}`)
      }
      this.cmd.log(`${chalk.blue('[+]')} Creating new index - ${chalk.blue(indexPath)}`)
    } catch (err: unknown) {
      if (err instanceof Error) {
        this.cmd.error(err)
      }
    }
  }
}
