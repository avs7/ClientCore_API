const Contact = require('../models/contactModel')
const mongoose = require('mongoose')

// create a new contact
const createContact = async (req, res) => {
  const { first_name, last_name, dob, category, phone, email, address } =
    req.body

  // tracking empty fields for error messages
  let emptyFields = []

  if (!first_name) {
    emptyFields.push('last_name')
  }

  if (!last_name) {
    emptyFields.push('last_name')
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: 'Missing required information:', emptyFields })
  }
  // add to database 
  try {
    const user_id = req.user._id
    const contact = await Contact.create({
      first_name,
      last_name,
      dob,
      category,
      phone,
      email,
      address,
      user_id,
    })
    res.status(200).json(contact)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const getContacts = async (req, res) => {
  const user_id = req.user._id
  const contacts = await Contact.find({ user_id }).sort({ last_name: 1 })

  res.status(200).json(contacts)
}

const getContact = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'Contact not found' })
  }

  const contact = await Contact.findById(id)

  if (!contact) {
    return res.status(404).json({ error: 'Contact not found' })
  }

  res.status(200).json(contact)
}

const deleteContact = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Contact does not exist' })
  }

  const contact = await Contact.findByIdAndDelete({ _id: id })

  if (!contact) {
    return res.status(400).json({ error: 'Contact does not exist' })
  }

  res.status(200).json(contact)
}

const updateContact = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Contact does not exist' })
  }

  const contact = await Contact.findOneAndUpdate({ _id: id }, { ...req.body })

  if (!contact) {
    return res.status(400).json({ error: 'Contact does not exist' })
  }

  res.status(200).json(contact)
}

module.exports = {
  getContact,
  getContacts,
  createContact,
  deleteContact,
  updateContact,
}
