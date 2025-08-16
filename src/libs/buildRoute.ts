import chalk from 'chalk'
import Build from './build.js'
import {Command} from '@oclif/core'
import path from 'node:path'
import fs from 'node:fs'
import {existsSync} from 'node:fs'

export default class Route extends Build {
  constructor(cmd: Command, name: string) {
    super(cmd, name, 'routes')
  }

  async setup() {
    try {
      await this.init()
      //

      const indexPath = path.join(this.rootDir, `index.${this.typescript ? 'tsx' : 'jsx'}`)
      if (!existsSync(indexPath)) {
        const indexTsx = `import {BrowserRouter, Routes} from 'react-router'

const routeModules = import.meta.glob('./**/*.tsx', { eager: true })

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {Object.entries(routeModules).flatMap(([_, mod]: [string, any]) => {
          // Each module exports an array of <Route> elements
          return mod.default
        })}
      </Routes>
    </BrowserRouter>
  )
}`

        const indexJsx = `import {BrowserRouter, Routes} from 'react-router'

const routeModules = import.meta.glob('./**/*.jsx', { eager: true })

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {Object.entries(routeModules).flatMap(([_, mod]) => {
          // Each module exports an array of <Route> elements
          return mod.default
        })}
      </Routes>
    </BrowserRouter>
  )
}`

        fs.writeFileSync(indexPath, this.typescript ? indexTsx : indexJsx)

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

      const routePath = path.join(this.baseDir, `index.${this.typescript ? 'tsx' : 'jsx'}`)
      const routeTs = `import { Route } from "react-router";

export default [
  <Route key="${this.name}" path="/${this.name}" element={<div>/${this.name}</div>} />
]`
      const routeJs = `import { Route } from "react-router";

export default [
  <Route key="${this.name}" path="/${this.name}" element={<div>/${this.name}</div>} />
]`

      fs.writeFileSync(routePath, this.typescript ? routeTs : routeJs)
    } catch (err: unknown) {
      if (err instanceof Error) {
        this.cmd.error(`${chalk.red(err)}`)
      }
    }
  }
}
