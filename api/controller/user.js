const { pbkdf2 } = require('crypto')

const {
  SECRET = 'supersecret'
} = process.env

exports.hashPassword = password => new Promise((resolve, reject) => {
  pbkdf2(password, SECRET, 100000, 64, 'sha512', (err, derivedKey) => {
    if (err)
      return reject(err)

    resolve(derivedKey.toString('hex'))
  })
})