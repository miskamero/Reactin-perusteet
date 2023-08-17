import { useState } from 'react'

const App = () => {
  const anecdotes = [
    '1. If it hurts, do it more often.',
    '2. Adding manpower to a late software project makes it later!',
    '3. The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    '4. Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    '5. Premature optimization is the root of all evil.',
    '6. Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    '7. Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    '8. The only way to go fast, is to go well.'
  ];

  const points = {0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0} // Create an array to initialize vote counts for each anecdote
  const [votePoints, setVotePoints] = useState(points) // Initialize votePoints state with points array
  const [selected, setSelected] = useState(0) // Initialize selected state with 0, Display first anecdote by default
  const updatedVotePoints = {...votePoints} // Creates a copy of votePoints array to modify

  const handleVote = () => { // Function to handle vote button click
    updatedVotePoints[selected] += 1 // Increment vote count for selected anecdote
    setVotePoints(updatedVotePoints) // Update votePoints state with the modified copy
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}<br/> has {updatedVotePoints[selected]} votes</p>
      <br/><br/>
      <button onClick={() => setSelected(Math.floor(Math.random() * anecdotes.length))}>next anecdote</button>
      <button onClick={handleVote}>vote</button>
      <button onClick={console.log(votePoints)}>Show arrays in console</button>
      <br/><br/>
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[
        Object.keys(updatedVotePoints).reduce((a, b) => 
        updatedVotePoints[a] > updatedVotePoints[b] ? a : b // Find index of anecdote with most votes in updatedVotePoints array by comparing vote counts
        )]
        }<br/> has {Object.values(updatedVotePoints).reduce((a, b) => a > b ? a : b)} votes</p>
    </div>
  )
}

export default App