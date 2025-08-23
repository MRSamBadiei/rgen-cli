import {Command} from '@oclif/core'
import chalk from 'chalk'
import {parse} from 'jsonc-parser'
import {execSync} from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'

import {RGenDefaults} from '../libs/types/type.js'
import {checkUpdate} from '../libs/update.js'

export default class Init extends Command {
  public async run(): Promise<void> {
    await checkUpdate(this)

    // * ------------- [@types/node] -------------
    this.log(chalk.blue('[+] Installing @types/node...'))

    try {
      execSync('npm install @types/node', {stdio: 'inherit'})
      this.log(`${chalk.green('[+] Installed @types/node successfully.')} `)
    } catch {
      this.error('Failed to install @types/node.')
    }

    // * ------------- [TailwindCss] -------------
    this.log(chalk.blue('[+] Installing tailwindcss @tailwindcss/vite...'))

    try {
      execSync('npm install tailwindcss @tailwindcss/vite', {stdio: 'inherit'})
      this.log(`${chalk.green('[+] Installed tailwindcss @tailwindcss/vite successfully.')} `)
    } catch {
      this.error('Failed to install tailwindcss @tailwindcss/vite.')
    }

    // * ------------- [clsx] -------------
    this.log(chalk.blue('[+] Installing clsx...'))

    try {
      execSync('npm install clsx', {stdio: 'inherit'})
      this.log(`${chalk.green('[+] Installed clsx successfully.')} `)
    } catch {
      this.error('Failed to install clsx.')
    }

    // * ------------- [tailwind-merge] -------------
    this.log(chalk.blue('[+] Installing tailwind-merge...'))

    try {
      execSync('npm install tailwind-merge', {stdio: 'inherit'})
      this.log(`${chalk.green('[+] Installed tailwind-merge successfully.')} `)
    } catch {
      this.error('Failed to install tailwind-merge.')
    }

    const utilsPath = path.join(process.cwd(), 'src', 'libs', 'utils.ts')
    const utilstTs = `import {type ClassValue, clsx} from 'clsx'
import {twMerge} from 'tailwind-merge'
    
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}`

    fs.mkdirSync(path.dirname(utilsPath), {recursive: true})
    fs.writeFileSync(utilsPath, utilstTs)

    this.log(`${chalk.blue('[+]')} Creating new libs/utils.ts - ${chalk.blue(utilsPath)}`)

    const reactUtilsPath = path.join(process.cwd(), 'rgen-cli.json')
    fs.writeFileSync(
      reactUtilsPath,
      JSON.stringify(
        {
          base: 'src/',
          debug: false,
          model: 'gemini-2.5-flash',
          /* AI stuff */
          useAI: false,
          /* */
        } satisfies RGenDefaults,
        null,
        2,
      ),
      'utf8',
    )
    this.log(`${chalk.blue('[+]')} Creating new config rgen-cli.json - ${chalk.blue(reactUtilsPath)}`)

    // * ------------- [tsconfig.app.json] -------------

    const tsconfigAppJsonPath = path.join(process.cwd(), 'tsconfig.app.json')
    if (fs.existsSync(tsconfigAppJsonPath)) {
      const content = fs.readFileSync(tsconfigAppJsonPath, 'utf8')
      const tsconfigAppJson = parse(content) // parses JSON with comments

      tsconfigAppJson.compilerOptions = tsconfigAppJson.compilerOptions || {}
      tsconfigAppJson.compilerOptions.baseUrl = '.'
      tsconfigAppJson.compilerOptions.paths = {
        '@/*': ['./src/*'],
      }

      fs.writeFileSync(tsconfigAppJsonPath, JSON.stringify(tsconfigAppJson, null, 2)) // standard stringify

      this.log(
        `${chalk.green('[SUCCESS]')} Added alias ${chalk.yellow('@/* -> ./src/*')} to ${chalk.cyan(
          tsconfigAppJsonPath,
        )}`,
      )
    } /* else {
      this.error(`${chalk.red('[ERROR]')} tsconfig.app.json not found at ${chalk.cyan(tsconfigAppJsonPath)}`)
    } */

    this.log(
      `\n\n${chalk.green('[INFO]')}` +
        `To finish the setup, go here:\n` +
        `${chalk.cyan('https://tailwindcss.com/docs/installation/using-vite')}\n` +
        `and complete the final setup for TailwindCSS.`,
    )
  }
}
