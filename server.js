const {
  PORT
} = process.env

const express = require('express')
const app = express()

const { initApp } = require('./api/init')

const api = require('./api/router')

app.get('/', async (req, res) => {
  res.json({
    message: 'Hello World'
  })
})

app.use('/api', api)

initApp()
.then(() => app.listen(parseInt(PORT), () => console.log(`Api up @${PORT}`)))