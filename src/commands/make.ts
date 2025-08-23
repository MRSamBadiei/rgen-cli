import {Command} from '@oclif/core'
import chalk from 'chalk'
import inquirer from 'inquirer'
import {execSync} from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'

import {defaults} from '../libs/defaults.js'
import {checkUpdate} from '../libs/update.js'

export default class Make extends Command {
  public async run(): Promise<void> {
    await checkUpdate(this)

    const _defaults = defaults()

    // AI available only [component hook layout page]
    const aiAvailable = new Set(['component', 'hook', 'layout', 'page'])
    const makes = ['component', 'context', 'hook', 'layout', 'page', 'route', 'form', 'store']

    const flags: string[] = []

    // Step 1: Ask user which type to create
    const {type} = await inquirer.prompt([
      {
        choices: makes,
        message: 'Select what you want to create:',
        name: 'type',
        type: 'list',
      },
    ])

    // Step 2: Ask for the name
    const {name} = await inquirer.prompt([
      {
        message: `Enter the name for the ${type}:`,
        name: 'name',
        type: 'input',
        validate: (input: string) => input.length > 0 || 'Name cannot be empty',
      },
    ])

    // Step 3: Delegate to the proper subcommand

    // * form
    if (type === 'form') {
      const pagesPath = path.join(process.cwd(), _defaults.base, 'pages')
      if (!fs.existsSync(pagesPath)) {
        this.error(chalk.red(`[✖] No "pages" folder found at ${pagesPath}\nCreate a page first`))
      }

      const pages = fs.readdirSync(pagesPath).filter((f) => fs.statSync(path.join(pagesPath, f)).isDirectory())

      if (pages.length === 0) {
        this.error(`[✖] No pages found inside "pages/" - Create a page first`)
      }

      const {selectedPage} = await inquirer.prompt([
        {
          choices: pages,
          message: 'Select the page folder for this form:',
          name: 'selectedPage',
          type: 'list',
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
          default: false,
          message: 'Do you also want to create a page for this route?',
          name: 'createPage',
          type: 'confirm',
        },
      ])

      if (createPage) {
        flags.push('-p')
      }
    }

    // * AI
    if ((aiAvailable.has(type) || (type === 'route' && flags.includes('-p'))) && _defaults.useAI) {
      const {desc} = await inquirer.prompt([
        {
          default: '',
          message: 'Describe what you want the AI to generate (leave empty to skip):',
          name: 'desc',
          type: 'input',
        },
      ])

      if (desc) {
        flags.push('--desc', `"${desc}"`)
      }
    }

    try {
      let cmd = `rgen-cli make ${type} ${name}`

      if (aiAvailable.has(type) && flags.includes('--desc')) {
        cmd += ` ${flags.join(' ')}`
      }

      if ((type === 'route' || type === 'form') && flags.includes('-p')) {
        cmd += ` ${flags.join(' ')}`
      }

      this.log(chalk.green(`[>] ${cmd}`))

      execSync(cmd, {stdio: 'inherit'})
    } catch (error: unknown) {
      this.error(`[x] ${(error as Error).message}`)
    }
  }
}
