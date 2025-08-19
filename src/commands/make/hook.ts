import {Args, Command, Flags} from '@oclif/core'
import Hook from '../../libs/buildHook.js'

export default class MakeHook extends Command {
  static override args = {
    name: Args.string({description: 'Name of the hook', required: true}),
  }
  static override flags = {
    desc: Flags.string({description: 'AI description for React hook.'}),
  }
  static override description = 'Generate a React hook'

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(MakeHook)
    const c = new Hook(this, args.name, flags)
    c.setup()
  }
}
