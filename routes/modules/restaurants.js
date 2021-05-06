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
    name, name_en, category, image, location, phone, google_map, rating, description
  })
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))
})

//route: detail
router.get('/:restaurant_id/detail', (req, res) => {
  const id = req.params.restaurant_id

  return Restaurant.findById(id)
    .lean()
    .then(restaurant => {
      const isFindGoogleMap = restaurant.google_map
      res.render('show', { restaurant, isFindGoogleMap })
    })
    .catch(error => console.error(error))
})

// route: update restaurant function
router.get('/:restaurant_id/edit', (req, res) => {
  const id = req.params.restaurant_id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => {
      // restaurant.phone = Number(restaurant.phone)
      res.render('edit', { id, restaurant })
    })
    .catch(error => console.error(error))
})

router.put('/:restaurant_id', (req, res) => {
  const id = req.params.restaurant_id
  return Restaurant.findById(id)
    .then(restaurant => {
      restaurant.name = req.body.name
      restaurant.name_en = req.body.name_en
      restaurant.category = req.body.category
      restaurant.image = req.body.image
      restaurant.location = req.body.location
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
router.delete('/:restaurant_id', (req, res) => {
  const id = req.params.restaurant_id
  return Restaurant.findByIdAndRemove(id)
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))
})

module.exports = router
