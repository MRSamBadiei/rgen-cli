import {Args, Command, Flags} from '@oclif/core'
import Layout from '../../libs/buildLayout.js'

export default class MakeLayout extends Command {
  static override args = {
    name: Args.string({description: 'Name of the layout', required: true}),
  }
  static override flags = {
    desc: Flags.string({description: 'AI description for React layout.'}),
  }
  static override description = 'Generate a React layout'

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(MakeLayout)
    const c = new Layout(this, args.name, flags)
    await c.setup()
  }
}
