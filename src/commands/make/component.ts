import {Args, Command} from '@oclif/core'
import Component from '../../libs/buildComponent.js'

export default class MakeComponent extends Command {
  static override args = {
    name: Args.string({description: 'Name of the component', required: true}),
  }
  static override description = 'Generate a React component'

  public async run(): Promise<void> {
    const {args} = await this.parse(MakeComponent)
    const c = new Component(this, args.name)
    await c.setup()
  }
}
