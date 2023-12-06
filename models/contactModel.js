const mongoose = require('mongoose')

const Schema = mongoose.Schema

const contactSchema = new Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: String,
    user_id: {
      type: String,
      required: true,
    },
    dob: Date,
    category: String,
    phone: String,
    email: String,
    address: [{ street: String, city: String, state: String, zip: String }],
    notes: [
      {
        title: { type: String, required: true },
        details: { type: String, required: true },
        category: String,
        note_id: { type: String, required: true },
      },
      { timestamps: true },
    ],
    tasks: [
      {
        title: { type: String, required: true },
        details: String,
        status: { type: Boolean, default: false, required: true },
        priority: { type: String, default: '1', required: true },
        task_id: { type: String, required: true },
      },
      { timestamps: true },
    ],
  },
  { timestamps: true }
)

module.exports = mongoose.model('Contact', contactSchema)
