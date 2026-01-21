const Person = ({ name, number }) => {
  return (
    <div>
    {name + " " + number}
    </div>
  )
}

const Persons = ({ arr }) => {
  return (
    <>
      {arr.map(person => <Person name={person.name} key={person.name} number={person.number}/>)}
    </>
  )
}

export default Persons