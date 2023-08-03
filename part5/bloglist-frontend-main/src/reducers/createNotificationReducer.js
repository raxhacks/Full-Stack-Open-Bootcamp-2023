import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setNotification: (state, action) => {
      return action.payload.message // Only store the message in the state
    },
    clearNotification: () => {
      return ''
    }
  }
})

export const { setNotification, clearNotification } = notificationSlice.actions

// Asynchronous action creator with Redux Thunk for handling timeout
export const showNotification = (message, timeout) => {
  return async dispatch => {
    dispatch(setNotification({ message })) // Dispatch setNotification with the message

    // Clear the notification after the specified timeout
    setTimeout(() => {
      dispatch(clearNotification())
    }, timeout)
  }
}

export default notificationSlice.reducer