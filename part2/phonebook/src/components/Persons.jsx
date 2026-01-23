const Button = ({ name, id, handleDel }) => <button onClick={() => handleDel(name, id)}>Delete Contact</button>

const Person = ({ name, number, id, handleDel }) => {
  return (
    <div>
    {name + " " + number}
    {<Button name={name} id={id} handleDel={handleDel}/>}
    </div>
    
  )
}

const Persons = ({ arr, handleDel }) => {
  return (
    <>
      {arr.map(person => <Person name={person.name} key={person.name} number={person.number} id={person.id} handleDel={handleDel}/>)}
    </>
  )
}

export default Persons