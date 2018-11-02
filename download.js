const fs = require('fs')
const rm = require('rimraf')
const decompress = require('decompress')

require('isomorphic-fetch')

module.exports = (uri, dest, cb) => {
  const zip = fs.createWriteStream('./master.zip')
  fetch(uri)
    .then(res => res.buffer())
    .then(buffer => zip.write(buffer))
    .then(() => {
      decompress('master.zip', process.cwd(), { strip: 1 }).then(files => {
        rm('master.zip', err => (err ? console.error(err) : console.log('Done.')))
        if (cb) cb()
      })
    })
}
