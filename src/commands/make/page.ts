import {Args, Command, Flags} from '@oclif/core'

import Page from '../../libs/build-page.js'
import {PageFlag} from '../../libs/types/type.js'

export default class MakePage extends Command {
  static override args = {
    name: Args.string({description: 'Name of the page', required: true}),
  }
  static override description = 'Generate a React page'
  static override flags = {
    desc: Flags.string({description: 'AI description for React page.'}),
  }

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(MakePage)
    const c = new Page(this, args.name, flags as unknown as PageFlag)
    await c.setup()
  }
}
