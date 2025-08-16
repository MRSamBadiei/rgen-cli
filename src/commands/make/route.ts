import {Args, Command} from '@oclif/core'
import Route from '../../libs/buildRoute.js'

export default class MakeRoute extends Command {
  static override args = {
    name: Args.string({description: 'name of route', required: true}),
  }
  static override description = 'Generate a React route - react-router required'

  public async run(): Promise<void> {
    const {args} = await this.parse(MakeRoute)
    const c = new Route(this, args.name)
    await c.setup()
  }
}
