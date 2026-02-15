const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const uri = `mongodb+srv://hghaardik_db_user:${password}@cluster0.snktaat.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Cluster0`

mongoose.connect(uri, { family: 4 })

const contactSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Contact = mongoose.model('Contact', contactSchema)


if (process.argv.length === 3) {
  
  Contact.find({}).then(result => {
    result.forEach(contact => {
      console.log(contact)
    })
    mongoose.connection.close()
  })

} else if (process.argv.length === 5) {

  const new_name = process.argv[3]
  const new_number = process.argv[4]

  const contact = new Contact({
    name: new_name,
    number: new_number
  })

  contact.save().then(result => {
    console.log(`Added ${new_name} ${new_number} to phonebook`)
    mongoose.connection.close()
  })

} else {
  console.log("Usage:")
  console.log("  node script.js <password>                    # list contacts")
  console.log("  node script.js <password> <name> <number>    # add contact")
  mongoose.connection.close()
}
