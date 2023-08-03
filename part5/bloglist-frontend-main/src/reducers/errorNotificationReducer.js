import { createSlice } from '@reduxjs/toolkit'

const errorNotificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setErrorNotification: (state, action) => {
      return action.payload.message // Only store the message in the state
    },
    clearErrorNotification: () => {
      return ''
    }
  }
})

export const { setErrorNotification, clearErrorNotification } = errorNotificationSlice.actions

// Asynchronous action creator with Redux Thunk for handling timeout
export const showErrorNotification = (message, timeout) => {
  return async dispatch => {
    dispatch(setErrorNotification({ message })) // Dispatch setNotification with the message

    // Clear the notification after the specified timeout
    setTimeout(() => {
      dispatch(clearErrorNotification())
    }, timeout)
  }
}

export default errorNotificationSlice.reducer