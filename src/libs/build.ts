import {Command} from '@oclif/core'
import chalk from 'chalk'
import dotenv from 'dotenv'
import {execSync} from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import readline from 'node:readline'

import {defaults} from './defaults.js'
import {AllFlags, BuildType, FormFlag, RGenDefaults} from './types/type.js'

export default class Build<T extends AllFlags> {
  public baseDir: string = ''
  public cmd: Command
  public defaults: RGenDefaults = {
    base: 'src/',
    debug: false,
    model: 'gemini-2.5-flash',
    useAI: false,
  }
  public deps: Record<string, string> = {}
  public flags?: T
  public geminiApiKey: string = ''
  public name: string = ''
  public rootDir: string = ''
  public type: BuildType
  public typescript: boolean = true
  public uname: string = ''

  constructor(cmd: Command, name: string, type: BuildType, flags?: T) {
    this.cmd = cmd
    this.name = name.trim().toLowerCase()
    if (!/^[a-z][a-z0-9\-.]*$/.test(this.name)) {
      cmd.error("Invalid name: must start with a letter and can only contain letters, numbers, '-' and '.'")
    }

    this.type = type
    this.flags = flags
  }

  public cout(str: string) {
    if (this.defaults.debug) {
      this.cmd.log(str)
    }
  }

  async init() {
    // *
    this.manageDotEnv()
    this.manageDefaults()

    // * Extract package.json
    this.extractPackageJson()

    // * auto install packages
    this.autoInstall()

    if (!this.name) {
      throw new Error('name must be provided')
    }

    this.uname = this.name.charAt(0).toUpperCase() + this.name.slice(1)

    // * this.rootDir
    switch (this.type) {
      case 'forms': {
        if (!(this.flags as FormFlag).page) {
          throw new Error('page name must be provided')
        }

        this.rootDir = path.join(process.cwd(), this.defaults.base, 'pages', (this.flags as FormFlag).page, this.type)
        break
      }

      default: {
        this.rootDir = path.join(process.cwd(), this.defaults.base, this.type)
      }
    }

    this.baseDir = path.join(this.rootDir, this.name.toLowerCase())

    // * Aplly Rules
    this.applyRules()

    if (this.type === 'store') {
      fs.mkdirSync(path.join(this.rootDir, 'state', this.name.toLowerCase()), {recursive: true})
    } else {
      fs.mkdirSync(this.baseDir, {recursive: true})
    }
  }

  private applyRules() {
    // * '.' Rule
    if (this.name.includes('.')) {
      // uname
      this.uname = this.uname
        .split('.')
        .map((e) => e.charAt(0).toUpperCase() + e.slice(1))
        .join('')

      // baseDir
      this.baseDir = path.join(
        process.cwd(),
        this.defaults.base,
        this.type,
        `${this.name.split('.').join('/').toLowerCase()}`,
      )
    }

    // * '-' Rule
    if (this.name.includes('-')) {
      // uname
      this.uname = this.uname
        .split('-')
        .map((e) => e.charAt(0).toUpperCase() + e.slice(1))
        .join('')
      // baseDir
      this.baseDir = path.join(this.rootDir, this.name)
    }
  }

