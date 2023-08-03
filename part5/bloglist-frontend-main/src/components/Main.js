import React from 'react'
import Login from './Login'
import NotificationError from './NotificationError'
import NotificationCreation from './NotificationCreation'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import Blog from './Blog'

const Main = ({ 
  user,
  handleLogin,
  username,
  setUsername,
  password,
  setPassword,
  blogs,
  title,
  setTitle,
  author,
  setAuthor,
  url,
  setUrl,
  addBlog,
  removeBlog,
  blogFormRef,
}) => {
  
  return (
    <>
      {user === null ? 
        <Login
          handleLogin={handleLogin} 
          username={username} 
          setUsername={setUsername} 
          password={password} 
          setPassword={setPassword}
        />
        :
        <>
          <NotificationError />
          <NotificationCreation />
          <h2>blog app</h2>
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
              removeBlog={removeBlog}
            />
          )}
        </>
      }
    </>
  )
}

export default Main