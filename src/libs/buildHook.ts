import path from 'node:path'
import fs from 'node:fs'
import Build from './build.js'
import {Command} from '@oclif/core'
import chalk from 'chalk'
import {generateComponent} from './ai/gemini.js'

export default class Hook extends Build {
  constructor(cmd: Command, name: string, flags: unknown = {}) {
    super(cmd, name, 'hooks', flags)
  }

  async setup() {
    try {
      await this.init()

      const hookPath = path.join(this.baseDir, `use${this.uname}.${this.typescript ? 'ts' : 'js'}`)

      if (fs.existsSync(hookPath)) {
        this.cmd.error(`${chalk.blue('[X]')} Already exists! - ${chalk.blue(hookPath)}`)
      }

      const hookTemplate = `import { useState, useEffect } from 'react'

export function use${this.uname}${this.typescript ? '<T>' : ''}() {
  const [state, setState] = useState${this.typescript ? '<T | null>' : ''}(null)

  useEffect(() => {
    // TODO: add effect logic
  }, [])

  return { state, setState }
}`

      if (this.flags.desc) {
        const t = await generateComponent(
          hookTemplate,
          this.type,
          this.flags.desc,
          this.geminiApiKey,
          this.typescript,
          this.defaults.model,
        )
        fs.writeFileSync(hookPath, t)
      } else {
        fs.writeFileSync(hookPath, hookTemplate)
      }

      this.cmd.log(`${chalk.blue('[+]')} Creating new hook use${this.uname} - ${chalk.blue(hookPath)}`)
    } catch (err: unknown) {
      if (err instanceof Error) {
        this.cmd.error(err)
      }
    }
  }
}
