const mongoose = require('mongoose')
const db = mongoose.connection
const MONGODB_URI = process.env.MONGODB_URI

// connect mongodb and set up db's listener
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true
 })

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb sucess!')
})

module.exports = db