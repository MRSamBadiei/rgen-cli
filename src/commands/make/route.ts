import {Args, Command, Flags} from '@oclif/core'
import Route from '../../libs/buildRoute.js'

export default class MakeRoute extends Command {
  static override args = {
    name: Args.string({description: 'Name of the route', required: true}),
  }
  static override description = 'Generate a React route - react-router required'

  static override flags = {
    page: Flags.boolean({char: 'p', description: 'Also generate a page for this route'}),
    desc: Flags.string({description: 'AI description for React page.'}),
  }

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(MakeRoute)
    const c = new Route(this, args.name, flags)
    await c.setup()
  }
}
