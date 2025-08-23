import {Args, Command, Flags} from '@oclif/core'

import Route from '../../libs/build-route.js'
import {PageFlag} from '../../libs/types/type.js'

export default class MakeRoute extends Command {
  static override args = {
    name: Args.string({description: 'Name of the route', required: true}),
  }
  static override description = 'Generate a React route - react-router required'
  static override flags = {
    desc: Flags.string({description: 'AI description for React page.'}),
    page: Flags.boolean({char: 'p', description: 'Also generate a page for this route'}),
  }

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(MakeRoute)
    const c = new Route(this, args.name, flags as unknown as PageFlag)
    await c.setup()
  }
}
