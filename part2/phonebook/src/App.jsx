import { useState } from 'react'

const Person = ({ name, number }) => {
  return (
    <div>
    {name + " " + number}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchVal, setSearchVal] = useState('')

  const addName = (event) => {
    event.preventDefault()
    
    const nameObj = {
      name: newName,
      number: newNumber === '' ? "No number" : newNumber
    }

  if (persons.some(person => person.name === newName.trim())) {
      alert(`${newName.trim()} is already added to the phonebook.`)
    } else {
      setPersons(persons.concat(nameObj))
    setNewName('')
    setNewNumber('')
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
      <form>
        <div>
          Search Name: <input value={searchVal} onChange={handleSearch}/>
        </div>
      </form>
      <h2>Add a Contact</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {filterArray(searchResults).map(person => <Person name={person.name} key={person.name} number={person.number}/>)}
    </div>
  )
}

export default App