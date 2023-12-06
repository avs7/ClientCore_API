require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const contactRoutes = require('./routes/contacts')
const userRoutes = require('./routes/user')

const app = express()

app.use(express.json())
app.use('/api/contacts', contactRoutes)
app.use('/api/user', userRoutes)

app.get('/', (req, res) => {
  res.send('test123')
})

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`connected to DB & listening on port ${process.env.PORT}`)
    })
  })
  .catch(err => console.log(err))
