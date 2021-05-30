const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const flash = require('connect-flash')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const router = require('./routes')
const hbshelper = require('./config/helper')
const usePassport = require('./config/passport')

const app = express()
const PORT = process.env.PORT

require('./config/mongoose')

// set up view engine
app.engine('handlebars', exphbs({
  defaultLayout: 'main',
  helpers: hbshelper,
}))
app.set('view engine', 'handlebars')

// session
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true
}))

// set up post encoded
app.use(bodyParser.urlencoded({ extended: true }))

// include static file
app.use(express.static('public'))
app.use(methodOverride('_method'))

usePassport(app)
app.use(flash())

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.error_message = req.flash('error_message')
  res.locals.success_message = req.flash('success_message')
  
  return next()
})

app.use(router)

app.listen(PORT, () => {
  console.log(`Listen to the http://localhost:${PORT}`)
})