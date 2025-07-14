import { useState } from 'react'

const Header = ({ text }) =>  <h1>{text}</h1>
const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>
const Staticline = ({text, value}) => <button>{text}: {value}</button>

const Stats = ({ good, bad, neutral, total, dataTotal, dataNum}) => {
  if (dataNum === 0){
    return(
      <div>
        <p>No feedback yet</p>
      </div>
    )
  }else{
    return(
      <div>
        <Staticline text='Good' value={good}/>
        <br />
        <Staticline text='Neutral' value={neutral}/>
        <br />
        <Staticline text='Bad' value={bad}/>
        <br />
        <Staticline text='Total' value={total}/>
        <br />
        <Staticline text='Average Score' value={dataTotal / dataNum}/>
        <br />
        <Staticline text='Customer Satisfaction' value={`${(good/dataNum)*100}%`}/>
      </div>
    )
  }
}


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
s


  return (
    <div>
      <Header text={text} />
      <Button onClick={goodClick} text='Good'/>
      <Button onClick={neutralClick} text='Neutral'/>
      <Button onClick={badClick} text='Bad'/>

      <Header text='Stats'/>
      <Stats good={good} bad={bad} neutral={neutral} total={total} dataTotal={dataTotal} dataNum={dataNum}/>
    </div>
  )
}

export default App