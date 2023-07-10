/* global process */

require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')

const Person = require('./models/person')

app.use(express.static('build'))

app.use(cors())
app.use(express.json())

const logRequestBody = (req, res, next) => {
  if (req.method === 'POST') {
    morgan.token('body', () => JSON.stringify(req.body))
    morgan(':method :url :status - :response-time ms :body')(req, res, next)
  } else {
    morgan('dev')(req, res, next)
  }
}
app.use(logRequestBody)

app.get('/', (req, res) => {
  res.send('<h1>Phonebook</h1>')
})

app.get('/info', (req, res) => {
  const currentDate = new Date()
  const formattedDate = currentDate.toString()

  Person.find({}).then(persons => {
    const totalPeople = persons.length
    res.send(
      `<p>Phonebook has info for ${totalPeople} people</p>
        <p>${formattedDate}</p>`
    )
  })
})

app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons)
  })
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id

  Person.findById(id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).send('<h1>User not found: 404</h1>')
      }
    })
    .catch(error => {
      if (error.name === 'CastError') {
        response.status(404).send('<h1>User not found: 404</h1>')
      } else {
        console.error(error)
        response.status(500).json({ error: 'Internal Server Error' })
      }
    })
})


app.delete('/api/persons/delete/:id', (request, response) => {
  const id = request.params.id

  Person.findByIdAndDelete(id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => {
      console.error(error)
      response.status(500).json({ error: 'Internal Server Error' })
    })
})

app.post('/api/persons/create', async (request, response, next) => {
  const body = request.body

  if (!body.name) {
    return response.status(400).json({
      error: 'name missing'
    })
  }

  if (!body.number) {
    return response.status(400).json({
      error: 'number missing'
    })
  }

  const personSearch = await Person.findOne({ name: body.name })

  if (personSearch) {
    return response.status(409).json({
      error: 'name already exists'
    })
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
    .catch(error => next(error))
})

app.put('/api/persons/update/:id', (req, res) => {
  const id = req.params.id
  const body = req.body

  if (!body.name) {
    return res.status(400).json({ error: 'name missing' })
  }

  if (!body.number) {
    return res.status(400).json({ error: 'number missing' })
  }

  const updatedPerson = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(id, updatedPerson, { new: true })
    .then(updated => {
      if (updated) {
        res.json('person updated successfully')
      } else {
        res.status(404).json({ error: 'person not found' })
      }
    })
    .catch(error => {
      console.error(error)
      res.status(500).json({ error: 'Internal Server Error' })
    })
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' })
  }  else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})