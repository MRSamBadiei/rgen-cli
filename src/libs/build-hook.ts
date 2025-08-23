import {Command} from '@oclif/core'
import chalk from 'chalk'
import fs from 'node:fs'
import path from 'node:path'

import {generateComponent} from './ai/gemini.js'
import Build from './build.js'
import {HookFlag} from './types/type.js'

export default class Hook<T extends HookFlag> extends Build<T> {
  constructor(cmd: Command, name: string, flags: T) {
    super(cmd, name, 'hooks', flags)
  }

  async setup() {
    try {
      await this.init()

      const hookPath = path.join(this.baseDir, `use${this.uname}.${this.typescript ? 'ts' : 'js'}`)

      if (fs.existsSync(hookPath)) {
        this.cmd.error(`${chalk.blue('[X]')} Already exists! - ${chalk.blue(hookPath)}`)
      }

      const hookTemplate = `import { useState, useEffect${
        this.typescript ? ', Dispatch, SetStateAction' : ''
      } } from 'react'${
        this.typescript
          ? `\n\nexport type Use${this.uname}Return<T> = {
  state: T | null
  setState: Dispatch<SetStateAction<T | null>>
}`
          : ''
      }

export function use${this.uname}${this.typescript ? '<T>' : ''}()${
        this.typescript ? `: Use${this.uname}Return<T>` : ''
      } {
  const [state, setState] = useState${this.typescript ? '<T | null>' : ''}(null)

  useEffect(() => {
    // TODO: add effect logic
  }, [])

  return { state, setState }
}\n`

      if (this.flags?.desc) {
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
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.cmd.error(error)
      }
    }
  }
}
