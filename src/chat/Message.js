import React, { useState, useEffect } from 'react'

import './Message.scss'
import { updateMessage } from './api'

const Message = ({ user, alert, message, currentEditor, setCurrentEditor }) => {
  const [messageBody, setMessageBody] = useState(message.body)

  useEffect(() => {
    setMessageBody(message.body)
  }, [message.body])

  const handleSubmit = (event) => {
    event.preventDefault()
    updateMessage(user, message._id, messageBody)
      .then(res => {
        res.data.message.owner = { username: user.username }
        setMessageBody(res.data.message.body)
        setCurrentEditor('')
      })
      .catch(console.error)
  }

  const handleMessageBodyChange = (event) => {
    setMessageBody(event.target.value)
  }

  const handleMessageBodyClick = () => {
    if (message.owner._id === user._id) {
      setCurrentEditor(message._id)
    }
  }

  return (
    <div className='message'>
      <h5 key={message._id}>{message.owner.username}: {currentEditor === message._id
        ? <form className='update-message-form' onSubmit={handleSubmit}>
          <input className='update-message-input'
            value={messageBody}
            placeholder='Enter Message'
            name="body"
            autoComplete='off'
            onChange={handleMessageBodyChange}/>
        </form>
        : <div className='message-body' onClick={handleMessageBodyClick}>{messageBody}</div>
      }</h5>
    </div>
  )
}

export default Message

// <Message key={index} user={user} alert={alert} message={message} />
