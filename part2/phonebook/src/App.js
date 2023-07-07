import React, { useState, useEffect } from 'react'
import personService from './services/persons'

const Filter = ({newSearch, handleSearchChange}) => {
  return (
    <div>filter shown with<input value={newSearch} onChange={handleSearchChange}/></div>
  );
}

const PersonForm = (props) => {
  return (
    <form onSubmit={props.addPerson}>
      <div>
        name: <input value={props.newName} onChange={props.handleNameChange}/>
      </div>
      <div>
        number: <input  value={props.newNumber} onChange={props.handleNumberChange}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
}

const Persons = ({persons, newSearch, setPersons}) => {

  const deletefunction = (id, name) => {
    const confirmation = window.confirm(`Delete ${name} ?`);
    if (confirmation) {
      personService
      .deletePerson(id)
      .then(() => {
        const updatedPersons = persons.filter(person => person.id !== id);
        setPersons(updatedPersons);
      })
      .catch(error => {
        console.log("Error occurred while deleting the person:", error);
      });
    } else {
      return
    }
  }

  return (
    <div>{persons
      .filter((person) =>
        person.name.toLowerCase().includes(newSearch.toLowerCase())
      )
      .map((person) => (
        <div key={person.id}>
          {person.name} {person.number} <button onClick={()=>deletefunction(person.id, person.name)}>delete</button>
        </div>
        
      ))}
      
    </div>
  );
}

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newSearch, setNewSearch ] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setNewSearch(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      id: persons.length + 1,
      name: newName,
      number: newNumber,
    }

    if (persons.map(person => person.name).includes(personObject.name)) {
      const id=persons.find(person => person.name === newName)?.id;
      const confirmation = window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`);
      if (confirmation) {
        const updatedPersons = persons.map(person => {
          if (person.id === id) {
            return { ...person, number: newNumber }; // Update the number property
          }
          return person;
        });
        const updatedPerson = updatedPersons.find(person => person.id === id);
        personService
        .update(id,updatedPerson)
        .then(() => {
            setPersons(updatedPersons)
            setNewName('')
            setNewNumber('')
          }
        )
        .catch(error => {
          console.log("Error occurred while updating the person:", error);
        });
      } else {
        setNewName('')
        setNewNumber('')
      }
    }else{
      personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
      .catch(error => {
        console.log("Error occurred while adding the person:", error);
      });
    }
  }

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  },[]);

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newSearch={newSearch} handleSearchChange={handleSearchChange}/>
      <h2>add a new</h2>
      <PersonForm
      addPerson={addPerson}
      newName={newName}
      handleNameChange={handleNameChange}
      newNumber={newNumber}
      handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} newSearch={newSearch} setPersons={setPersons}/>
    </div>
  )
}

export default App