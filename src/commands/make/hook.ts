import {Args, Command, Flags} from '@oclif/core'

import Hook from '../../libs/build-hook.js'
import {HookFlag} from '../../libs/types/type.js'

export default class MakeHook extends Command {
  static override args = {
    name: Args.string({description: 'Name of the hook', required: true}),
  }
  static override description = 'Generate a React hook'
  static override flags = {
    desc: Flags.string({description: 'AI description for React hook.'}),
  }

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(MakeHook)
    const c = new Hook(this, args.name, flags as unknown as HookFlag)
    c.setup()
  }
}
