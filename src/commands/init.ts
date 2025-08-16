import {Command} from '@oclif/core'

import path from 'node:path'
import fs from 'node:fs'
import chalk from 'chalk'
import {execSync} from 'node:child_process'
import {parse} from 'jsonc-parser'

export default class Init extends Command {
  static override args = {}
  static override description = 'describe the command here'
  static override examples = ['<%= config.bin %> <%= command.id %>']
  static override flags = {}

  public async run(): Promise<void> {
    // * ------------- [TailwindCss] -------------
    this.log(chalk.blue('[+] Installing tailwindcss @tailwindcss/vite...'))

    try {
      execSync('npm install tailwindcss @tailwindcss/vite', {stdio: 'inherit'})
      this.log(`${chalk.green('[+] Installed tailwindcss @tailwindcss/vite successfully.')} `)
    } catch (err) {
      this.error('Failed to install tailwindcss @tailwindcss/vite.')
    }

    // * ----------------------------
    this.log(chalk.blue('[+] Installing clsx...'))

    try {
      execSync('npm install clsx', {stdio: 'inherit'})
      this.log(`${chalk.green('[+] Installed clsx successfully.')} `)
    } catch (err) {
      this.error('Failed to install clsx.')
    }

    // * ----------------------------
    this.log(chalk.blue('[+] Installing tailwind-merge...'))

    try {
      execSync('npm install tailwind-merge', {stdio: 'inherit'})
      this.log(`${chalk.green('[+] Installed tailwind-merge successfully.')} `)
    } catch (err) {
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
          debug: true,
        },
        null,
        2,
      ),
      'utf-8',
    )
    this.log(`${chalk.blue('[+]')} Creating new config rgen-cli.json - ${chalk.blue(reactUtilsPath)}`)

    // * ------------- [tsconfig.app.json] -------------

    const tsconfigAppJsonPath = path.join(process.cwd(), 'tsconfig.app.json')
    if (fs.existsSync(tsconfigAppJsonPath)) {
      const content = fs.readFileSync(tsconfigAppJsonPath, 'utf-8')
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
    } else {
      this.error(`${chalk.red('[ERROR]')} tsconfig.app.json not found at ${chalk.cyan(tsconfigAppJsonPath)}`)
    }

    this.log(
      `\n\n${chalk.green('[INFO]')}` +
        `To finish the setup, go here:\n` +
        `${chalk.cyan('https://tailwindcss.com/docs/installation/using-vite')}\n` +
        `and complete the final setup for TailwindCSS.`,
    )
  }
}
