const { syncDatabase } = require('./api/init')

console.log('Sync database')

syncDatabase()
.then(() => console.log('- sync done!'))
.catch(err => console.log(' - error:', err))
.finally(() => process.exit(0))