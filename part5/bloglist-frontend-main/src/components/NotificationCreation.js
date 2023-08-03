import { useSelector } from 'react-redux'

const NotificationCreation = ({ message }) => {
  if (message === null) {
    return null
  }

  const notification = useSelector(state => state.notification)

  return (
    <>
      {notification === '' ? <></>
        :
        <div className="creation">
          {notification}
        </div>
      }
    </>
  )
}

export default NotificationCreation