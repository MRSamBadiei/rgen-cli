import {Command} from '@oclif/core'
import inquirer from 'inquirer'
import chalk from 'chalk'
import {execSync} from 'node:child_process'

export default class Make extends Command {
  public async run(): Promise<void> {
    const makes = ['component', 'hook', 'layout', 'page', 'route', 'context', 'store']
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
    this.log(chalk.green(`[+] Running "make ${type} ${name}"...`))

    // *
    if (type === 'route') {
      const pageAnswer = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'createPage',
          message: 'Do you also want to create a page for this route?',
          default: false,
        },
      ])

      if (pageAnswer.createPage) {
        flags.push('-p')
      }
    }

    try {
      let cmd = `rgen-cli make ${type} ${name}`

      if (type === 'route' && flags.includes('-p')) {
        cmd += ' -p'
      }

      execSync(cmd, {stdio: 'inherit'})
    } catch (err: any) {
      console.log(chalk.red(`[✖] ${err.message}`))
      process.exit(1)
    }
  }
}
