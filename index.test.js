const tape = require('tape')
const fs = require('fs')
const mock = require('mock-fs')
const pwee = require('.')

tape.test('Pwee', async test => {
  mock()
  await pwee({ path: '/a/path' })
  test.pass('has set config')

  await pwee({ clear: true })
  test.pass('has clear config')

  await pwee({ uri: 'https://github.com/wcastand/pwee-folder/archive/master.zip' })
  test.pass('has set config')

  await pwee()
  test.deepEquals(
    fs.readdirSync('.'),
    ['.gitignore', '.prettierrc', '.vscode'],
    'should have right files',
  )

  await pwee('./out')
  test.deepEquals(
    fs.readdirSync('./out'),
    ['.gitignore', '.prettierrc', '.vscode'],
    'should have right files',
  )

  test.end()
})
