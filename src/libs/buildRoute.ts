import chalk from 'chalk'
import Build from './build.js'
import {Command} from '@oclif/core'
import path from 'node:path'
import fs, {mkdirSync, writeFileSync} from 'node:fs'
import {existsSync} from 'node:fs'
import Page from './buildPage.js'

export default class Route extends Build {
  constructor(cmd: Command, name: string, flags: unknown = {}) {
    super(cmd, name, 'routes', flags)
  }

  async setup() {
    try {
      await this.init()

      // * --------- root [Route] --------- *
      const rootPath = path.join(this.rootDir, 'root', `index.${this.typescript ? 'tsx' : 'jsx'}`)
      if (!existsSync(rootPath)) {
        const page = new Page(this.cmd, 'root')
        await page.setup()

        const template = `import { Route } from "react-router";
import RootPage from '@/pages/root'

export default [
  <Route index element={<RootPage />} />
]`

        mkdirSync(path.join(this.rootDir, 'root'), {recursive: true})
        writeFileSync(rootPath, template)
      }

      // * --------- 400 [Route]--------- *
      const route404Path = path.join(this.rootDir, 'not-found', `index.${this.typescript ? 'tsx' : 'jsx'}`)
      if (!existsSync(route404Path)) {
        const page = new Page(this.cmd, 'not-found')
        page.templateType = '404'
        await page.setup()

        const template = `import { Route } from "react-router";
import NotFoundPage from '@/pages/not-found'

export default [
  <Route path="*" element={<NotFoundPage />} />
]`

        mkdirSync(path.join(this.rootDir, 'not-found'), {recursive: true})
        writeFileSync(route404Path, template)
      }

      if (this.flags.page) {
        const page = new Page(this.cmd, this.name, {
          desc: this.flags.desc,
        })
        await page.setup()
      }

      const routePath = path.join(this.baseDir, `index.${this.typescript ? 'tsx' : 'jsx'}`)
      const route = `import { Route } from "react-router";
${this.flags.page ? `import ${this.uname}Page from '@/pages/${this.name}'\n` : ''}     
export default [
  <Route key="${this.name}" path="/${this.name}" element={${
        this.flags.page ? `<${this.uname}Page />` : `<div>/${this.name}</div>`
      }} />
]`

      fs.writeFileSync(routePath, route)

      this.cmd.log(`${chalk.blue('[+]')} Creating new route ${this.uname} - ${chalk.blue(routePath)}`)

      // * --------- index [Route] --------- *
      const indexPath = path.join(this.rootDir, `index.${this.typescript ? 'tsx' : 'jsx'}`)
      if (!existsSync(indexPath)) {
        const indexTemplate = `import { BrowserRouter, Routes } from 'react-router'

const routeModules = import.meta.glob('./**/*.{jsx,tsx}', { eager: true })

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {Object.entries(routeModules).flatMap(([_, mod]${this.typescript ? ': [string, any]' : ''}) => {
          // Each module exports an array of <Route> elements
          return mod.default
        })}
      </Routes>
    </BrowserRouter>
  )
}`

        fs.writeFileSync(indexPath, indexTemplate)

        this.cmd.log(`${chalk.blue('[+]')} initialize AppRoutes - ${chalk.blue(indexPath)}`)
        this.cmd.log(chalk.yellow('Next steps:'))
        this.cmd.log('1. Make sure your main entry file (e.g., main.tsx) uses <AppRoutes /> as the root component.')
        this.cmd.log(`Example:
    import AppRoutes from "@/routes";

    createRoot(document.getElementById("root")!).render(
      <StrictMode>
        <AppRoutes />
      </StrictMode>
    );`)
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        this.cmd.error(err)
      }
    }
  }
}
