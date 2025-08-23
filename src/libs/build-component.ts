import {Command} from '@oclif/core'
import chalk from 'chalk'
import fs from 'node:fs'
import path from 'node:path'

import {generateComponent} from './ai/gemini.js'
import Build from './build.js'
import {ComponentFlag} from './types/type.js'

export default class Component<T extends ComponentFlag> extends Build<T> {
  constructor(cmd: Command, name: string, flags: T) {
    super(cmd, name, 'components', flags)
  }

  async setup() {
    try {
      await this.init()

      const componentPath = path.join(this.baseDir, `${this.uname}.${this.typescript ? 'tsx' : 'jsx'}`)

      if (fs.existsSync(componentPath)) {
        this.cmd.error(`${chalk.blue('[X]')} Already exists! - ${chalk.blue(componentPath)}`)
      }

      const componentTemplate = `import { cn } from '@/libs/utils'
${
  this.typescript
    ? `import { type ComponentProps } from 'react'\n\ninterface Props extends ComponentProps<'div'> {}\n`
    : ''
}
export function ${this.uname}({ className, ...props }${this.typescript ? ': Props' : ''})${
        this.typescript ? ': React.JSX.Element' : ''
      } {
  return <div className={cn(className)} {...props} />
}\n`

      if (this.flags?.desc) {
        const t = await generateComponent(
          componentTemplate,
          this.type,
          this.flags.desc,
          this.geminiApiKey,
          this.typescript,
          this.defaults.model,
        )
        fs.writeFileSync(componentPath, t)
      } else {
        fs.writeFileSync(componentPath, componentTemplate)
      }

      this.cmd.log(`${chalk.blue('[+]')} Creating new component ${this.uname} - ${chalk.blue(componentPath)}`)
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.cmd.error(error)
      }
    }
  }
}
