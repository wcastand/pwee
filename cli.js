#!/usr/bin/env node
'use strict'
const meow = require('meow')
const pwee = require('.')

const cli = meow(
  `
	Usage
    $ pwee <input>

    Options
    --clear  Clear the config of pwee
    --uri    Set the github repo to copy
    --path   Set the local directory to copy
    --out   Set the local directory to copy

	Examples
    $ pwee --uri https://github.com/wcastand/pwee-folder/archive/master.zip
    $ pwee --out ./repo // copy in ./repo
    $ pwee // cpo in process.cwd()
`,
  {
    flags: {
      uri: { type: 'string' },
      path: { type: 'string' },
      clear: { type: 'boolean' },
      out: { type: 'string' },
    },
  },
)
if (cli.flags.out) pwee(cli.flags.out)
else pwee(cli.flags)
