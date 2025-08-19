import {Args, Command, Flags} from '@oclif/core'
import Component from '../../libs/buildComponent.js'

export default class MakeComponent extends Command {
  static override args = {
    name: Args.string({description: 'Name of the component', required: true}),
  }
  static override flags = {
    desc: Flags.string({description: 'AI description for React component.'}),
  }
  static override description = 'Generate a React component'

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(MakeComponent)
    const c = new Component(this, args.name, flags)
    await c.setup()
  }
}
