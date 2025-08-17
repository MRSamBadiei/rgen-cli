import chalk from 'chalk'
import Build from './build.js'
import {Command} from '@oclif/core'
import path from 'node:path'
import fs from 'node:fs'

type templateType = '404' | undefined

export default class Page extends Build {
  templateType: templateType = undefined

  constructor(cmd: Command, name: string) {
    super(cmd, name, 'pages')
  }

  private template(type: templateType) {
    switch (type) {
      case '404':
        return `import { cn } from "@/libs/utils"
import { Link } from "react-router"

export default function ${this.uname}Page() {
  return (
    <div className={cn("min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex items-center justify-center")}>
      <div className={cn("text-center")}>
        <h1 className={cn("text-6xl font-extrabold mb-4")}>404</h1>
        <p className={cn("text-xl text-gray-300 mb-6")}>Oops! The page you are looking for does not exist.</p>
        <Link
          to="/"
          className={cn("inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded transition")}
        >
          Go Home
        </Link>
      </div>
    </div>
  )
}`
      default:
        return `import { cn } from "@/libs/utils"

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
    }
  }

  async setup() {
    try {
      await this.init()

      const pagePath = path.join(this.baseDir, `index.${this.typescript ? 'tsx' : 'jsx'}`)
      fs.writeFileSync(pagePath, this.template(this.templateType))

      this.cmd.log(`${chalk.blue('[+]')} Creating new page ${this.uname} - ${chalk.blue(pagePath)}`)
    } catch (err: unknown) {
      if (err instanceof Error) {
        this.cmd.error(err)
      }
    }
  }
}
