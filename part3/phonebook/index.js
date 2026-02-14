const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

app.use(express.json())

morgan.token('content', function getContent(request, response) {
    if (request.method === 'POST') {
        return JSON.stringify(request.body)
    }
    return ''
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'))
app.use(cors())


let contacts = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/', (request, response) => {
    response.send('Test')
})

app.get('/api/persons', (request, response) => {
  response.json(contacts)
})

app.get('/info', (request, response) => {
    const total_contacts= contacts.length
    const now = new Date().toString();
    response.send(`Phonebook has info for ${total_contacts} people<br>${now}`)
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const contact = contacts.find(contact => contact.id === id)

    if (contact) {
        response.json(contact)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    contacts = contacts.filter(contact => contact.id !== id)

    response.status(204).end()
})

const generateId = () => {
    return String(Math.floor(Math.random() * 999999) + 1000)
}

app.post('/api/persons', (request, response) => {
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

    const duplicate = contacts.find(contact => contact.name === body.name)

    if (duplicate) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    }

    const contact = {
        id: generateId(),
        name: body.name,
        number: body.number
    }

    contacts = contacts.concat(contact)
    response.json(contact)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})