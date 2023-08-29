const Contact = require('../models/contactModel')
const mongoose = require('mongoose')

// get all contacts
const getContacts = async (req, res) => {
  const contacts = await Contact.find({}).sort({ last_name: 1 })

  res.status(200).json(contacts)
}

// get one contact
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

// create a new contact
const createContact = async (re, res) => {
  const { first_name, last_name, dob, category, phone, email, address } =
    req.body

  // check for missing information (first_name, last_name)
  let emptyFields = []

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
    const contact = await Contact.create({
      first_name,
      last_name,
      dob,
      category,
      phone,
      email,
      address,
    })
    res.status(200).json(contact)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// delete contact
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

// update contact
const updateContact = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Contact does not exist' })
  }

  const contact = await Contact.findOneAndUpdate({ _id: id }, { ...req.body })

  if (!workout) {
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
