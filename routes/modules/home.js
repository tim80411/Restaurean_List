const express = require('express')
const Restaurant = require('../../models/restaurant')

const router = express.Router()

// route: index
router.get('/', (req, res) => {
  return Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
})

// route: search function
router.get('/search', (req, res) => {
  const keyword = req.query.keyword

  return Restaurant.find()
    .lean()
    .then(restaurants => {
      const restaurantsAfterSearch = restaurants.filter(restaurant => restaurant.name.toLowerCase().includes(keyword.toLowerCase()))
      const isNotFind = restaurantsAfterSearch.length === 0
      res.render('index', { restaurants: restaurantsAfterSearch, keyword, isNotFind })
    })
    .catch(error => console.error(error))
})

router.get('/sort', (req, res) => {
  const sortPattern = req.query.sort
  console.log(typeof(sortPattern))
  
  return Restaurant.find()
    .lean()
    .sort(sortPattern)
    .then(restaurants => {
      res.render('index', { restaurants, sortPattern })
    })
    .catch(error => console.error(error))
})


module.exports = router
