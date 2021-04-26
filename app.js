const express = require('express')
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')

const app = express()
const port = 3000


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

  console.log(restaurantAfterFind)
  res.render('show', { restaurant: restaurantAfterFind })
})

// search route
app.get('/search', (req, res) => {
  // 找出與req.query.keyword相同的name
  const restaurantsAfterSearch = restaurantList.results.filter(restaurant => restaurant.name.toLowerCase().includes(req.query.keyword.toLowerCase()))
  console.log(restaurantsAfterSearch)
  res.render('index', { restaurants: restaurantsAfterSearch })
})


app.listen(port, () => {
  console.log(`Listen to the http://localhost:${port}`)
})