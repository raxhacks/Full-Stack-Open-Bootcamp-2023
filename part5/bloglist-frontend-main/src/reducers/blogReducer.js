import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'


const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    appendBlog: (state,action) => {
      state.push(action.payload)
    },
    setBlogs: (state,action) => {
      return action.payload
    }
  }
})

export const { appendBlog, setBlogs } = blogSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = content => {
  return async dispatch => {
    const newBlog = await blogService.create(content)
    dispatch(appendBlog(newBlog))
  }
}

export const updateLikes = (id, blogs) => {
  return async dispatch => {
    const getBlog = blogs.find(blog => blog.id===id)
    const updatedBlog = { ...getBlog, likes:getBlog.likes+1 }
    await blogService.update(id,updatedBlog)
    dispatch(setBlogs(blogs.map(blog => {
      if (blog.id===id) {
        return { ...blog, likes:blog.likes+1 }
      }
      return blog
    }).sort((a, b) => b.likes - a.likes)))
  }
}



export default blogSlice.reducer