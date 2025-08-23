import {Command} from '@oclif/core'
import chalk from 'chalk'
import fs from 'node:fs'
import path from 'node:path'

import Build from './build.js'

export default class Context<T extends undefined> extends Build<T> {
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
      }(undefined)\n`

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
export const ${this.uname}Provider = ({ children }${this.typescript ? ': Props' : ''})${
        this.typescript ? ': React.JSX.Element' : ''
      } => {
  const [state, setState] = useState${this.typescript ? '<unknown>' : ''}(null)

  const value${this.typescript ? `: ${this.uname}ContextValue` : ''} = { state, setState }

  return <${this.uname}Context.Provider value={value}>{children}</${this.uname}Context.Provider>
}\n`

      const useTemplate = `import { useContext } from 'react'
import { ${this.uname}Context } from './${this.uname}Context'${
        this.typescript ? `\nimport { type ${this.uname}ContextValue } from './types'` : ''
      }

export function use${this.uname}()${this.typescript ? `: ${this.uname}ContextValue` : ''} {
  const context = useContext(${this.uname}Context)
  if (!context) {
    throw new Error('use${this.uname} must be used within a ${this.uname}Provider')
  }
  return context
}\n`

      const typeTemplate = `export interface ${this.uname}ContextValue {
  state: unknown
  setState: React.Dispatch<React.SetStateAction<unknown>>
}\n`

      const indexTemplate = `export * from './${this.uname}Context'
export * from './${this.uname}Provider'
export * from './use${this.uname}'
export * from './types'\n`

      const contextPath = path.join(this.baseDir, `${this.uname}Context.${this.typescript ? 'tsx' : 'jsx'}`)
      const providerPath = path.join(this.baseDir, `${this.uname}Provider.${this.typescript ? 'tsx' : 'jsx'}`)
      const usePath = path.join(this.baseDir, `use${this.uname}.${this.typescript ? 'ts' : 'js'}`)
      const typePath = path.join(this.baseDir, 'types.ts')
      const indexPath = path.join(this.baseDir, `index.${this.typescript ? 'ts' : 'js'}`)

      if (fs.existsSync(usePath)) {
        this.cmd.error(`${chalk.blue('[X]')} Already exists! - ${chalk.blue(usePath)}`)
      }

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
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.cmd.error(error)
      }
    }
  }
}
