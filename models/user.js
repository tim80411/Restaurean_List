const mongoose = require('mongoose')
const Schema = mongoose.Schema
const UserSchema = new Schema({
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true,
    match: [/([\w\.\u4e00-\u9fa5]+)\@([\w]+)\.(\D){2,8}/, 'you add a wronng email'],
    unique: true
  },
  password: {
    type: String,
    match: [/^[^\u4e00-\u9fa5]{6,10}$/],
    require: true,
    trim: true,
    minlength: [6, 'you should use at least six character for password'],
    maxlength: 10
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('User', UserSchema)