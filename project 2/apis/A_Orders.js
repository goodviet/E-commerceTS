const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')


const ObjectId = mongoose.Types.ObjectId;

router.post('/add', (req, res) => {
  res.send('GET request to the homepage')
})

module.exports = router