const Contact = require('../models/contactModel')
const mongoose = require('mongoose')

// get all contacts
const getContacts = async (req, res) => {
  const contacts = await Contact.find({}).sort({last_name: 1})

  res.status(200).json(contacts)
}

// get one contact
const getContact = async (req, res) => {
  const {id} = req.params

  if (!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error: 'Contact not found'})
  }

  const contact = await Contact.findById(id)

  if (!contact) {
    return res.status(404).json({error: 'Contact not found'})
  }

  res.status(200).json(contact)
}

// create a new contact
const createContact = async (re, res) => {
  const {first_name, last_name, dob, category, phone, email, address} = req.body
}