import {Args, Command, Flags} from '@oclif/core'
import Page from '../../libs/buildPage.js'

export default class MakePage extends Command {
  static override args = {
    name: Args.string({description: 'Name of the page', required: true}),
  }
  static override flags = {
    desc: Flags.string({description: 'AI description for React page.'}),
  }
  static override description = 'Generate a React page'

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(MakePage)
    const c = new Page(this, args.name, flags)
    await c.setup()
  }
}
