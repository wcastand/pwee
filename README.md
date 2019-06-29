# pwee

Quickly copy some files into the current folder.

# Usage

```js
const pwee = require('pwee')
const params = { uri: 'https://github.com/wcastand/pwee-folder/archive/master.zip' }
pwee(params)
pwee() // copy file ot proces.cwd()
```

# Usage CLI

```
$ npm i -g pwee

// only the first time
$ pwee --uri https://github.com/wcastand/pwee-folder/archive/master.zip

// after until you clear the config you can use it directly
$ pwee
```

## Options

#### --uri

use to set a url to a .zip

`\$ pwee --uri https://github.com/wcastand/pwee-folder/archive/master.zip

#### --path

use to set a local folder

`$ pwee --path /Users/wcastand/Documents/pwee-folder`

#### --clear

use to clear the saved path and uri

`$ pwee --clear`
