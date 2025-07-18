import { useState } from 'react'

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>
const votes = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0 }

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
  const [copy, setCopy] = useState({...votes})

  let x = Math.floor(Math.random() * anecdotes.length)
  while (x === selected){
    x = Math.floor(Math.random() * anecdotes.length)
  }

  const voted = () => {
    setCopy({
      ...copy,
      [selected]: copy[selected] + 1
    });
  }

const mostVoted = () => Object.keys(copy).reduce((a, b) => copy[a] > copy[b] ? a : '');

  return (
    <div>
      <h1>Anecdote of the Day</h1>
      {anecdotes[selected]}
      <br />
      This anecdote has {copy[selected]} votes.
      <br />
      <Button onClick={() => setSelected(x)} text='Generate Anecdote'/>
      <Button onClick={voted} text='Vote for Anecdote'/>
      <h2>Most Voted Anecdote</h2>
      {anecdotes[mostVoted()] || 'Vote to see the best anecdote here'}
    </div>
  )
}

export default App