const mongoose = require('mongoose')
require('dotenv').config()

const uri=process.env.URI

mongoose.connect(uri, { family: 4 })

const contactSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Contact = mongoose.model('Contact', contactSchema)

const contact = new Contact({
  name: "Mary Poppendieck", 
  number: "39-23-6423122"
})

contact.save().then(result => {
  console.log('contact saved!')
  mongoose.connection.close()
})