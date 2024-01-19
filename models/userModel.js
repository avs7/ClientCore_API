const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
})

userSchema.statics.signup = async function (email, password) {
  if (!email || !password) throw Error('Please fill out all fields')
  if (!validator.isEmail(email)) throw Error('Please enter a valid email')
  if (!validator.isStrongPassword(password)) throw Error('Weak password')

  const exists = await this.findOne({ email })
  if (exists) throw Error('This email already exists')

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)

  const user = await this.create({ email, password: hash })

  return user
}

userSchema.statics.login = async function (email, password) {
  if (!email || !password) throw Error('Please enter email & password')

  const user = await this.findOne({ email })
  if (!user) throw Error('Invalid email')

  const match = await bcrypt.compare(password, user.password)
  if (!match) throw Error('Invalid password')

  return user
}

module.exports = mongoose.model('User', userSchema)


