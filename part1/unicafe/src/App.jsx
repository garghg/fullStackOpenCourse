import { useState } from 'react'

const Header = ({ text }) =>  <h1>{text}</h1>
const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

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
        <table>
          <tbody>
            <tr>
              <td>Good</td>
              <td>{good}</td>
            </tr>
            <tr>
              <td>Neutral</td>
              <td>{neutral}</td>
            </tr>
            <tr>
              <td>Bad</td>
              <td>{bad}</td>
            </tr>
            <tr>
              <td>Total Feedback</td>
              <td>{total}</td>
            </tr>
            <tr>
              <td>Average Score</td>
              <td>{dataTotal / dataNum}</td>
            </tr>
            <tr>
              <td>Customer Satisfaction</td>
              <td>{`${(good/dataNum)*100}%`}</td>
            </tr>
          </tbody>
          
        </table>
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