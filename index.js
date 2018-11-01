const ncp = require('ncp').ncp
const download = require('download-git-repo')
const c = require('chalk')
const fs = require('fs')
const rm = require('rimraf')
const Conf = require('conf')

const config = new Conf()

const deleteGitFolder = () => {
  if (fs.existsSync(`${process.cwd()}/.git`))
    rm(`${process.cwd()}/.git`, err => (err ? console.error(err) : null))
}

module.exports = (args, flags) => {
  const dest = process.cwd()
  if (flags.clear) {
    config.delete('uri')
    config.delete('path')
    console.log('config are cleared.')
    return
  }
  if (flags.uri) {
    if (flags.uri.includes('https://github.com/')) {
      config.set('uri', flags.uri.replace('https://github.com/', ''))
    } else {
      config.set('uri', flags.uri)
    }
    console.log('repo set')
    return
  }
  if (flags.path) {
    console.log('path set.')
    config.set('path', flags.path)
    return
  }
  if (config.get('path') !== undefined) {
    ncp(config.get('path'), dest, function(err) {
      if (err) return console.error(err)
      deleteGitFolder()
      console.log('done!')
    })
  } else if (config.get('uri') !== undefined) {
    download(config.get('uri'), dest, function(err) {
      if (err) return console.error(err)
      deleteGitFolder()
      console.log('done!')
    })
  } else {
    console.log(
      "You need to set at least a local directory (--path) or a github/gitlab/bitbucket repo (--uri) if you're usin pwee for the first time or have cleared the config(--clear).",
    )
  }
}
