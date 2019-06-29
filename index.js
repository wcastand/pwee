require('niceuho')({ log: 'green' })

const Conf = require('conf')
const cp = require('copy-dir')

const dl = require('./download')

const config = new Conf()

module.exports = flags => {
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
    return
  }
  if (flags.path) {
    console.log('path set.')
    config.set('path', flags.path)
    return
  }
  if (config.get('path') !== undefined) {
    cp(config.get('path'), dest, function(err) {
      if (err) return console.error(err)
      console.log('Done')
    })
  } else if (config.get('uri') !== undefined) {
    dl(config.get('uri'), dest)
  } else {
    console.info("if you're using pwee for the first time or have cleared the config (--clear).")
    console.info('You need to set at least a local directory (--path) or a url for a .zip (--uri).')
  }
}
