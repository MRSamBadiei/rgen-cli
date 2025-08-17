import {Args, Command} from '@oclif/core'
import Context from '../../libs/buildContext.js'

export default class MakeContext extends Command {
  static override args = {
    name: Args.string({description: 'Name of the context', required: true}),
  }
  static override description = 'Generate a React context'

  public async run(): Promise<void> {
    const {args} = await this.parse(MakeContext)
    const c = new Context(this, args.name)
    c.setup()
  }
}
