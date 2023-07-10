const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3] || null
const number = process.argv[4] || null

if (name && !number) {
    console.log("Please provide both name and number to add person to the db.")
    process.exit(1)
}

const url =
  `mongodb+srv://raxhacks:${password}@phonebook.lnrwlmc.mongodb.net/persons-app?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name: name,
  number: number
})

if (name && number) {
    person.save().then(result => {
        console.log(`added ${name} number ${number} to phonebook`)
        mongoose.connection.close()
    })
}else{
    console.log("phonebook:")
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(person.name + " " + person.number)
        })
        mongoose.connection.close()
    })
}
