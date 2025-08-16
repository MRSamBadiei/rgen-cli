import chalk from 'chalk'
import Build from './build.js'
import {Command} from '@oclif/core'
import path from 'node:path'
import fs from 'node:fs'

export default class Page extends Build {
  constructor(cmd: Command, name: string) {
    super(cmd, name, 'pages')
  }

  async setup() {
    try {
      await this.init()

      const page = `
export default function ${this.uname}Page() {
  return <div>My ${this.uname} page</div>;
}`

      const pagePath = path.join(this.baseDir, `index.${this.typescript ? 'tsx' : 'jsx'}`)
      fs.writeFileSync(pagePath, page)

      this.cmd.log(`${chalk.blue('[+]')} Creating new page ${this.uname} - ${chalk.blue(pagePath)}`)
    } catch (err: unknown) {
      if (err instanceof Error) {
        this.cmd.error(`${chalk.red(err)}`)
      }
    }
  }
}
