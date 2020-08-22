const {
  PORT,
  NODE_ENV
} = process.env

const express = require('express')
const bodyParser = require('body-parser')
const { join } = require('path')
const { initApp } = require('./api/init')

const app = express()

app.use(bodyParser.json())
app.use(express.static('build'))

const api = require('./api/router')

app.use('/api', api)

app.get('*', (req, res) => res.sendFile(join(__dirname, 'build', 'index.html')))

app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.json({
    message: (NODE_ENV === 'development' || err.status < 500) ? err.message : 'Internal error',
    status: err.status
  })
})

initApp(app)
.then(() => app.listen(parseInt(PORT), () => console.log(`Api up @${PORT}`)))