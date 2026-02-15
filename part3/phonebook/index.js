require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const Contact = require('./models/contact')

const app = express()

app.use(express.static('dist'))
app.use(express.json())

morgan.token('content', function getContent(request, response) {
    if (request.method === 'POST') {
        return JSON.stringify(request.body)
    }
    return ''
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'))


app.get('/', (request, response) => {
    response.send('Test')
})

app.get('/api/persons', (request, response) => {
    Contact.find({}).then((notes) => {
      response.json(notes)
    })
})

app.get('/info', (request, response) => {
    const total_contacts= contacts.length
    const now = new Date().toString();
    response.send(`Phonebook has info for ${total_contacts} people<br>${now}`)
})

app.get('/api/persons/:id', (request, response, next) => {
    Contact.findById(request.params.id)
        .then(contact => {
            response.json(contact)
        })
        .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
    Contact.findByIdAndDelete(request.params.id)
        .then(note => {
            if (note) {
                response.json(note)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
    const body = request.body

    if (!body.name) {
        return response.status(400).json({
            error: 'contact name missing'
        })
    }

    if (!body.number) {
        return response.status(400).json({
            error: 'contact number missing'
        })
    }

    const contact = new Contact({
        name: body.name,
        number: body.number
    })

    contact.save()
        .then((savedContact) => {
            response.json(savedContact)
        })
        .catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).json({ error: 'malformatted id' })
  }

  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})