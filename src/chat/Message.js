import React, { useState, useEffect } from 'react'
import AnimateOnChange from 'react-animate-on-change'

import './Message.scss'
import { updateMessage, destroyMessage } from './api'

const Message = ({ user, alert, message, currentEditor, setCurrentEditor }) => {
  const [messageBody, setMessageBody] = useState(message.body)
  const [updated, setUpdated] = useState(false)
  const [firstTime, setFirstTime] = useState(true)
  let destroying = false
  const isMe = message.owner._id === user._id

  useEffect(() => {
    setMessageBody(message.body)
    if (firstTime) {
      setFirstTime(false)
    } else {
      setUpdated(true)
    }
  }, [message.body]) // eslint-disable-line react-hooks/exhaustive-deps

  const resetUpdated = () => {
    setUpdated(false)
  }

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

  const handleMessageDivClick = () => {
    // kick this operation to the queue so that handleX() can
    // have a chance to set destroying = true *first*
    setTimeout(() => {
      if (destroying) {
        // don't go into edit mode if soon to be unmounted/destroyed
        return
      }
      // if this is not the currentEditor and Message is owned by me
      if (currentEditor !== message._id && isMe) {
        setCurrentEditor(message._id)
      } else if (currentEditor === message._id) {
      // if this is the currentEditor, ignore click
      } else {
      // if clicking elsewhere, like on .is-them, then unset the editor
        setCurrentEditor(null)
      }
    }, 1)
  }

  const handleX = () => {
    destroying = true
    destroyMessage(user, message._id)
      .then()
      .catch(console.error)
  }

  return (
    <AnimateOnChange
      baseClassName={isMe ? 'message is-me and-us' : 'message is-them and-us'}
      animationClassName="changed-message"
      animate={isMe ? false : updated}
      onAnimationEnd={resetUpdated}
      customTag='div'>
      <div onClick={handleMessageDivClick}>
        <div className="name-line">
          <div key={message._id}>{message.owner.username}:</div>
          {isMe
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
          : <div className='message-body'>{messageBody}</div>
        }</h5>
      </div>
    </AnimateOnChange>
  )
}

export default Message

// <Message key={index} user={user} alert={alert} message={message} />
