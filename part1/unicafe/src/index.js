import React, { useState } from 'react'
import { createRoot } from 'react-dom/client';

const Feedback = ({setGood,setNeutral,setBad}) => {
  return(
    <>
      <h1>
        give feedback
      </h1>
      <Button setFeedback={setGood} text="good"/>
      <Button setFeedback={setNeutral} text="neutral"/>
      <Button setFeedback={setBad} text="bad"/>
    </>
  );
}

const Button = ({setFeedback, text}) => {
  return(
    <button onClick={()=>setFeedback(prev=>prev+1)}>
      {text}
    </button>
  );
}

const Statistics = ({good,neutral,bad}) => {
  const all=good+neutral+bad;
  const average=(good+(-1*bad))/all;
  const positive=good*100/all;

  if (good===0 && neutral===0 && bad===0) {
    return (
      <>
        <h1>statistics</h1>
        <h3>No feedback given</h3>
      </>
    );
  }
  return(
    <>
      <h1>statistics</h1>
      <table>
        <tbody>
          <tr>
            <td>good</td>
            <td>{good}</td>
          </tr>
          <tr>
            <td>neutral</td>
            <td>{neutral}</td>
          </tr>
          <tr>
            <td>bad</td>
            <td>{bad}</td>
          </tr>
          <tr>
            <td>all</td>
            <td>{all}</td>
          </tr>
          <tr>
            <td>average</td>
            <td>{average}</td>
          </tr>
          <tr>
            <td>positive</td>
            <td>{positive} %</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

const StatisticsLine = ({text, value, positive}) => {
  return(
    <>
      {text} {value}{positive && "%"}
    </>
  );
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Feedback setGood={setGood} setNeutral={setNeutral} setBad={setBad}/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

createRoot(document.getElementById('root')).render(<App />);

