const bcrypt = require('bcryptjs')

const restaurantList = require('./restaurant.json')
const Restaurant = require('../restaurant.js')
const User = require('../user')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const db = require('../../config/mongoose.js')

const restaurants = restaurantList.results
const users = [
  {
    name: 'user1',
    email: 'user1@example.com',
    password: '12345678'
  },
  {
    name: 'user2',
    email: 'user2@example.com',
    password: '12345678'
  }
]

db.once('open', () => {
  return Promise
    .all(Array.from(users, (user, index) => {
      return bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(user.password, salt))
        .then(hash => User.create({
          name: user.name,
          email: user.email,
          password: hash
        }))
        .then(user => {
          const userId = user._id
          return Promise.all(Array.from({ length: 3 }, (_, i) => {
            return Restaurant.create({
              ...restaurants[(i + (index * 3))],
              userId
            })
          }))
        })
    }))
    .then(() => {
      console.log('seeder success')
      return process.exit()
    })

})




