import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'


const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    appendAnecdote: (state,action) => {
      state.push(action.payload)
    },
    setAnecdotes: (state,action) => {
      return action.payload
    }
  }
})

export const { appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const updateVotes = (id, anecdotes) => {
  return async dispatch => {
    const getAnecdote = anecdotes.find(anecdote=>anecdote.id===id)
    const updatedAnecdote = {...getAnecdote, votes:getAnecdote.votes+1}
    await anecdoteService.updateVotes(id,updatedAnecdote)
    dispatch(setAnecdotes(anecdotes.map(anecdote=>{
      if (anecdote.id===id) {
        return {...anecdote, votes:anecdote.votes+1}
      }
      return anecdote
    }).sort((a, b) => b.votes - a.votes)))
  }
}



export default anecdoteSlice.reducer