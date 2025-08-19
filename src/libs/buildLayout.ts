import path from 'node:path'
import fs from 'node:fs'
import Build from './build.js'
import {Command} from '@oclif/core'
import chalk from 'chalk'
import {generateComponent} from './ai/gemini.js'

export default class Layout extends Build {
  constructor(cmd: Command, name: string, flags: unknown = {}) {
    super(cmd, name, 'layouts', flags)
  }

  async setup() {
    try {
      await this.init()

      const layoutPath = path.join(this.baseDir, `${this.uname}Layout.${this.typescript ? 'tsx' : 'jsx'}`)
      const layouttemplate = `import { cn } from '@/libs/utils'


export function ${this.uname}Layout() {
  <div className={cn(className)}>My ${this.uname} layout</div>
}`

      if (this.flags.desc) {
        const t = await generateComponent(
          layouttemplate,
          this.type,
          this.flags.desc,
          this.geminiApiKey,
          this.typescript,
        )
        fs.writeFileSync(layoutPath, t)
      } else {
        fs.writeFileSync(layoutPath, layouttemplate)
      }

      this.cmd.log(`${chalk.blue('[+]')} Creating new ${this.uname}Layout - ${chalk.blue(layoutPath)}`)
    } catch (err: unknown) {
      if (err instanceof Error) {
        this.cmd.error(err)
      }
    }
  }
}
