const NotificationCreation = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="creation">
      {message}
    </div>
  )
}

export default NotificationCreation