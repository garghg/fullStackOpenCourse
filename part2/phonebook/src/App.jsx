import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonsForm from './components/PersonsForm'
import numberServices from './services/number'
import number from './services/number'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchVal, setSearchVal] = useState('')

  useEffect(() => {
    numberServices
      .getAll()
      .then(initialNumbers => {
        setPersons(initialNumbers)
      })
  }, [])

  const addName = (event) => {
    event.preventDefault()
    
    const newNumObj = {
      name: newName,
      number: newNumber === '' ? "No number" : newNumber
    }

  if (persons.some(person => person.name === newName.trim())) {
      alert(`${newName.trim()} is already added to the phonebook.`)
    } else {
      numberServices
        .create(newNumObj)
        .then(returnedNum => {
          setPersons(persons.concat(returnedNum))    
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


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchVal={searchVal} handleSearch={handleSearch}/>
      <h2>Add a Contact</h2>
      <PersonsForm addName={addName} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons arr={filterArray(searchResults)}/>
    </div>
  )
}

export default App