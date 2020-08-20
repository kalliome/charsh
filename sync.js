const { db } = require('./api/database')

console.log('Sync database')

db.sequelize.sync()
.then(() => console.log('- sync done!'))
.catch(err => console.log(' - error:', err))
.finally(() => process.exit(0))