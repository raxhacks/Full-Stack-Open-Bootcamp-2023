import NotificationError from './NotificationError'
import PropTypes from 'prop-types'

const Login = ({ handleLogin, username, setUsername, password, setPassword }) => (
  <div>
    <h2>Log in to application</h2>
    <NotificationError />
    <form onSubmit={handleLogin}>
      username<input id='username' type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
      <br/>
      password<input id='password' type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
      <br/>
      <button id="login-button" type="submit">Log in</button>
    </form>
  </div>
)

Login.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default Login