import {
  Link
} from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'

const Header = () => {
  const { state, dispatchAuth } = useAuth()
  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    dispatchAuth({ type: 'LOGOUT' })
  }
  return (
    <div style={{
      width:'100%',
      display: 'flex',
      backgroundColor: '#d3d3d3'
    }}>
      <ul style={{
        display:'flex',
        gap: '10px',
        listStyle: 'none'
      }}>
        <li><Link to='/'>blogs</Link></li>
        <li><Link to='/users'>users</Link></li>
        <li>{state.user} logged in <button onClick={handleLogout}>logout</button></li>
      </ul>
    </div>
  )
}

export default Header