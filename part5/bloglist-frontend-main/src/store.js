import { configureStore } from '@reduxjs/toolkit'

import notificationReducer from './reducers/createNotificationReducer'
import errorNotificationReducer from './reducers/errorNotificationReducer'
import blogReducer from './reducers/blogReducer'

const store = configureStore({
  reducer:{
    errorNotification: errorNotificationReducer,
    notification: notificationReducer,
    blogs: blogReducer
  }
})

export default store