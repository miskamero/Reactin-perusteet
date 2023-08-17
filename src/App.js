import { useState } from 'react'

const StatisticsLine = ({text, value}) => {
  return (
    <div>
      <table>
        <tbody>
          <tr><td>{text}</td><td>{value}</td></tr>
        </tbody>
      </table>
    </div>
  )
}

const Stats = ({good, neutral, bad, all }) => {
  if (all >= 1){
    return (
      <div>
        <h1>statistics</h1>
        <StatisticsLine text="good" value={good} />
        <StatisticsLine text="neutral" value={neutral} />
        <StatisticsLine text="bad" value={bad} />
        <StatisticsLine text="all" value={all} />
        <StatisticsLine text="average" value={all === 0 ? 0 : ((good - bad) / all).toFixed(2)} />
        <StatisticsLine text="positive" value={all === 0 ? 0 : (good / all * 100).toFixed(2) + " %"} />
      </div>
    )
  } else{
    return (
      <div>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>
    )
  }
}


const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const all = good + neutral + bad

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={() => setGood(good + 1)}>good</button>
      <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
      <button onClick={() => setBad(bad + 1)}>bad</button>
      <Stats good={good} neutral={neutral} bad={bad} all={all} />
    </div>
  )
}

export default App