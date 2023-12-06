const express = require('express')

const {
  createContact,
  getContact,
  getContacts,
  updateContact,
  deleteContact,
} = require('../controllers/contactController')

const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

router.use(requireAuth)

router.get('/', getContacts)
router.get('/:id', getContact)
router.post('/', createContact)
router.delete('/:id', deleteContact)
router.patch('/:id', updateContact)

module.exports = router
