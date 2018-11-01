const ncp = require('ncp').ncp
const download = require('download-git-repo')
const c = require('chalk')
const Conf = require('conf')

const config = new Conf()

module.exports = (args, flags) => {
  const dest = process.cwd()
  if (flags.clear) {
    config.delete('uri')
    config.delete('path')
    console.log('config are cleared.')
    return
  }
  if (flags.uri) {
    config.set('uri', flags.uri)
    console.log('repo set')
  }
  if (flags.path) {
    console.log('path set.')
    config.set('path', flags.path)
  }
  if (config.get('path') !== undefined) {
    ncp(config.get('path'), dest, function(err) {
      if (err) return console.error(err)
      console.log('done!')
    })
  } else if (config.get('uri') !== undefined) {
    download(config.get('uri'), dest, function(err) {
      if (err) return console.error(err)
      console.log('done!')
    })
  } else {
    console.log(
      "You need to set at least a local directory (--path) or a github/gitlab/bitbucket repo (--uri) if you're usin pwee for the first time or have cleared the config(--clear).",
    )
  }
}
