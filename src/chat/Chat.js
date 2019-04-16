import React, { useState, useEffect } from 'react'

// import './Chat.scss'
import { getChat } from '../chatlist/api'
// import Message from './Message'

const Chat = ({ user, alert, match }) => {
  const [messageArray, setMessageArray] = useState([])
  const [chatWithName, setChatWithName] = useState('')

  useEffect(() => {
    getChat(user, match.params.id)
      .then(res => {
        const chat = res.data.chat
        setChatWithName(user.username === chat.user1.username
          ? chat.user2.username
          : chat.user1.username)
        console.log('chat.messages: ', chat.messages)
        setMessageArray(chat.messages)
      })
      .catch(console.log)
  }, [user, match.params.id])

  return (
    <div className="message-list">
      <h1 className='message-list-title'>Chat with {chatWithName}</h1>
      {messageArray.length === 0
        ? <div className="empty-chat">Start the conversation!</div>
        : '' }
      {messageArray && messageArray.map((message, index) => (
        <h5 key={index}>{message.owner.username}: {message.body}</h5>
      ))}
    </div>
  )
}

export default Chat

// <Message key={index} user={user} alert={alert} message={message} />
