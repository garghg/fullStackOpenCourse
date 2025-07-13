import { useState } from 'react'

const Header = ({ text }) =>  <h1>{text}</h1>
const Button = ({ onClick, text}) => <button onClick={onClick}>{text}</button>

const App = () => {
  const text = 'Unicafe Feedback Collector'
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [scores, setScores] = useState([])
  const dataNum = scores.length
  const dataTotal = scores.reduce((accumulator, currentValue) => accumulator + currentValue, 0)

  const goodClick = () =>{
    const updateGood = good + 1
    setGood(updateGood)
    setTotal(newtotal => newtotal + 1 )
    setScores(prevScores => prevScores.concat(1))
  }

  const badClick = () =>{
    const updateBad = bad + 1
    setBad(updateBad)
    setTotal(newtotal => newtotal + 1 )
    setScores(prevScores => prevScores.concat(-1))
  }

  const neutralClick = () =>{
    const updateNeutral = neutral + 1
    setNeutral(updateNeutral)
    setTotal(newtotal => newtotal + 1 )
    setScores(prevScores => prevScores.concat(0))
  }


  return (
    <div>
      <Header text={text} />
      <Button onClick={goodClick} text='Good'/>
      <Button onClick={neutralClick} text='Neutral'/>
      <Button onClick={badClick} text='Bad'/>

      <Header text='Stats'/>

      Good Counter: {good}
      <br />
      Neutral Counter: {neutral}
      <br />
      Bad Counter: {bad}
      <br />
      Total Feedback: {total}
      <br />
      Average Score: {isNaN(dataTotal / dataNum) ? 'Not Enough Data' : (dataTotal / dataNum)}
      <br />
      {isNaN((good/dataNum)*100) ? '': `${(good/dataNum)*100}% of Customers Liked Unicafe`}
    </div>
  )
}

export default App