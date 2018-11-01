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

	Examples
	  $ pwee
`,
  {
    flags: {
      uri: { type: 'string' },
      path: { type: 'string' },
      clear: { type: 'boolean' },
    },
  },
)

pwee(cli.input[0], cli.flags)
