import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';

const Button = ({text, func}) => {
  return (
    <button onClick={func}>
      {text}
    </button>
  );
}

const CurrentVotes = ({votes}) => {
  return (
    <div>has {votes} votes</div>
  );
}

const MostVotes = ({mostVotedAnecdote}) => {
  return (
    <div>
      <h1>Anecdote with most votes</h1>
      {mostVotedAnecdote.anecdote}
      <br/>
      <CurrentVotes votes={mostVotedAnecdote.votes}/>
    </div>
  );
}

const App = (props) => {
  const [selected, setSelected] = useState(Math.floor(Math.random() * props.anecdotes.length))
  const [votes, setVotes] = useState(() => {
    const initialState = {};
    props.anecdotes.forEach((_, index) => {
      initialState[index] = 0;
    });
    return initialState;
  });
  const [mostVotedAnecdote, setMostVotedAnecdote] = useState({anecdote:"",votes:0})

  const setNewSelected = () => {
    setSelected(Math.floor(Math.random() * props.anecdotes.length));
  }

  const setNewVote = () => {
    setVotes(() => {
      const updatedVotes = { ...votes };
      updatedVotes[selected] += 1;
      if (updatedVotes[selected] > mostVotedAnecdote.votes) {
        setMostVotedAnecdote({
          anecdote: props.anecdotes[selected],
          votes: updatedVotes[selected],
        });
      }
      return updatedVotes;
    });
  };
  
  return (
    <div>
      <h1>Anecdote of the day</h1>
      {props.anecdotes[selected]}
      <br/>
      <CurrentVotes votes={votes[selected]}/>
      <Button text="vote" func={setNewVote}/>
      <Button text="next anecdote" func={setNewSelected}/>
      <MostVotes mostVotedAnecdote={mostVotedAnecdote}/>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

createRoot(document.getElementById('root')).render(<App anecdotes={anecdotes}/>);
