import {Command} from '@oclif/core'
import inquirer from 'inquirer'
import chalk from 'chalk'
import {execSync} from 'node:child_process'
import path from 'node:path'
import fs from 'node:fs'
import {checkUpdate} from '../libs/update.js'
import {defaults} from '../libs/defaults.js'

export default class Make extends Command {
  public async run(): Promise<void> {
    await checkUpdate(this)

    const _defaults = defaults()

    // AI available only [component hook layout page]
    const aiAvailable = ['component', 'hook', 'layout', 'page']
    const makes = ['component', 'context', 'hook', 'layout', 'page', 'route', 'form', 'store']

    const flags: string[] = []

    // Step 1: Ask user which type to create
    const {type} = await inquirer.prompt([
      {
        type: 'list',
        name: 'type',
        message: 'Select what you want to create:',
        choices: makes,
      },
    ])

    // Step 2: Ask for the name
    const {name} = await inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: `Enter the name for the ${type}:`,
        validate: (input: string) => input.length > 0 || 'Name cannot be empty',
      },
    ])

    // Step 3: Delegate to the proper subcommand

    // * form
    if (type === 'form') {
      const pagesPath = path.join(process.cwd(), 'src', 'pages')
      if (!fs.existsSync(pagesPath)) {
        this.error(chalk.red(`[✖] No "pages" folder found at ${pagesPath}\nCreate a page first`))
      }

      const pages = fs.readdirSync(pagesPath).filter((f) => fs.statSync(path.join(pagesPath, f)).isDirectory())

      if (pages.length === 0) {
        this.error(`[✖] No pages found inside "pages/" - Create a page first`)
      }

      const {selectedPage} = await inquirer.prompt([
        {
          type: 'list',
          name: 'selectedPage',
          message: 'Select the page folder for this form:',
          choices: pages,
        },
      ])

      if (selectedPage) {
        flags.push('-p', selectedPage)
      }
    }

    // * route
    if (type === 'route') {
      const {createPage} = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'createPage',
          message: 'Do you also want to create a page for this route?',
          default: false,
        },
      ])

      if (createPage) {
        flags.push('-p')
      }
    }

    // * AI
    if ((aiAvailable.includes(type) || (type === 'route' && flags.includes('-p'))) && _defaults.useAI) {
      const {desc} = await inquirer.prompt([
        {
          type: 'input',
          name: 'desc',
          message: 'Describe what you want the AI to generate (leave empty to skip):',
          default: '',
        },
      ])

      if (desc) {
        flags.push('--desc', `"${desc}"`)
      }
    }

    try {
      let cmd = `rgen-cli make ${type} ${name}`

      if (aiAvailable.includes(type) && flags.includes('--desc')) {
        cmd += ` ${flags.join(' ')}`
      }

      if ((type === 'route' || type === 'form') && flags.includes('-p')) {
        cmd += ` ${flags.join(' ')}`
      }

      this.log(chalk.green(`[>] ${cmd}`))

      execSync(cmd, {stdio: 'inherit'})
    } catch (err: any) {
      this.error(`[x] ${err.message}`)
    }
  }
}
