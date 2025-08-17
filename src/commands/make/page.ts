import {Args, Command} from '@oclif/core'
import Page from '../../libs/buildPage.js'

export default class MakePage extends Command {
  static override args = {
    name: Args.string({description: 'Name of the page', required: true}),
  }
  static override description = 'Generate a React page'

  public async run(): Promise<void> {
    const {args} = await this.parse(MakePage)
    const c = new Page(this, args.name)
    await c.setup()
  }
}
