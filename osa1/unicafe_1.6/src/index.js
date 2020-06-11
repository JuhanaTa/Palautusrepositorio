import React, { useState } from 'react'
import ReactdOM from 'react-dom'

const StatisticLine = (props) =>{
  return(
    <div>{props.value}</div>
  )
}

const Statistics = (props) =>{
  return(
    <table>
      <tbody>
        <tr>
          <td>good</td>
          <td><StatisticLine value ={props.good} /></td>
        </tr>  
        <tr>
          <td>neutral</td>
          <td><StatisticLine value ={props.neutral} /></td>
        </tr>
        <tr>
          <td>bad</td>
          <td><StatisticLine value ={props.bad} /></td>
        </tr>
        <tr>
          <td>all</td>
          <td><StatisticLine value ={props.all} /></td>
        </tr>
        <tr>
          <td>average</td>
          <td><StatisticLine value ={props.average} /></td>
        </tr>
        <tr>
          <td>positive</td>
          <td><StatisticLine value ={props.positive + "%"} /></td>
        </tr>
        </tbody>
    </table>
  )
}

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
  {text}
</button>
)

const App = (props) => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setVote] = useState(0)

  const handleGoodClick = () =>{
    setGood(good + 1)
    setVote(all + 1)
  }

  const handleNeutralClick = () =>{
    setNeutral(neutral + 1)
    setVote(all + 1)
  }

  const handleBadClick = () =>{
    setBad(bad + 1)
    setVote(all + 1)
  }
 
  if (all === 0){
    return (
      <div>
      <h1>Give some feedback</h1>
      <Button handleClick={handleGoodClick} text='good' />
      <Button handleClick={handleNeutralClick} text='neutral' /> 
      <Button handleClick={handleBadClick} text='bad' />
      <h1>Statistics</h1>
      <div>No feedback given</div>
      </div>
    )
  }
  
  return (
    <div>
      <h1>Give some feedback</h1>
      <Button handleClick={handleGoodClick} text='good' />
      <Button handleClick={handleNeutralClick} text='neutral' /> 
      <Button handleClick={handleBadClick} text='bad' />
      <h1>Statistics</h1>
      <Statistics  good={good} neutral={neutral} bad={bad} all={all} average={(good-bad)/all} positive={good/all * 100}/>
    </div>
  )
}
ReactdOM.render(<App />, document.getElementById('root'))
