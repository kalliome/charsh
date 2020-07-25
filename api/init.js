const { 
  db
} = require('./database')

const {
  NODE_ENV
} = process.env

exports.initApp = async () => {

  console.log('Init app')

  if(NODE_ENV !== 'production')
    await db.sequelize.sync({force: true})

  // Check if app is installed or not

}