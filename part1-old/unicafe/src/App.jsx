import { useState } from 'react'

const Button = ({ text, onClick }) => <button onClick={onClick}>{text}</button>

const StatisticLine = ({ text, value }) => <p>{text}: {value}</p>

const Statistics = ({ good, neutral, bad, average, total }) => {

  const calculate = (num, total) => {
    if (total === 0) {
      return 0
    }
    return num / total
  }

  if (total === 0){
    return <p>No feedback given.</p>
  }

  return (
    <>
    <table>
      <tr><StatisticLine text={"Good"} value={good}/></tr>
      <tr><StatisticLine text={"Neutral"} value={neutral}/></tr>
      <tr><StatisticLine text={"Bad"} value={bad}/></tr>
      <tr><StatisticLine text={"Total"} value={total}/></tr>
      <tr><StatisticLine text={"Average"} value={calculate(average, total)}/></tr>
      <tr><StatisticLine text={"Positive"} value={calculate(good, total)}/></tr>
    </table>
    </>
  )
  
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [average, setAverage] = useState(0)
  const [total, setTotal] = useState(0)

  const onClickGood = () => {
    const updatedGood = good + 1
    const updatedAvg = average + 1
    const updatedTotal = total + 1
    setGood(updatedGood)
    setAverage(updatedAvg)
    setTotal(updatedTotal)
  }

  const onClickNeutral = () => {
    const updatedNeutral = neutral + 1
    const updatedTotal = total + 1
    setNeutral(updatedNeutral)
    setTotal(updatedTotal)
    
  }

  const onClickBad = () => {
    const updatedBad = bad + 1
    const updatedAvg = average - 1
    const updatedTotal = total + 1
    setBad(updatedBad)
    setAverage(updatedAvg)
    setTotal(updatedTotal)
  }


  return (
    <div>
      <h1>Give Feedback</h1>
      <Button text={'Good'} onClick={onClickGood}/>
      <Button text={'Neutral'} onClick={onClickNeutral}/>
      <Button text={'Bad'} onClick={onClickBad}/>
      <h1>Statistics</h1>
      <Statistics good={good} bad={bad} neutral={neutral} average={average} total={total}/>
    </div>
  )
}

export default App