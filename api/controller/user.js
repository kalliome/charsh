const { pbkdf2 } = require('crypto')
const db = require('../database')
const jwt = require('jsonwebtoken')

const {
  SECRET = 'supersecret',
  JWT_SECRET
} = process.env

exports.hashPassword = password => new Promise((resolve, reject) => {
  pbkdf2(password, SECRET, 100000, 64, 'sha512', (err, derivedKey) => {
    if (err)
      return reject(err)

    resolve(derivedKey.toString('hex'))
  })
})

const comparePasswords = async (hashed, test) => {
  let hashedTest = await exports.hashPassword(test)
  return hashedTest === hashed
}

const createToken = payload => jwt.sign(payload, JWT_SECRET, {algorithm: 'HS256'})

exports.userLogin = async (username, password) => {
  try {
    let user = await db.user.findOne({
      where: {username}
    })

    if(!user)
      throw 'userNotFound'

    let isCorrectPassword = await comparePasswords(user.password, password)
    if(!isCorrectPassword)
      throw 'incorrectPassword'

    return createToken({user_id: user.id})
  } catch (err) {
    console.log(err)
    throw Error('User not found')
  }

}


exports.getUser = async user_id => {
  let user = await db.user.findByPk(user_id)
  if(!user)
    throw Error('User not found')

  let {
    id,
    username,
    data
  } = user

  return {
    id,
    username,
    data
  }
}