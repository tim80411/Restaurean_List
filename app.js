const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const Restaurant = require('./models/restaurant')
const restaurantList = require('./models/seeds/restaurant.json')


const app = express()
const port = 3000

// connect mongodb and set up db's listener
mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb sucess!')
})

// set up view engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// set up post encoded
app.use(bodyParser.urlencoded({ extended: true }))

// include static file
app.use(express.static('public'))

// route: index
app.get('/', (req, res) => {
  return Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
})

// route: Add restaurant function
app.get('/restaurants/new', (req, res) => {
  res.render('new')
})

app.post('/restaurants', (req, res) => {
  const id = Number(req.body.id)
  const name = req.body.name
  const name_en = req.body.name_en
  const category = req.body.category
  const image = req.body.image
  const location = req.body.lccation
  const phone = req.body.phone
  const google_map = req.body.google_map
  const rating = Number(req.body.rating)
  const description = req.body.description

  return Restaurant.create({
    id, name, name_en, category, image, location, phone, google_map, rating, description
  })
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))
})

//route: detail
app.get('/restaurants/:restaurant_id/detail', (req, res) => {
  const id = req.params.restaurant_id

  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => console.error(error))
})

// route: update restaurant function
app.get('/restaurants/:restaurant_id/edit', (req, res) => {
  const id = req.params.restaurant_id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => {
      for (let key in restaurant) {
        restaurant[key] = restaurant[key].toString().split(' ').join('')
      }
      res.render('edit', { id, restaurant })
    })
    .catch(error => console.error(error))
})

app.post('/restaurants/:restaurant_id/edit', (req, res) => {
  const id = req.params.restaurant_id
  return Restaurant.findById(id)
    .then(restaurant => {
      restaurant.id = Number(req.body.id)
      restaurant.name = req.body.name
      restaurant.name_en = req.body.name_en
      restaurant.category = req.body.category
      restaurant.image = req.body.image
      restaurant.location = req.body.lccation
      restaurant.phone = req.body.phone
      restaurant.google_map = req.body.google_map
      restaurant.rating = Number(req.body.rating)
      restaurant.description = req.body.description

      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${id}/detail`))
    .catch(error => console.error(error))
})

// route: delete restaurant function
app.post('/restaurants/:restaurant_id/delete', (req, res) => {
  const id = req.params.restaurant_id
  return Restaurant.findByIdAndRemove(id)
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))
})

// search route
app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const restaurantsAfterSearch = restaurantList.results.filter(restaurant => restaurant.name.toLowerCase().includes(keyword.toLowerCase()))
  res.render('index', { restaurants: restaurantsAfterSearch, keyword })
})


app.listen(port, () => {
  console.log(`Listen to the http://localhost:${port}`)
})