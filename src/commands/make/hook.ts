import {Args, Command} from '@oclif/core'
import Hook from '../../libs/buildHook.js'

export default class MakeHook extends Command {
  static override args = {
    name: Args.string({description: 'Name of the hook', required: true}),
  }
  static override description = 'Generate a React hook'

  public async run(): Promise<void> {
    const {args} = await this.parse(MakeHook)
    const c = new Hook(this, args.name)
    c.setup()
  }
}
