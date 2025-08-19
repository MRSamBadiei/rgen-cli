import path from 'node:path'
import fs from 'node:fs'
import readline from 'node:readline'
import {Command} from '@oclif/core'
import chalk from 'chalk'
import {spawn} from 'child_process'
import dotenv from 'dotenv'
import {BuildType, RGenDefaults} from './types/type.js'
import {defaults} from './defaults.js'

export default class Build {
  public name: string = ''
  public uname: string = ''
  public baseDir: string = ''
  public rootDir: string = ''
  public type: BuildType
  public cmd: Command
  public typescript: boolean = true
  public flags: any
  public defaults: RGenDefaults = {
    base: 'src/',
    debug: false,
    useAI: false,
    model: 'Gemini',
  }
  public geminiApiKey: string = ''

  constructor(cmd: Command, name: string, type: BuildType, flags?: unknown) {
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

  async init() {
    // *
    this.manageDotEnv()
    this.manageDefaults()

    // * Check for package.json
    const pkgPath = path.join(process.cwd(), 'package.json')
    if (!fs.existsSync(pkgPath)) {
      throw new Error('No package.json found. Please make sure you are in the root of a React project.')
    }

    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'))

    // * Check dependencies or devDependencies for react
    const deps = {
      ...pkg.dependencies,
      ...pkg.devDependencies,
    }

    if (!deps.react) {
      throw new Error('No "react" dependency found. Are you in a React project?')
    }

    // * Check if typescipt is installed
    if (!deps.typescript) {
      this.typescript = false
    }

    if (this.type === 'forms' && !deps['@hookform/resolvers'] && !deps['react-hook-form'] && !deps['zod']) {
      /*const install = await this.promptInstall('')
      if (!install) {
        this.cmd.error(' is required.')
      }*/

      this.cmd.log(chalk.blue('[+] Installing react-hook-form zod @hookform/resolvers...'))
      await new Promise<void>((resolve, reject) => {
        const child = spawn('npm', ['install', 'react-hook-form', 'zod', '@hookform/resolvers'], {stdio: 'inherit'})
        child.on('exit', (code) => {
          if (code === 0) resolve()
          else reject(new Error('Failed to install react-hook-form zod @hookform/resolvers.'))
        })
        child.on('error', reject)
      })

      this.cmd.log(chalk.green('[+] Installed react-hook-form zod @hookform/resolvers successfully.'))
    }

    if (this.type === 'routes' && !deps['react-router']) {
      /*const install = await this.promptInstall('react-router')
      if (!install) {
        this.cmd.error('react-router is required.')
      }*/

      this.cmd.log(chalk.blue('[+] Installing react-router...'))
      await new Promise<void>((resolve, reject) => {
        const child = spawn('npm', ['install', 'react-router'], {stdio: 'inherit'})
        child.on('exit', (code) => {
          if (code === 0) resolve()
          else reject(new Error('Failed to install react-router.'))
        })
        child.on('error', reject)
      })

      this.cmd.log(chalk.green('[+] Installed react-router successfully.'))
    }

    if (this.type === 'store' && !deps['react-redux'] && !deps['@reduxjs/toolkit']) {
      /*const install = await this.promptInstall('react-redux')
      if (!install) {
        this.cmd.error('react-redux is required.')
      }*/

      this.cmd.log(chalk.blue('[+] Installing react-redux and @reduxjs/toolkit...'))
      await new Promise<void>((resolve, reject) => {
        const child = spawn('npm', ['install', 'react-redux', '@reduxjs/toolkit'], {stdio: 'inherit'})
        child.on('exit', (code) => {
          if (code === 0) resolve()
          else reject(new Error('Failed to install react-redux or @reduxjs/toolkit.'))
        })
        child.on('error', reject)
      })

      this.cmd.log(chalk.green('[+] Installed react-redux and @reduxjs/toolkit successfully.'))
    }

    if (!this.name) {
      throw new Error('name must be provided')
    }

    this.uname = this.name.charAt(0).toUpperCase() + this.name.slice(1)

    // * this.rootDir
    switch (this.type) {
      case 'forms':
        if (!this.flags.page) {
          throw new Error('page name must be provided')
        }
        this.rootDir = path.join(process.cwd(), this.defaults.base, 'pages', this.flags.page, this.type)
        break
      default:
        this.rootDir = path.join(process.cwd(), this.defaults.base, this.type)
    }

    this.baseDir = path.join(this.rootDir, this.name.toLowerCase())

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

    if (this.type === 'store') {
      fs.mkdirSync(path.join(this.rootDir, 'state', this.name.toLowerCase()), {recursive: true})
    } else {
      fs.mkdirSync(this.baseDir, {recursive: true})
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
