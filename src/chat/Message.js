import React, { useState, useEffect } from 'react'

import './Message.scss'
import { updateMessage, destroyMessage } from './api'

const Message = ({ user, alert, message, currentEditor, setCurrentEditor }) => {
  const [messageBody, setMessageBody] = useState(message.body)
  const thisIsMine = message.owner._id === user._id

  useEffect(() => {
    setMessageBody(message.body)
  }, [message.body])

  const handleSubmit = (event) => {
    event.preventDefault()
    updateMessage(user, message._id, messageBody)
      .then(res => {
        setMessageBody(res.data.message.body)
        setCurrentEditor('')
      })
      .catch(console.error)
  }

  const handleMessageBodyChange = (event) => {
    setMessageBody(event.target.value)
  }

  const handleMessageBodyClick = () => {
    if (thisIsMine) {
      setCurrentEditor(message._id)
    }
  }

  const handleX = () => {
    destroyMessage(user, message._id)
      .then()
      .catch(console.error)
  }

  return (
    <div className='message'>
      <div className="name-line">
        <h5 key={message._id}>{message.owner.username}:</h5>
        {thisIsMine
          ? <div className="close-x" onClick={handleX}>X&nbsp;&nbsp;&nbsp;</div>
          : <div className="close-x"></div>}
      </div>
      <h5>{currentEditor === message._id
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
