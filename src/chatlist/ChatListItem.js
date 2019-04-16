import React, { useState, useEffect } from 'react'

import { getChat } from './api'

const ChatListItem = ({ user, chat }) => {
  const [lastMessage, setLastMessage] = useState('')

  const chatWithName = user.username === chat.user1.username
    ? chat.user2.username
    : chat.user1.username

  useEffect(() => {
    getChat(user, chat._id)
      .then(res => {
        const messages = res.data.chat.messages
        return setLastMessage(messages[messages.length - 1].body)
      })
  }, [user, chat])

  return (
    <div className='chat-list-item'>
      <div className="topline">
        <div className="username">{chatWithName}</div>
        <div className="online-status"></div>
      </div>
      <div className="message-preview">{lastMessage}</div>
    </div>
  )
}

export default ChatListItem
