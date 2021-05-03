const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const restaurantList = require('./restaurant.json')

const app = express()
const port = 3000

// connect mongodb and set up db's listener
mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb sucess!')
})

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// include static file
app.use(express.static('public'))

// index route
app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantList.results })
})

// detail route
app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurantAfterFind = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)

  res.render('show', { restaurant: restaurantAfterFind })
})

// search route
app.get('/search', (req, res) => {
  const restaurantsAfterSearch = restaurantList.results.filter(restaurant => restaurant.name.toLowerCase().includes(req.query.keyword.toLowerCase()))
  res.render('index', { restaurants: restaurantsAfterSearch })
})


app.listen(port, () => {
  console.log(`Listen to the http://localhost:${port}`)
})