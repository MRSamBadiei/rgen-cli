import path from 'node:path'
import fs from 'node:fs'
import Build from './build.js'
import {Command} from '@oclif/core'
import chalk from 'chalk'

export default class Layout extends Build {
  constructor(cmd: Command, name: string) {
    super(cmd, name, 'layouts')
  }

  async setup() {
    try {
      await this.init()

      const layout = `
export function ${this.uname}Layout() {
  <div>My ${this.uname} layout</div>
}`

      const layoutPath = path.join(this.baseDir, `${this.uname}Layout.${this.typescript ? 'tsx' : 'jsx'}`)
      fs.writeFileSync(layoutPath, layout)

      this.cmd.log(`${chalk.blue('[+]')} Creating new ${this.uname}Layout - ${chalk.blue(layoutPath)}`)
    } catch (err: unknown) {
      if (err instanceof Error) {
        this.cmd.error(`${chalk.red(err)}`)
      }
    }
  }
}
