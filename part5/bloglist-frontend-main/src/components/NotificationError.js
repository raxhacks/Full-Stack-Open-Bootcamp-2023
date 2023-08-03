import { useSelector } from 'react-redux'

const NotificationError = ({ message }) => {
  if (message === null) {
    return null
  }

  const notification = useSelector(state => state.errorNotification)
  
  return (
    <>
      {notification === '' ? <></>
        :
        <div className="error">
          {notification}
        </div>
      }
    </>
  )
}
export default NotificationError