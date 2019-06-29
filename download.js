const fs = require('fs')
const rm = require('rimraf')
const decompress = require('decompress')

require('isomorphic-fetch')

module.exports = (uri, dest = process.pwd()) => {
  const zip = fs.createWriteStream('./master.zip')
  return fetch(uri)
    .then(res => res.buffer())
    .then(buffer => zip.write(buffer))
    .then(
      () =>
        new Promise((resolve, reject) => {
          decompress('master.zip', dest, { strip: 1 }).then(files =>
            rm('master.zip', err => (err ? reject(err) : resolve('Done.'))),
          )
        }),
    )
}
