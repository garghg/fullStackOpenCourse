import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonsForm from './components/PersonsForm'
import numberServices from './services/number'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchVal, setSearchVal] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    numberServices
      .getAll()
      .then(initialNumbers => {
        setPersons(initialNumbers)
      })
  }, [])

  const updateContact = (target) => {
    if (window.confirm(`${newName} is already in the phonebook. Update number?`)) {
      numberServices.update(target.id, {...target, number: newNumber})
      .then(returnedPersons=> {
        setPersons(persons.map(person => person.id === target.id ? returnedPersons : person))
        setMessage(`Updated ${newName}'s number`)
        setTimeout(() => {
          setMessage(null)
        }, 3000)
      })
      .catch(error => {
        setMessage(`${newName}'s information was not found in the server.`)
        setTimeout(() => {
          setMessage(null)
        }, 3000)
        numberServices.getAll().then(response => setPersons(response))
        setNewName('')
        setNewNumber('')
      })
    }
  }

  const addName = (event) => {
    event.preventDefault()
    
    const newNumObj = {
      name: newName,
      number: newNumber === '' ? "No number" : newNumber
    }

    if (persons.some(person => person.name === newName.trim())) {
      const person = persons.find(person => person.name === newName.trim())
      updateContact(person)
    } else {
      numberServices
        .create(newNumObj)
        .then(returnedNum => {
          setPersons(persons.concat(returnedNum))    
          setMessage(`Added ${newName}`)
          setTimeout(() => {
            setMessage(null)
          }, 3000)
          setNewName('')
          setNewNumber('')
        })
    } 
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const searchResults = [...persons]

  const handleSearch = (event) => {
    setSearchVal(event.target.value)
  }

  const filterArray = (arr) => {
    if (searchVal === '') {
      return arr
    } else {
      return arr.filter(person => person.name.toLowerCase().includes(searchVal.toLowerCase()))
    }
  }

  const handleDel = (name, id) => {
    if (window.confirm(`Delete ${name}?`)){
      numberServices.delNum(id)
      setPersons(prev => prev.filter(item => item.id !== id))
    }
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter searchVal={searchVal} handleSearch={handleSearch}/>
      <h2>Add a Contact</h2>
      <PersonsForm addName={addName} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons arr={filterArray(searchResults)} handleDel={handleDel}/>
    </div>
  )
}

export default App