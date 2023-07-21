import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useNotificationDispatch } from './notificationContext'

import { useQuery, useMutation, useQueryClient } from 'react-query'
import { getAnecdotes, updateAnecdote } from './requests'

import { useState } from 'react'

const App = () => {
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()

  const [page, setPage]=useState(true)

  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    },
  })

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes + 1 })
    dispatch({ type: "SET_NOTIFICATION", payload: `anecdote '${anecdote.content}' voted` })
    setTimeout(()=>dispatch({ type: "SET_NOTIFICATION", payload: `` }),5000)
  }

  const result = useQuery('anecdotes', getAnecdotes, {
    refetchOnWindowFocus: false,
    onError:() => {
      setPage(false)
    }
  })

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }

  const anecdotes = result.data

  return (
    <div>
      {page ? 
      <>
        <h3>Anecdote app</h3>
    
        <Notification />
        <AnecdoteForm />
      
        {anecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleVote(anecdote)}>vote</button>
            </div>
          </div>
        )}
      </>:
      <>
        Server error, contact support
      </>}
    </div>
  )
}

export default App
