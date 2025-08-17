import fs from 'fs'
import path from 'path'
import {execSync} from 'child_process'
import {Command} from '@oclif/core'
import chalk from 'chalk'

export async function checkUpdate(cmd: Command) {
  const cacheFile = path.join(cmd.config.configDir, 'last-update.json')
  cmd.log(cacheFile)
  let lastCheck = 0

  if (fs.existsSync(cacheFile)) {
    const data = JSON.parse(fs.readFileSync(cacheFile, 'utf-8'))
    lastCheck = data.timestamp || 0
  }

  const now = Date.now()
  const oneDay = 1000 * 60 * 60 * 24

  if (now - lastCheck < oneDay) {
    return
  }

  try {
    const pkgPath = path.resolve(new URL('../../package.json', import.meta.url).pathname)
    const current = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'))
    const latest = execSync('npm view rgen-cli version').toString().trim()

    if (current.version !== latest) {
      cmd.log(chalk.yellow(`New version available: ${latest}, updating...`))
      execSync('npm install -g rgen-cli', {stdio: 'inherit'})
      cmd.log(chalk.green('Update complete'))
    }

    fs.mkdirSync(cmd.config.configDir, {recursive: true})
    fs.writeFileSync(cacheFile, JSON.stringify({timestamp: now}))
  } catch (err: any) {
    cmd.log(chalk.red(`Failed to check/update CLI: ${err.message}`))
  }
}
