require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const contactRoutes = require('./routes/contacts')
const userRoutes = require('./routes/user')

const app = express()

app.use(express.json())

//test
app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

app.use('/api/contacts', contactRoutes)
app.use('/api/user', userRoutes)

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`connected to DB & listening on port ${process.env.PORT}`)
    })
  })
  .catch(err => console.log(err))
