import Build from './build.js'
import {Command} from '@oclif/core'
import path from 'node:path'
import fs from 'node:fs'
import chalk from 'chalk'

export default class Component extends Build {
  constructor(cmd: Command, name: string) {
    super(cmd, name, 'components')
  }

  async setup() {
    try {
      await this.init()

      const componentTs = `import { type ComponentProps } from 'react'
import { cn } from '@/libs/utils'

interface Props extends ComponentProps<"div"> {}

export function ${this.uname}({ className, ...props } : Props) {
    <div className={cn(className)} {...props}/>
}`

      const componentJs = `import { cn } from '@/libs/utils'

export function ${this.uname}({ className, ...props }) {
    <div className={cn(className)} {...props}/>
}`

      const componentPath = path.join(this.baseDir, `${this.uname}.${this.typescript ? 'tsx' : 'jsx'}`)

      fs.writeFileSync(componentPath, this.typescript ? componentTs : componentJs)

      this.cmd.log(`${chalk.blue('[+]')} Creating new component ${this.uname} - ${chalk.blue(componentPath)}`)
    } catch (err: unknown) {
      if (err instanceof Error) {
        this.cmd.error(`${chalk.red(err)}`)
      }
    }
  }
}
