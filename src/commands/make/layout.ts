import {Args, Command} from '@oclif/core'
import Layout from '../../libs/buildLayout.js'

export default class MakeLayout extends Command {
  static override args = {
    name: Args.string({description: 'name of layout', required: true}),
  }
  static override description = 'Generate a React layout'

  public async run(): Promise<void> {
    const {args} = await this.parse(MakeLayout)
    const c = new Layout(this, args.name)
    await c.setup()
  }
}
