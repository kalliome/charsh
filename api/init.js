const { db } = require('./database')
const { hashPassword } = require('./controller/user')

const {
  NODE_ENV,
  GM_PASSWORD = 'password'
} = process.env

exports.syncDatabase = async () => {
  await db.sequelize.sync()
 
  // Check if gm user is found
  let gmUser = await db.user.findByPk(1)

  if(!gmUser) {
    await db.user.create({
      username: 'gm',
      data: {
        nickname: 'Game Master'
      },
      password:  await hashPassword(GM_PASSWORD)
    })
  }
}

exports.initApp = async () => {
  try {

    if(NODE_ENV === 'production') 
      await exports.syncDatabase()

  } catch (err) { 
    console.log(err)
  }

}