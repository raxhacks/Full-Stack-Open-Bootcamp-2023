const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json());

const logRequestBody = (req, res, next) => {
  if (req.method === 'POST') {
    morgan.token('body', () => JSON.stringify(req.body));
    morgan(':method :url :status - :response-time ms :body')(req, res, next);
  } else {
    morgan('dev')(req, res, next);
  }
};
app.use(logRequestBody);

let persons = [
    {
      "name": "Arto Hellas",
      "number": "040-123456",
      "id": 1
    },
    {
      "name": "Ada Lovelace",
      "number": "39-44-5323523",
      "id": 2
    },
    {
      "name": "Dan Abramov",
      "number": "12-43-234345",
      "id": 3
    },
    {
      "name": "Mary Poppendieck",
      "number": "39-23-6423122",
      "id": 4
    }
  ]

app.get('/', (req, res) => {
  res.send('<h1>Phonebook</h1>')
})

app.get('/info', (req, res) => {
    const currentDate = new Date();
    const formattedDate = currentDate.toString();

    res.send(
        `<p>Phonebook has info for ${persons.length} people</p>
        <p>${formattedDate}</p>`
    );
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
  
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
})

app.delete('/api/persons/delete/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(note => note.id !== id)
  
    response.status(204).end()
})

const generateId = () => {
    const randomId = Math.floor(Math.random() * 1000000) + 1;
    return randomId;
};
  
app.post('/api/persons/create', (request, response) => {
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

    if (persons.find(person => person.name === body.name)) {
        return response.status(409).json({ 
            error: 'name already exists' 
        })
    }

    const person = {
        name: body.name,
        number: body.number,
        id: generateId(),
    }

    persons = persons.concat(person)

    response.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})