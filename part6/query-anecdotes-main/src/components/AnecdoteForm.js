import { useMutation, useQueryClient } from 'react-query'
import { createAnecdote } from '../requests'
import { useNotificationDispatch } from '../notificationContext'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()

  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData('anecdotes')
      queryClient.setQueryData('anecdotes', anecdotes.concat(newAnecdote))
    },
    onError: (error) => {
      dispatch({ type: "SET_NOTIFICATION", payload: `An error occurred: ${error.message}` });
    },
  })
  

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    if (content.length >= 5) {
      dispatch({ type: "SET_NOTIFICATION", payload: `created '${content}'` })
      newAnecdoteMutation.mutate({ content, votes: 0 });
      setTimeout(() => dispatch({ type: "SET_NOTIFICATION", payload: `` }), 5000)
    } else {
      dispatch({ type: "SET_NOTIFICATION", payload: 'Content length should be at least 5 characters.' })
      setTimeout(() => dispatch({ type: "SET_NOTIFICATION", payload: `` }), 5000)
    }
    return
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
