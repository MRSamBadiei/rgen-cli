import {Args, Command} from '@oclif/core'

import Store from '../../libs/build-store.js'

export default class MakeStore extends Command {
  static override args = {
    name: Args.string({description: 'Name of the store', required: true}),
  }
  static override description = 'Generate a React Redux store'

  public async run(): Promise<void> {
    const {args} = await this.parse(MakeStore)
    const store = new Store(this, args.name)
    await store.setup()
  }
}
