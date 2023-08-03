import { useState, useEffect } from 'react'
import userService from '../services/users'
import { useParams } from 'react-router-dom'

const User = () => {
  const { id } = useParams() // Get the id parameter from the URL
  const [user, setUser] = useState(null)

  useEffect(() => {
    userService.getUser(id) // Pass the id to the userService method
      .then((userData) => setUser(userData))
      .catch(() => console.log('NOT USER'))
  }, [id]) // Add the id as a dependency to fetch the user whenever it changes

  return (
    <>
      {user ? 
        <>
          <h2>{user.name}</h2>
          <h2>added blogs</h2>
          <ul>
            {user.blogs.map(blog => <li key={blog.id}>{blog.title}</li>
            )}
          </ul>
        </> 
        : 
        <p>Loading...</p>}
    </>
  )
}

export default User