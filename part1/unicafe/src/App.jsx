import { useState } from 'react'

const Header = ({ text }) =>  <h1>{text}</h1>
const Button = ({ onClick, text}) => <button onClick={onClick}>{text}</button>

const App = () => {
  const text = 'Unicafe Feedback Collector'
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodClick = () =>{
    const updateGood = good + 1
    setGood(updateGood)
  }

  const badClick = () =>{
    const updateBad = bad + 1
    setBad(updateBad)
  }

  const neutralClick = () =>{
    const updateNeutral = neutral + 1
    setNeutral(updateNeutral)
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
    </div>
  )
}

export default App