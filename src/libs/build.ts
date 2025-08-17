import path from 'node:path'
import fs from 'node:fs'
import readline from 'node:readline'
import {Command} from '@oclif/core'
import chalk from 'chalk'
import {spawn} from 'child_process'

export type BuildType = 'contexts' | 'hooks' | 'routes' | 'layouts' | 'components' | 'pages' | 'store'

export default class Build {
  public name: string = ''
  public uname: string = ''
  public baseDir: string = ''
  public rootDir: string = ''
  public type: string
  public cmd: Command
  public typescript: boolean = true
  public flags: any
  private defaults = {
    base: 'src/',
  }

  constructor(cmd: Command, name: string, type: BuildType, flags?: any) {
    this.cmd = cmd
    this.name = name.trim().toLowerCase()
    this.type = type
    this.flags = flags
  }

  async init() {
    // * check for rgen-cli.json
    const reactUtilsPath = path.join(process.cwd(), 'rgen-cli.json')
    if (fs.existsSync(reactUtilsPath)) {
      this.cmd.log(`${chalk.blue('[+]')} Found rgen-cli config at: "${chalk.blue(reactUtilsPath)}"`)

      const reactUtilsDefaults = JSON.parse(fs.readFileSync(reactUtilsPath, 'utf-8'))
      if (reactUtilsDefaults.base) {
        this.cmd.log(
          `${chalk.blue('[+]')} Overriding default base directory → "${chalk.blue(reactUtilsDefaults.base)}"`,
        )
        this.defaults.base = reactUtilsDefaults.base
      }
    }

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
    this.rootDir = path.join(process.cwd(), this.defaults.base, this.type)
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
      this.baseDir = path.join(process.cwd(), this.defaults.base, this.type)
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
