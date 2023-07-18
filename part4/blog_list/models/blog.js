const config = require('../utils/config')
const logger = require('../utils/logger')
const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator')

const blogSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true },
    author: { type: String, required: true } ,
    url: { type: String, required: true, unique: true },
    likes: { type: Number, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

blogSchema.plugin(uniqueValidator)
  
module.exports = mongoose.model('Blog', blogSchema)