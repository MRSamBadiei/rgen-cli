import {Args, Command, Flags} from '@oclif/core'

import Form from '../../libs/build-form.js'
import {FormFlag} from '../../libs/types/type.js'

export default class MakeForm extends Command {
  static override args = {
    name: Args.string({description: 'Name of the form', required: true}),
  }
  static override description = 'Generate a React form'
  static override flags = {
    page: Flags.string({char: 'p', description: 'Name of the page to attach the form to'}),
  }

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(MakeForm)
    const form = new Form(this, args.name, flags as unknown as FormFlag)
    await form.setup()
  }
}
