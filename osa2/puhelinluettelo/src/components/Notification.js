import React from 'react'

const Notification = ({ message, notcolor}) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className="notification" style={{color: notcolor}}>
        {message}
      </div>
    )
  }

export default Notification