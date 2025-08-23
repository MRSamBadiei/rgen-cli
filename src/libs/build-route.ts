import {Command} from '@oclif/core'
import chalk from 'chalk'
import fs, {existsSync, mkdirSync, writeFileSync} from 'node:fs'
import path from 'node:path'

import Page from './build-page.js'
import Build from './build.js'
import {RouterFlag} from './types/type.js'

type templateType = 'index' | 'not-found' | 'root' | undefined

export default class Route<T extends RouterFlag> extends Build<T> {
  templateType: templateType = undefined

  constructor(cmd: Command, name: string, flags: T) {
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

        mkdirSync(path.join(this.rootDir, 'root'), {recursive: true})
        writeFileSync(rootPath, this.template('root'))
      }

      // * --------- 400 [Route]--------- *
      const route404Path = path.join(this.rootDir, 'not-found', `index.${this.typescript ? 'tsx' : 'jsx'}`)
      if (!existsSync(route404Path)) {
        const page = new Page(this.cmd, 'not-found')
        page.templateType = 'not-found'
        await page.setup()

        mkdirSync(path.join(this.rootDir, 'not-found'), {recursive: true})
        writeFileSync(route404Path, this.template('not-found'))
      }

      if (this.flags?.page) {
        const page = new Page(this.cmd, this.name, {
          desc: this.flags?.desc,
        })
        await page.setup()
      }

      const routePath = path.join(this.baseDir, `index.${this.typescript ? 'tsx' : 'jsx'}`)

      if (fs.existsSync(routePath)) {
        this.cmd.error(`${chalk.blue('[X]')} Already exists! - ${chalk.blue(routePath)}`)
      }

      fs.writeFileSync(routePath, this.template(this.templateType))

      this.cmd.log(`${chalk.blue('[+]')} Creating new route ${this.uname} - ${chalk.blue(routePath)}`)

      // * --------- index [Route] --------- *
      const indexPath = path.join(this.rootDir, `index.${this.typescript ? 'tsx' : 'jsx'}`)
      if (!existsSync(indexPath)) {
        fs.writeFileSync(indexPath, this.template('index')!)

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
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.cmd.error(error)
      }
    }
  }

  private template(type: templateType) {
    switch (type) {
      case 'index': {
        return `import { BrowserRouter, Routes } from 'react-router'${
          this.typescript
            ? `\n\ntype RouteModule = {
  default: React.JSX.Element | React.JSX.Element[]
}`
            : ''
        }

const routeModules = import.meta.glob${this.typescript ? '<RouteModule>' : ''}('./**/*.{jsx,tsx}', { eager: true })

export default function AppRoutes()${this.typescript ? ': React.JSX.Element' : ''} {
  return (
    <BrowserRouter>
      <Routes>
        {Object.values(routeModules).flatMap((mod) => {
          // Each module exports an array of <Route> elements
          const routes = Array.isArray(mod.default) ? mod.default : [mod.default]
          return routes
        })}
      </Routes>
    </BrowserRouter>
  )
}\n`
      }

      case 'not-found': {
        return `import { Route } from "react-router";
import NotFoundPage from '@/pages/not-found'

export default [
  <Route key='not-found' path="*" element={<NotFoundPage />} />
]`
      }

      case 'root': {
        return `import { Route } from "react-router";
import RootPage from '@/pages/root'

export default [
  <Route key='root' index element={<RootPage />} />
]`
      }

      default: {
        return `import { Route } from "react-router";
${this.flags?.page ? `import ${this.uname}Page from '@/pages/${this.name}'\n` : ''}     
export default [
  <Route key="${this.name}" path="/${this.name}" element={${
          this.flags?.page ? `<${this.uname}Page />` : `<div>/${this.name}</div>`
        }} />
]\n`
      }
    }
  }
}
