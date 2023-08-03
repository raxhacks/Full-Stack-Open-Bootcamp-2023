import { useEffect, useState } from 'react'
import userService from '../services/users'
import {
  Link
} from 'react-router-dom'

const Users = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    userService.getAll()
      .then(users => setUsers(users))
      .catch(() => console.log('NOT USERS'))
  }, [])

  return (
    <>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td> <Link to={`/users/${user.id}`}>{user.name}</Link> </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default Users