
const Header = (props) => <h1>{props.course}</h1>

const Part = (props) => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>
)

const Content = ({ parts }) => {

  const partComponents = parts.map((x) => {
    return <Part key={x.id} part={x} />
  })
  
  return (
    <>
      {partComponents}
    </>
  )

}

const Total = ({ parts }) => {
  const totalEx = parts.reduce((acc, item) => {
    return acc + item.exercises
  }, 0)

  return (
    <>
      <p>Total Number of Exercises {totalEx}</p>
    </>
  )
}

const Course = ({ courses }) => {

  const course = courses.map((course) => {
    return (
      <div key={course.id} >
        <Header course={course.name}/>
        <Content parts={course.parts}/>
        <Total parts={course.parts}/>
      </div>
    )
  })

  return (
    <>
      {course}
    </>
  )

}

export default Course