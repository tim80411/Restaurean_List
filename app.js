const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const router = require('./routes')
const hbshelper = require('./config/helper')

const app = express()
const port = 3000

require('./config/mongoose')

// set up view engine
app.engine('handlebars', exphbs({
  defaultLayout: 'main',
  helpers: hbshelper
}))
app.set('view engine', 'handlebars')

// set up post encoded
app.use(bodyParser.urlencoded({ extended: true }))

// include static file
app.use(express.static('public'))
app.use(methodOverride('_method'))

app.use(router)

app.listen(port, () => {
  console.log(`Listen to the http://localhost:${port}`)
})