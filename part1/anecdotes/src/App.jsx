import { useState } from 'react'

const Button = ({ text, onClick }) => <button onClick={onClick}>{text}</button>

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  const copy = [ ...votes ]

  const getRandomNum = (max) => {
    let randNum = Math.floor(Math.random() * max)
    while (randNum === selected) {
      randNum = Math.floor(Math.random() * max)
    }
    return randNum;
  }

  const vote = () => {
    copy[selected] += 1
    setVotes(copy)
  }

  const maxVotes = () => {
    const maxVotes = Math.max(...votes)
    const maxVotesIdx = votes.indexOf(maxVotes)
    return anecdotes[maxVotesIdx]
  }

  return (
    <div>
      <h1>Anecdote Of The Day</h1>
      <p>{anecdotes[selected]}</p>
      <p>This anecdote has {votes[selected]} votes.</p>
      <Button text={"Next Anecdote"} onClick={() => setSelected(getRandomNum(anecdotes.length))}/>
      <Button text={"Vote"} onClick={vote}/>
      <h1>Anecdote with Most Votes</h1>
      <p>{maxVotes()}</p>
    </div>
  )
}

export default App

