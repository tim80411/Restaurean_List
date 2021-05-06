const mongoose = require('mongoose')
const db = mongoose.connection

// connect mongodb and set up db's listener
mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb sucess!')
})

module.exports = db