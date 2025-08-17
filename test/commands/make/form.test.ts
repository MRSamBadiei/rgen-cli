import {runCommand} from '@oclif/test'
import {expect} from 'chai'

describe('make:form', () => {
  it('runs make:form cmd', async () => {
    const {stdout} = await runCommand('make:form')
    expect(stdout).to.contain('hello world')
  })

  it('runs make:form --name oclif', async () => {
    const {stdout} = await runCommand('make:form --name oclif')
    expect(stdout).to.contain('hello oclif')
  })
})
