const express = require('express')
const Restaurant = require('../../models/restaurant')
const router = express.Router()

// route: Add restaurant function
router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/', (req, res) => {
  const { name, name_en, category, image, location, phone, google_map, rating, description } = req.body

  return Restaurant.create({
    name, name_en, category, image, location, phone, google_map, rating, description, userId: req.user._id
  })
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))
})

//route: detail
router.get('/:restaurant_id/detail', (req, res) => {
  const _id = req.params.restaurant_id
  const userId = req.user._id

  return Restaurant.findOne({ _id, userId })
    .lean()
    .then(restaurant => {
      const isFindGoogleMap = restaurant.google_map
      res.render('show', { restaurant, isFindGoogleMap })
    })
    .catch(error => console.error(error))
})

// route: update restaurant function
router.get('/:restaurant_id/edit', (req, res) => {
  const _id = req.params.restaurant_id
  const userId = req.user._id

  return Restaurant.findOne({ _id, userId })
    .lean()
    .then(restaurant => {
      res.render('edit', { id: _id, restaurant })
    })
    .catch(error => console.error(error))
})

router.put('/:restaurant_id', (req, res) => {
  const { name, name_en, category, image, location, phone, google_map, rating, description } = req.body
  const _id = req.params.restaurant_id
  const userId = req.user._id

  return Restaurant.findOne({ _id, userId })
    .then(restaurant => {
      restaurant.name = name
      restaurant.name_en = name_en
      restaurant.category = category
      restaurant.image = image
      restaurant.location = location
      restaurant.phone = phone
      restaurant.google_map = google_map
      restaurant.rating = Number(rating)
      restaurant.description = description

      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${_id}/detail`))
    .catch(error => console.error(error))
})

// route: delete restaurant function
router.delete('/:restaurant_id', (req, res) => {
  const _id = req.params.restaurant_id
  const userId = req.user._id

  return Restaurant.findOneAndDelete({ _id, userId })
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))
})

module.exports = router
