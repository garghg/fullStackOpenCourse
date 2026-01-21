import { useState } from 'react'

const Person = ({ name }) => {
  return (
    <div>
    {name}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const addName = (event) => {
    event.preventDefault()
    
    const nameObj = {
      name: newName
    }

  if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to the phonebook.`)
    } else {
      setPersons(persons.concat(nameObj))
    setNewName('')
    }
    
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <Person name={person.name} key={person.name}/>)}
      
    </div>
  )
}

export default App