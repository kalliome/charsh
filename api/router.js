const { Router } = require('express')
const jwt = require('express-jwt')
const { userLogin, getUser } = require('./controller/user')

const {
  JWT_SECRET
} = process.env

const router = Router()

// Protect api routes with jwt auth, unless route is /api/login
router.use(jwt({
  secret: JWT_SECRET,
  algorithms: ['HS256']
}).unless({path: ['/api/login']}))

router.post('/login', async (req, res, next) => { 
  try {
    let {
      username,
      password
    } = req.body

    res.json({
      token: await userLogin(username, password)
    })
  
  } catch (error) {
    next(error)
  }
})

router.get('/user', async (req, res, next) => {
  try {
    let { user_id } = req.user

    res.json({
      user: await getUser(user_id)
    })

  } catch (error) {
    next(error)
  }
})


module.exports = router