import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

import './Chat.scss'
import { getChat } from '../chatlist/api'
import { createMessage } from './api'
// import Message from './Message'
import SendFooter from './SendFooter'
import Message from './Message'

const Chat = ({ user, alert, match }) => {
  const [messageArray, setMessageArray] = useState([])
  const [chatWithName, setChatWithName] = useState('')
  const [sendBody, setSendBody] = useState('')
  const [currentEditor, setCurrentEditor] = useState('')

  const clearCurrentEditor = () => {
    setCurrentEditor('')
  }

  const inputEl = useRef(null)
  // on load, set focus to input element
  useEffect(() => {
    inputEl.current.focus()
  }, [])

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
    const id = setInterval(retrieveMessages, 500)
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

  useEffect(() => {
    document.title = `Chatting with ${chatWithName}`
    return () => {
      document.title = `Chat App — ${user.username}`
    }
  }, [chatWithName, user.username])

  return (
    <div className='chat'>
      <h1 className='message-list-title' onClick={clearCurrentEditor}>
        <Link to='/chat-list' style={{ textDecoration: 'none' }}>↖</Link> ∿{chatWithName}
      </h1>
      <div className="message-list">
        {messageArray.length === 0
          ? <div className="empty-chat">Start the conversation!</div>
          : '' }
        {messageArray && messageArray.map((message, index) => (
          <Message
            key={message._id}
            index={index}
            user={user}
            alert={alert}
            message={message}
            currentEditor={currentEditor}
            setCurrentEditor={setCurrentEditor} />
        ))}
        <div style={{ float: 'left', clear: 'both' }}
          ref={(el) => { this.messagesEnd = el }}>
        </div>
      </div>
      <SendFooter
        handleSendBodyChange={handleSendBodyChange}
        handleSubmit={handleSubmit}
        sendBody={sendBody}
        clearCurrentEditor={clearCurrentEditor}
        inputEl={inputEl} />
    </div>
  )
}

export default Chat
