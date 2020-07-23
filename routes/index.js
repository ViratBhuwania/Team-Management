var express = require('express')
var router = express.Router()
var userModel = require('../modules/user')
const { check, validationResult } = require('express-validator')
var getAllPlayer = userModel.find({})

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Team Management', msg: '' })
})

router.post('/', function (req, res, next) {
  var playername = req.body.pname
  var age = req.body.age
  var playertype = req.body.player_type
  var captain = req.body.capt
  var runs = req.body.runs
  var strike_rate = req.body.strike_rate
  var average = req.body.avg
  var wicket = req.body.wicket
  var economy = req.body.economy

  var userDetails = new userModel({
    playername: playername,
    age: age,
    player_type: playertype,
    captain: captain,
    total_runs: runs,
    strike_rate: strike_rate,
    average: average,
    wicket: wicket,
    economy: economy
  })

  userDetails.save((err, doc) => {
    if (err) throw err
    res.render('index', { title: 'Team Management', msg: 'Player Added Successfully' })
  })
})

router.get('/view-all-player', function (req, res, next) {
  var perPage = 2
  var page = 11
  getAllPlayer.skip((perPage * page) - perPage)
    .limit(perPage).exec(function (err, data) {
      if (err) throw err
      userModel.countDocuments({}).exec((err, count) => {
        res.render('view-all-player', {
          title: 'Team Management',
          msg: '',
          records: data,
          current: page,
          pages: Math.ceil(count / perPage)
        })
      })
    })
})

router.get('/view-all-player/:page', function (req, res, next) {
  var perPage = 2
  var page = 11
  getAllPlayer.skip((perPage * page) - perPage)
    .limit(perPage).exec(function (err, data) {
      if (err) throw err
      userModel.countDocuments({}).exec((err, count) => {
        res.render('view-all-player', {
          title: 'Team Management',
          msg: '',
          records: data,
          current: page,
          pages: Math.ceil(count / perPage)
        })
      })
    })
})

// for deleting player
router.get('/view-all-player/delete/:id', function (req, res, next) {
  var player_id = req.params.id
  var playerdel = userModel.findByIdAndDelete(player_id)
  playerdel.exec(function (err) {
    if (err) throw err
    res.redirect('/view-all-player')
  })
})

// for updating player
router.get('/view-all-player/edit/:id', function (req, res, next) {
  var player_id = req.params.id
  var getplayer = userModel.findById(player_id)
  getplayer.exec(function (err, data) {
    if (err) throw err
    res.render('edit_player', { title: 'Team Management', msg: '', records: data, id: player_id })
  })
})

router.post('/view-all-player/edit/', function (req, res, next) {
  var player_id = req.body.id
  var pname = req.body.pname
  var age = req.body.age
  var playertype = req.body.playertype
  var captain = req.body.captain
  var runs = req.body.runs
  var strike_rate = req.body.strike_rate
  var avg = req.body.avg
  var wicket = req.body.wicket
  var economy = req.body.economy

  var updateplayer = userModel.findByIdAndUpdate(player_id, {
    playername: pname,
    age: age,
    player_type: playertype,
    captain: captain,
    total_runs: runs,
    strike_rate: strike_rate,
    average: avg,
    wicket: wicket,
    economy: economy
  })

  updateplayer.exec(function (err, doc) {
    if (err) throw err
    res.redirect('/view-all-player')
  })
})

module.exports = router
