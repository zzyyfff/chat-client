import React, { useState, useEffect, Fragment } from 'react'
import { Redirect } from 'react-router-dom'

import { getChat } from './api'

const ChatListItem = ({ user, chat, history }) => {
  const [lastMessageDisplay, setLastMessageDisplay] = useState('...')
  const [redirectToChat, setRedirectToChat] = useState(false)

  const chatWithName = user.username === chat.user1.username
    ? chat.user2.username
    : chat.user1.username

  useEffect(() => {
    const retrieveLastMessage = () => {
      getChat(user, chat._id)
        .then(res => {
          const messages = res.data.chat.messages
          if (messages.length > 0) {
            return setLastMessageDisplay(messages[messages.length - 1].owner.username +
            ': ' + messages[messages.length - 1].body)
          } else {
            return setLastMessageDisplay('...')
          }
        })
        .catch(console.error)
    }
    retrieveLastMessage()
    const id = setInterval(retrieveLastMessage, 2000)
    return () => clearInterval(id)
  }, [user, chat._id])

  const goToChat = () => {
    setRedirectToChat(true)
  }

  return (
    <Fragment>
      {redirectToChat ? <Redirect to={`/chat/${chat._id}`}/> : ''}
      <div className='chat-list-item' onClick={goToChat}>
        <div className="topline">
          <div className="username">{chatWithName}</div>
          <div className="online-status"></div>
        </div>
        <div className="message-preview">{lastMessageDisplay}</div>
      </div>
    </Fragment>
  )
}

export default ChatListItem
