const { db } = require('./database')
const { hashPassword } = require('./controller/user')

const {
  NODE_ENV,
  GM_PASSWORD = 'password'
} = process.env

exports.initApp = async () => {

  if(NODE_ENV !== 'production')
    await db.sequelize.sync({force: true})

  // Check if gm user is found
  let gmUser = await db.user.findByPk('gm')

  if(!gmUser) {
    await db.user.create({
      uid: 'gm',
      nickname: 'Game Master',
      password:  await hashPassword(GM_PASSWORD)
    })
  }

}