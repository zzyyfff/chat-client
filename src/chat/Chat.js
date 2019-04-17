import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import './Chat.scss'
import { getChat } from '../chatlist/api'
import { createMessage } from './api'
// import Message from './Message'
import SendFooter from './SendFooter'

const Chat = ({ user, alert, match }) => {
  const [messageArray, setMessageArray] = useState([])
  const [chatWithName, setChatWithName] = useState('')
  const [sendBody, setSendBody] = useState('')

  useEffect(() => {
    const retrieveMessages = () => {
      getChat(user, match.params.id)
        .then(res => {
          const chat = res.data.chat
          setChatWithName(user.username === chat.user1.username
            ? chat.user2.username
            : chat.user1.username)
          setMessageArray(chat.messages)
        })
        .catch(console.error)
    }
    retrieveMessages()
    const id = setInterval(retrieveMessages, 1000)
    return () => clearInterval(id)
  }, [user, match.params.id])

  const handleSubmit = (event) => {
    event.preventDefault()
    createMessage(user, sendBody, match.params.id)
      .then(res => {
        res.data.message.owner = { username: user.username }
        setMessageArray([...messageArray, res.data.message])
        setSendBody('')
      })
      .catch(console.error)
  }

  const handleSendBodyChange = (event) => {
    setSendBody(event.target.value)
  }

  useEffect(() => {
    const scrollToBottom = () => {
      this.messagesEnd.scrollIntoView({ behavior: 'smooth' })
    }
    // smoothly scroll to the most recent message when messageArray changes in length
    scrollToBottom()
  }, [messageArray.length])

  return (
    <div className='chat'>
      <h1 className='message-list-title'>
        <Link to='/chat-list' style={{ textDecoration: 'none' }}>↖</Link> Chat with {chatWithName}
      </h1>
      <div className="message-list">
        {messageArray.length === 0
          ? <div className="empty-chat">Start the conversation!</div>
          : '' }
        {messageArray && messageArray.map((message, index) => (
          <h5 key={index}>{message.owner.username}: {message.body}</h5>
        ))}
        <div style={{ float: 'left', clear: 'both' }}
          ref={(el) => { this.messagesEnd = el }}>
        </div>
      </div>
      <SendFooter handleSendBodyChange={handleSendBodyChange} handleSubmit={handleSubmit} sendBody={sendBody} />
    </div>
  )
}

export default Chat

// <Message key={index} user={user} alert={alert} message={message} />
