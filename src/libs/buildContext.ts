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

      const contextTs = `import { createContext } from 'react'
import { type ${this.uname}ContextValue } from './types'

export const ${this.uname}Context = createContext<${this.uname}ContextValue | undefined>(undefined)`

      const contextJs = `import { createContext } from 'react'

export const ${this.uname}Context = createContext(undefined)`

      const providerTs = `import { type ReactNode, useState } from 'react'
import { ${this.uname}Context } from './${this.uname}Context'
import { type ${this.uname}ContextValue } from './types'

interface Props {
  children: ReactNode
}
      
export const ${this.uname}Provider = ({ children } : Props) => {
  const [state, setState] = useState<any>(null)

  const value: ${this.uname}ContextValue = { state, setState}

  return (
      <${this.uname}Context.Provider value={value}>
        {children}
      </${this.uname}Context.Provider>
  )
}`

      const providerJs = `import { ReactNode, useState } from 'react'
import { ${this.uname}Context } from './${this.uname}Context'
      
export const ${this.uname}Provider = ({ children }) => {
  const [state, setState] = useState(null)

  const value = { state, setState}

  return (
      <${this.uname}Context.Provider value={value}>
        {children}
      </${this.uname}Context.Provider>
  )
}`

      const use = `import { useContext } from 'react'
import { ${this.uname}Context } from './${this.uname}Context'

export function use${this.uname}() {
  const context = useContext(${this.uname}Context)
  if(!context){
      throw new Error('use${this.uname} must be used within a ${this.uname}Provider')
  }
  return context
}`

      const typeTs = `export interface ${this.uname}ContextValue {
  state: any,
  setState: React.Dispatch<React.SetStateAction<any>>
}`

      const index = `export * from './${this.uname}Context'
export * from './${this.uname}Provider'
export * from './use${this.uname}'
export * from './types'`

      const contextPath = path.join(this.baseDir, `${this.uname}Context.${this.typescript ? 'tsx' : 'jsx'}`)
      const providerPath = path.join(this.baseDir, `${this.uname}Provider.${this.typescript ? 'tsx' : 'jsx'}`)
      const usePath = path.join(this.baseDir, `use${this.uname}.${this.typescript ? 'ts' : 'js'}`)
      const typePath = path.join(this.baseDir, 'types.ts')
      const indexPath = path.join(this.baseDir, `index.${this.typescript ? 'ts' : 'js'}`)

      fs.writeFileSync(contextPath, this.typescript ? contextTs : contextJs)
      fs.writeFileSync(providerPath, this.typescript ? providerTs : providerJs)
      fs.writeFileSync(usePath, use)
      if (this.typescript) {
        fs.writeFileSync(typePath, typeTs)
      }
      fs.writeFileSync(indexPath, index)

      this.cmd.log(`${chalk.blue('[+]')} Creating new ${this.uname}Context - ${chalk.blue(contextPath)}`)
      this.cmd.log(`${chalk.blue('[+]')} Creating new ${this.uname}Provider - ${chalk.blue(providerPath)}`)
      this.cmd.log(`${chalk.blue('[+]')} Creating new use${this.uname} - ${chalk.blue(usePath)}`)
      if (this.typescript) {
        this.cmd.log(`${chalk.blue('[+]')} Creating new types - ${chalk.blue(typePath)}`)
      }
      this.cmd.log(`${chalk.blue('[+]')} Creating new index - ${chalk.blue(indexPath)}`)
    } catch (err: unknown) {
      if (err instanceof Error) {
        this.cmd.error(`${chalk.red(err)}`)
      }
    }
  }
}
