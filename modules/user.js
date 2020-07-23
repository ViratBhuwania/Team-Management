var mongoose = require('mongoose')
mongoose.connect('mongodb+srv://mongodbuser:jokerisback@cluster0.offol.mongodb.net/tm?retryWrites=true&w=majority&ssl=true', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
var conn = mongoose.connection

var userSchema = new mongoose.Schema({
  playername: {
    type: String,
    required: true,
    index: {
      unique: true
    }
  },

  age: {
    type: Number,
    required: true
  },

  player_type: {
    type: String,
    required: true
  },

  captain: {
    type: String,
    required: true
  },

  total_runs: {
    type: Number,
    required: true
  },

  strike_rate: {
    type: Number,
    required: true
  },

  average: {
    type: Number
  },

  wicket: {
    type: Number
  },

  economy: {
    type: Number
  },

  date: {
    type: Date,
    default: Date.now
  }
})

var userModel = mongoose.model('users', userSchema)

module.exports = userModel
