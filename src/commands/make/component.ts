import {Args, Command, Flags} from '@oclif/core'

// eslint-disable-next-line import/no-unresolved
import Component from '../../libs/build-component.js'
import {ComponentFlag} from '../../libs/types/type.js'

export default class MakeComponent extends Command {
  static override args = {
    name: Args.string({description: 'Name of the component', required: true}),
  }
  static override description = 'Generate a React component'
  static override flags = {
    desc: Flags.string({description: 'AI description for React component.'}),
  }

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(MakeComponent)
    const c = new Component(this, args.name, flags as unknown as ComponentFlag)
    await c.setup()
  }
}
