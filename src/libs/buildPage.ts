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

      const pagePath = path.join(this.baseDir, `index.${this.typescript ? 'tsx' : 'jsx'}`)
      const pageTemplate = `import { cn } from "@/libs/utils"

export default function ${this.uname}Page() {
  return (
    <div className={cn("min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white")}>
      <div className={cn("container mx-auto px-6 py-16 flex flex-col items-center text-center")}>
        <h1 className={cn("text-5xl font-extrabold tracking-tight mb-6")}>
          Welcome to <span className="text-blue-400">${this.uname} Page</span>
        </h1>
        <p className={cn("text-lg text-gray-300 max-w-2xl mb-10")}>
          This is your starting point. Build your ideas, add routes, and create awesome pages with TailwindCSS.
        </p>
        <div className="flex space-x-4">
          <p className="text-lg text-gray-500 mb-6">Start editing this file at <code className="bg-gray-100 px-2 py-1 rounded">@/pages/${
            this.name
          }/index.${this.typescript ? 'tsx' : 'jsx'}</code></p>
        </div>
      </div>
    </div>
  )
}`
      fs.writeFileSync(pagePath, pageTemplate)

      this.cmd.log(`${chalk.blue('[+]')} Creating new page ${this.uname} - ${chalk.blue(pagePath)}`)
    } catch (err: unknown) {
      if (err instanceof Error) {
        this.cmd.error(err)
      }
    }
  }
}
