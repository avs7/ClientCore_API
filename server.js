const express = require('express')
const mongoose = require('mongoose')

const app = express()

app.get('/', (req, res) => {
  res.send('test123')
})

app.listen(3000, () => {
  console.log('listening on port 3000')
})
