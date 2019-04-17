import React, { useState, useEffect, Fragment } from 'react'
import { Redirect } from 'react-router-dom'

import { getChat } from './api'

const ChatListItem = ({ user, chat, history }) => {
  const [lastMessage, setLastMessage] = useState('...')
  const [redirectToChat, setRedirectToChat] = useState(false)

  const chatWithName = user.username === chat.user1.username
    ? chat.user2.username
    : chat.user1.username

  useEffect(() => {
    getChat(user, chat._id)
      .then(res => {
        const messages = res.data.chat.messages
        if (messages.length > 0) {
          return setLastMessage(messages[messages.length - 1].body)
        } else {
          return setLastMessage('...')
        }
      })
  }, [user, chat])

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
        <div className="message-preview">{lastMessage}</div>
      </div>
    </Fragment>
  )
}

export default ChatListItem
