const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const passport = require('passport')

const User = require('../../models/user')

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login',
  failureFlash: true
}))

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  const errors = []
  if (!name || !email || !password || !confirmPassword) {
    errors.push('all fields are necessary')
  }

  if (password !== confirmPassword) {
    errors.push('password did not match the confirm password')
  }

  if (errors.length) {
    return res.render('register', {
      name,
      email,
      password,
      confirmPassword,
      errors
    })
  }

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
      } else {
        errors.push('This email had been registed')
        res.render('register', {
          name,
          email,
          password,
          confirmPassword,
          errors
        })
      }
    })
    .catch(err => {
      console.log(err)
    })
})

router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_message', 'Logout success')
  res.redirect('/users/login')
})

module.exports = router