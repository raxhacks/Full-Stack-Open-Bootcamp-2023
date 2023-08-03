import { useState, useEffect, useRef } from 'react'

import Main from './components/Main'

import blogService from './services/blogs'
import loginService from './services/login' 

import { useDispatch, useSelector } from 'react-redux'

import { showErrorNotification } from './reducers/errorNotificationReducer'
import { showNotification } from './reducers/createNotificationReducer'
import { createBlog, initializeBlogs, setBlogs } from './reducers/blogReducer'

import { useAuth } from './auth/AuthContext'

import {
  Routes, Route
} from 'react-router-dom'

import './app.css'
import Users from './pages/allUsers'
import User from './pages/singleUser'
import SingleBlog from './pages/singleBlog'
import Header from './components/Header'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)

  const { dispatchAuth } = useAuth()

  useEffect(() => {
    dispatch(initializeBlogs())
  },[dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      dispatchAuth({ type: 'LOGIN', payload: user.username })
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(showErrorNotification('wrong credentials',5000))
    }
  }

  const blogFormRef = useRef()

  const addBlog = (event) => {
    blogFormRef.current.toggleVisibility()
    event.preventDefault()
    const blogObject = {
      title: title,
      author: author,
      url: url,
      likes: 0,
      userId: user.id
    }

    if (blogs.map(blog => blog.title).includes(blogObject.title)) {
      const id=blogs.find(blog => blog.title === title).id
      const confirmation = window.confirm(`${title} is already added to the bloglist, replace the information?`)
      if (confirmation) {
        const updatedblogs = blogs.map(blog => {
          if (blog.id === id) {
            return { ...blog, title: title, author: author, url:url } // Update the number property
          }
          return blog
        })
        const updatedblog = updatedblogs.find(blog => blog.id === id)
        blogService
          .update(id,updatedblog)
          .then(() => {
            dispatch(setBlogs(updatedblogs))
            setTitle('')
            setAuthor('')
            setUrl('')
          }
          )
          .catch(() => {
            dispatch(showErrorNotification(`Information of '${title}' has already been removed from server`,5000))
            dispatch(setBlogs(blogs.filter(n => n.id !== id)))
          })
      } else {
        setTitle('')
        setAuthor('')
        setUrl('')
      }
    }else{
      try {
        dispatch(showNotification(`a new blog ${title} by ${author} added`,5000))
        dispatch(createBlog(blogObject))
      } catch (error) {
        dispatch(showErrorNotification(`${JSON.stringify(error.response.data.error)}`,5000))
        console.log('Error occurred while adding the blog:', error)
      }
    }
  }


  const removeBlog = (id,title,author) => {
    const confirmation = window.confirm(`Remove blog ${title} by ${author} ?`)
    if (confirmation) {
      blogService
        .deleteBlog(id)
        .then(() => {
          dispatch(setBlogs(blogs.filter(blog => blog.id!==id)))
        }
        )
        .catch(() => {
          dispatch(showErrorNotification('You are not the correct user.',5000))
        })
    }
    else {
      return
    }
  }

  

  return (
    <div>
      <Header/>
      <Routes>
        <Route path="/" element={ 
          <Main
            user={user}
            handleLogin={handleLogin}
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            blogs={blogs}
            title={title}
            setTitle={setTitle}
            author={author}
            setAuthor={setAuthor}
            url={url}
            setUrl={setUrl}
            addBlog={addBlog}
            removeBlog={removeBlog}
            blogFormRef={blogFormRef}
          />
        } />
        <Route path="/users" element={ <Users/> } />
        <Route path="/users/:id" element={ <User/> } />
        <Route path="/blogs/:id" element={ <SingleBlog/> } />
      </Routes>
    </div>
  )
}

export default App