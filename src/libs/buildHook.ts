import path from 'node:path'
import fs from 'node:fs'
import Build from './build.js'
import {Command} from '@oclif/core'
import chalk from 'chalk'

export default class Hook extends Build {
  constructor(cmd: Command, name: string) {
    super(cmd, name, 'hooks')
  }

  async setup() {
    try {
      await this.init()

      const hookTs = `import { useState, useEffect } from 'react'


export function use${this.uname}<T>() {
  const [state, setState] = useState<T | null>(null)

  useEffect(() => {
    // TODO: add effect logic
  }, [])

  return { state, setState }
}`

      const hookJs = `import { useState, useEffect } from 'react'


export function use${this.uname}() {
  const [state, setState] = useState(null)

  useEffect(() => {
    // TODO: add effect logic
  }, [])

  return { state, setState }
}`

      const hookPath = path.join(this.baseDir, `use${this.uname}.${this.typescript ? 'ts' : 'js'}`)

      fs.writeFileSync(hookPath, this.typescript ? hookTs : hookJs)

      this.cmd.log(`${chalk.blue('[+]')} Creating new use${this.uname} - ${chalk.blue(hookPath)}`)
    } catch (err: unknown) {
      if (err instanceof Error) {
        this.cmd.error(`${chalk.red(err)}`)
      }
    }
  }
}
