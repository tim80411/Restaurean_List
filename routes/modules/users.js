const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')

const User = require('../../models/user')

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', (req, res) => {
  const { email, password } = req.body
  return User.findOne({ email })
    .then(user => {
      if (!user) res.redirect('login')
    })
})

router.get('/register', (req, res) => {
  res.render('register')

})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body

  return User.findOne({ email })
    .then(user => {
      if (!user) {
        return bcrypt
          .genSalt(10)
          .then(salt => bcrypt.hash(password, salt))
          .then(hash => User.create({
            name,
            email,
            password: hash,
          }))
          .then(() => res.redirect('/'))
          .catch(err => {
            console.log(err)
          })
      }

      res.render('register', {
        name,
        email,
        password,
        confirmPassword
      })

    })
    .catch(err => {
      console.log(err)
    })
})

module.exports = router