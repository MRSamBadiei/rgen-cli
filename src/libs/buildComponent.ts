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

      const componentTemplate = `import { cn } from '@/libs/utils'
${
  this.typescript
    ? `import { type ComponentProps } from 'react'\ninterface Props extends ComponentProps<"div"> {}\n`
    : ''
}
export function ${this.uname}({ className, ...props }${this.typescript ? ' : Props' : ''}) {
    <div className={cn(className)} {...props}/>
}`

      const componentPath = path.join(this.baseDir, `${this.uname}.${this.typescript ? 'tsx' : 'jsx'}`)

      fs.writeFileSync(componentPath, componentTemplate)

      this.cmd.log(`${chalk.blue('[+]')} Creating new component ${this.uname} - ${chalk.blue(componentPath)}`)
    } catch (err: unknown) {
      if (err instanceof Error) {
        this.cmd.error(`${chalk.red(err)}`)
      }
    }
  }
}
