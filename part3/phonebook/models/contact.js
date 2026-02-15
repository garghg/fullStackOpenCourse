const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const uri = process.env.MONGODB_URI

console.log('connecting to', uri)
mongoose
  .connect(uri)
  .then((result) => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const contactSchema = new mongoose.Schema({
    name: { 
      type: String,
      unique: true,
      minLength: 3
    },
    number: {
      type: String,
      minLength: 8,
      validate: {
        validator: function(v) {
          return /^\d{2,3}-\d+$/.test(v);
        },
        message: props => `${props.value} is not a valid phone number.`
      }
    },
})

contactSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Contact', contactSchema)