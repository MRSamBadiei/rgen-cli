import path from 'node:path'
import fs from 'node:fs'
import {RGenDefaults} from './types/type.js'

export function defaults() {
  const defaults: RGenDefaults = {
    base: 'src/',
    debug: false,
    useAI: false,
    model: 'Gemini',
  }

  const reactUtilsPath = path.resolve(process.cwd(), 'rgen-cli.json')
  if (fs.existsSync(reactUtilsPath)) {
    const reactUtilsDefaults = JSON.parse(fs.readFileSync(reactUtilsPath, 'utf-8'))
    /*
     * Overriding Default debug
     */
    if (reactUtilsDefaults.debug) {
      defaults.debug = reactUtilsDefaults.debug
    }
    /*
     * Overriding Default base
     */
    if (reactUtilsDefaults.base) {
      defaults.base = reactUtilsDefaults.base
    }
    /*
     * Overriding Default useAI
     */
    if (reactUtilsDefaults.useAI) {
      defaults.useAI = reactUtilsDefaults.useAI
    }
    /*
     * Overriding Default model
     */
    if (reactUtilsDefaults.model) {
      defaults.model = reactUtilsDefaults.model
    }
  }
  return defaults
}
