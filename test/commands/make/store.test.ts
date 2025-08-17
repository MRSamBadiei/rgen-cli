import {runCommand} from '@oclif/test'
import {expect} from 'chai'

describe('make:store', () => {
  it('runs make:store cmd', async () => {
    const {stdout} = await runCommand('make:store')
    expect(stdout).to.contain('hello world')
  })

  it('runs make:store --name oclif', async () => {
    const {stdout} = await runCommand('make:store --name oclif')
    expect(stdout).to.contain('hello oclif')
  })
})
