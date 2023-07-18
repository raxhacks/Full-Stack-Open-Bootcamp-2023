import { useState, useEffect, useRef } from 'react'

import Login from './components/Login'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import NotificationError from './components/NotificationError'
import NotificationCreation from './components/NotificationCreation'

import blogService from './services/blogs'
import loginService from './services/login' 

import './app.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [createdMessage, setCreatedMessage] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

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
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
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
            setBlogs(updatedblogs)
            setTitle('')
            setAuthor('')
            setUrl('')
          }
          )
          .catch(() => {
            setErrorMessage(
              `Information of '${title}' has already been removed from server`
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 4000)
            setBlogs(blogs.filter(n => n.id !== id))
          })
      } else {
        setTitle('')
        setAuthor('')
        setUrl('')
      }
    }else{
      blogService
        .create(blogObject)
        .then(returnedblog => {
          setCreatedMessage(
            `a new blog ${title} by ${author} added`
          )
          setTimeout(() => {
            setCreatedMessage(null)
          }, 4000)
          setBlogs(blogs.concat(returnedblog))
          setTitle('')
          setAuthor('')
          setUrl('')
        })
        .catch(error => {
          setErrorMessage(
            `${JSON.stringify(error.response.data.error)}`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 4000)
          console.log('Error occurred while adding the blog:', error)
        })
    }
  }

  const likeBlog = (id) => {
    const updatedblogs = blogs.map(blog => {
      if (blog.id === id) {
        return { ...blog, likes:blog.likes+1 }
      }
      return blog
    })

    const updatedblog = updatedblogs.find(blog => blog.id === id)
    blogService
      .update(id,updatedblog)
      .then(() => {
        setBlogs(updatedblogs)
        setTitle('')
        setAuthor('')
        setUrl('')
      }
      )
      .catch(() => {
        setErrorMessage(
          `Information of '${title}' has already been removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 4000)
        setBlogs(blogs.filter(n => n.id !== id))
      })
  }

  const removeBlog = (id,title,author) => {
    const confirmation = window.confirm(`Remove blog ${title} by ${author} ?`)
    if (confirmation) {
      blogService
        .deleteBlog(id)
        .then(() => {
          setBlogs(blogs.filter(blog => blog.id!==id))
        }
        )
        .catch(() => {
          setErrorMessage(
            'You are not the correct user.'
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 4000)
        })
    }
    else {
      return
    }
  }

  // sort likes
  blogs.sort((a, b) => b.likes - a.likes)

  return (
    <div>

      {user === null ? 
        <Login
          handleLogin={handleLogin} 
          username={username} 
          setUsername={({ target }) => setUsername(target.value)} 
          password={password} 
          setPassword={({ target }) => setPassword(target.value)}
          errorMessage={errorMessage}
        />
        :
        <>
          {errorMessage === '' ? <></>:<NotificationError message={errorMessage} />}
          {createdMessage === '' ? <></>:<NotificationCreation message={createdMessage} />}
          <h2>blogs</h2>
          <div>{user.name} logged in <button onClick={handleLogout}>logout</button></div>
          <Togglable buttonLabel="create new blog" ref={blogFormRef}>
            <BlogForm 
              addBlog={addBlog}
              title={title}
              setTitle={setTitle}
              author={author}
              setAuthor={setAuthor}
              url={url}
              setUrl={setUrl} />
          </Togglable>
          
          {blogs.map(blog =>
            <Blog 
              key={blog.id} 
              blog={blog} 
              user={user.name} 
              likeBlog={likeBlog} 
              removeBlog={removeBlog}/>
          )}
        </>
      }
    </div>
  )
}

export default App