require('niceuho')({ log: 'green' })

const Conf = require('conf')
const cp = require('copy-dir')

const dl = require('./download')

const config = new Conf()

module.exports = flags => {
  return new Promise((resolve, reject) => {
    const dest = typeof flags === 'string' ? flags : process.cwd()
    if (flags && flags.clear) {
      config.delete('uri')
      config.delete('path')
      console.log('config are cleared.')
      resolve(true)
    } else if (flags && flags.uri) {
      config.set('uri', flags.uri)
      console.log('repo set')
      resolve(true)
    } else if (flags && flags.path) {
      console.log('path set.')
      config.set('path', flags.path)
      resolve(true)
    } else if (config.get('path') !== undefined) {
      cp(config.get('path'), dest, function(err) {
        if (err) return console.error(err)
        console.log('Done')
        resolve(true)
      })
    } else if (config.get('uri') !== undefined) {
      resolve(dl(config.get('uri'), dest))
    } else {
      console.info("if you're using pwee for the first time or have cleared the config (--clear).")
      console.info(
        'You need to set at least a local directory (--path) or a url for a .zip (--uri).',
      )
      resolve(true)
    }
  })
}
