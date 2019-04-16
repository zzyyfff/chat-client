import React, { useState, useEffect } from 'react'

import './ChatList.scss'
import ChatListItem from './ChatListItem'
import { getChats } from './api'

const ChatList = ({ user, alert }) => {
  const [chatArray, setChatArray] = useState([])

  useEffect(() => {
    getChats(user)
      .then(res => setChatArray(res.data.chats))
  }, [user])

  return (
    <div className="chat-list">
      <h1 className='chat-list-title'>Chats...</h1>
      {chatArray.length === 0
        ? <div className="empty-list">Start a new conversation!</div>
        : '' }
      {chatArray && chatArray.map((chat, index) => (
        <ChatListItem key={index} user={user} alert={alert} chat={chat} />
      ))}
    </div>
  )
}

export default ChatList
