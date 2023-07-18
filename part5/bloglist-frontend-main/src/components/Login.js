import NotificationError from './NotificationError'
import PropTypes from 'prop-types'

const Login = ({ handleLogin, username, setUsername, password, setPassword, errorMessage }) => (
  <div>
    <h2>Log in to application</h2>
    {errorMessage === '' ? <></>:<NotificationError message={errorMessage} />}
    <form onSubmit={handleLogin}>
      username<input id='username' type="text" value={username} onChange={setUsername}/>
      <br/>
      password<input id='password' type="password" value={password} onChange={setPassword}/>
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