import {Command} from '@oclif/core'
import chalk from 'chalk'
import fs from 'node:fs'
import path from 'node:path'

import {generateComponent} from './ai/gemini.js'
import Build from './build.js'
import {LayoutFlag} from './types/type.js'

export default class Layout<T extends LayoutFlag> extends Build<T> {
  constructor(cmd: Command, name: string, flags: T) {
    super(cmd, name, 'layouts', flags)
  }

  async setup() {
    try {
      await this.init()

      const layoutPath = path.join(this.baseDir, `${this.uname}Layout.${this.typescript ? 'tsx' : 'jsx'}`)

      if (fs.existsSync(layoutPath)) {
        this.cmd.error(`${chalk.blue('[X]')} Already exists! - ${chalk.blue(layoutPath)}`)
      }

      const layouttemplate = `import { cn } from '@/libs/utils'${
        this.typescript
          ? `\nimport type { ReactNode } from 'react'\n\ninterface ${this.uname}LayoutProps {
  children: ReactNode
  className?: string
}`
          : ''
      }

export function ${this.uname}Layout({ children, className }${this.typescript ? `: ${this.uname}LayoutProps` : ''})${
        this.typescript ? ': React.JSX.Element' : ''
      } {
  return <div className={cn('p-6 bg-white rounded-xl shadow-lg', className)}>{children}</div>
}\n`

      if (this.flags?.desc) {
        const t = await generateComponent(
          layouttemplate,
          this.type,
          this.flags.desc,
          this.geminiApiKey,
          this.typescript,
          this.defaults.model,
        )
        fs.writeFileSync(layoutPath, t)
      } else {
        fs.writeFileSync(layoutPath, layouttemplate)
      }

      this.cmd.log(`${chalk.blue('[+]')} Creating new ${this.uname}Layout - ${chalk.blue(layoutPath)}`)
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.cmd.error(error)
      }
    }
  }
}