  private async autoInstall() {
    switch (this.type) {
      case 'routes': {
        if (!this.deps['react-router']) {
          /* const install = await this.promptInstall('react-router')
      if (!install) {
        this.cmd.error('react-router is required.')
      } */

          this.cmd.log(chalk.blue('[+] Installing react-router...'))

          try {
            execSync('npm install react-router', {stdio: 'inherit'})
            this.cmd.log(`${chalk.green('[+] Installed react-router successfully.')} `)
          } catch {
            this.cmd.error('Failed to install react-router.')
          }

          this.cmd.log(chalk.green('[+] Installed react-router successfully.'))
        }

        break
      }

      case 'store': {
        if (!this.deps['react-redux'] && !this.deps['@reduxjs/toolkit']) {
          /* const install = await this.promptInstall('react-redux')
      if (!install) {
        this.cmd.error('react-redux is required.')
      } */

          this.cmd.log(chalk.blue('[+] Installing react-redux @reduxjs/toolkit...'))

          try {
            execSync('npm install react-redux @reduxjs/toolkit', {stdio: 'inherit'})
            this.cmd.log(`${chalk.green('[+] Installed react-redux @reduxjs/toolkit successfully.')} `)
          } catch {
            this.cmd.error('Failed to install react-redux @reduxjs/toolkit.')
          }
        }

        break
      }

      case 'forms': {
        if (!this.deps['@hookform/resolvers'] && !this.deps['react-hook-form'] && !this.deps.zod) {
          /* const install = await this.promptInstall('')
      if (!install) {
        this.cmd.error(' is required.')
      } */

          this.cmd.log(chalk.blue('[+] Installing react-hook-form zod @hookform/resolvers...'))
          try {
            execSync('npm install react-hook-form zod @hookform/resolvers', {stdio: 'inherit'})
            this.cmd.log(`${chalk.green('[+] Installed react-hook-form zod @hookform/resolvers successfully.')} `)
          } catch {
            this.cmd.error('Failed to install react-hook-form zod @hookform/resolvers.')
          }
        }
      }
    }
  }

  private async extractPackageJson() {
    const pkgPath = path.join(process.cwd(), 'package.json')
    if (!fs.existsSync(pkgPath)) {
      throw new Error('No package.json found. Please make sure you are in the root of a React project.')
    }

    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'))

    // * Check dependencies or devDependencies for react
    this.deps = {
      ...pkg.dependencies,
      ...pkg.devDependencies,
    }

    if (!this.deps.react) {
      throw new Error('No "react" dependency found. Are you in a React project?')
    }

    // * Check if typescipt is installed
    if (!this.deps.typescript) {
      this.typescript = false
    }
  }

  private manageDefaults() {
    const reactUtilsDefaults = defaults()
    /*
     * Overriding Default debug
     */
    if (reactUtilsDefaults.debug) {
      this.cout(`${chalk.blue('[+]')} Overriding default debug → "${chalk.blue(reactUtilsDefaults.debug)}"`)
      this.defaults.debug = reactUtilsDefaults.debug
    }

    /*
     * Overriding Default base
     */
    if (reactUtilsDefaults.base) {
      this.cout(`${chalk.blue('[+]')} Overriding default base directory → "${chalk.blue(reactUtilsDefaults.base)}"`)
      this.defaults.base = reactUtilsDefaults.base
    }

    /*
     * Overriding Default useAI
     */
    if (reactUtilsDefaults.useAI) {
      this.cout(`${chalk.blue('[+]')} Overriding useAI → "${chalk.blue(reactUtilsDefaults.useAI)}"`)
      this.defaults.useAI = reactUtilsDefaults.useAI
    }

    /*
     * Overriding Default model
     */
    if (reactUtilsDefaults.model) {
      this.cout(`${chalk.blue('[+]')} Overriding model → "${chalk.blue(reactUtilsDefaults.model)}"`)
      this.defaults.model = reactUtilsDefaults.model
    }
  }

  private manageDotEnv() {
    const envPath = path.resolve(process.cwd(), '.env')

    if (!fs.existsSync(envPath)) {
      this.cout(`${chalk.red('[x] .env not found at:')} ${chalk.blue(envPath)}`)
      return
    }

    this.cout(`${chalk.green('[+] .env found at:')} ${chalk.blue(envPath)}`)
    dotenv.config({path: envPath, quiet: true})

    this.geminiApiKey = process.env.GEMINI_API_KEY ?? ''

    if (this.geminiApiKey) {
      this.cout(`${chalk.green('[+] GEMINI_API_KEY loaded:')} ${chalk.yellow(this.geminiApiKey)}`)
    } else {
      this.cout(`${chalk.red('[x] GEMINI_API_KEY not found in .env at:')} ${chalk.blue(envPath)}`)
    }
  }

  private async promptInstall(packageName: string): Promise<boolean> {
    return new Promise((resolve) => {
      const rl = readline.createInterface({input: process.stdin, output: process.stdout})
      rl.question(chalk.blue(packageName) + ` is not installed. Do you want to install it? (Y/n) `, (answer) => {
        rl.close()
        resolve(answer.toLowerCase() === 'y' || answer.toLowerCase() === '')
      })
    })
  }
}
