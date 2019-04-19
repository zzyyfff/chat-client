import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

import './ChatList.scss'
import ChatListItem from './ChatListItem'
import { getChats, createChat } from './api'

const ChatList = ({ user, alert }) => {
  const [chatArray, setChatArray] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [targetUser, setTargetUser] = useState('')

  useEffect(() => {
    const retrieveChatList = () => {
      getChats(user)
        .then(res => setChatArray(res.data.chats))
        .catch(console.error)
    }
    retrieveChatList()
    const id = setInterval(retrieveChatList, 2000)
    return () => clearInterval(id)
  }, [user])

  useEffect(() => {
    document.title = `Chat App — ${user.username}`
    return () => {
      document.title = 'Chat App'
    }
  }, [user.username])

  const handleClose = (event) => {
    event.preventDefault()
    setTargetUser('')
    setShowModal(false)
    getChats(user)
      .then(res => setChatArray(res.data.chats))
      .catch(console.error)
  }

  const handleShow = () => {
    setShowModal(true)
  }

  const handleTargetUserChange = (event) => {
    setTargetUser(event.target.value)
  }

  const handleCreate = (event) => {
    event.persist() // prevents synthetic event warning
    event.preventDefault()
    if (targetUser) {
      createChat(targetUser, user)
        .then(() => handleClose(event))
        .catch((res) => {
          console.log('res:', res)
          setTargetUser('')
          alert('Please try again.', 'danger', 'Username not found', 2000)
        })
    } else {
      alert('Please enter a username.', 'danger', 'Username empty', 3000)
    }
  }

  return (
    <div className="chat-list">
      <h1 className='chat-list-title'>
        <div>Chats...</div>
        <div className='new-chat'>
          <Button variant="outline-primary" onClick={handleShow}>New Chat</Button>
        </div>
      </h1>
      <div className="chat-list-item-array">
        {chatArray.length === 0
          ? <div className="empty-list">Start a new conversation!</div>
          : '' }
        {chatArray && chatArray.map((chat, index) => (
          <ChatListItem key={index} user={user} alert={alert} chat={chat} />
        ))}
      </div>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Start a new Chat!</Modal.Title>
        </Modal.Header>
        <form id="create-chat-form" onSubmit={handleCreate}>
          <Modal.Body>
            <input
              className='target-user-input'
              name="targetUser"
              value={targetUser}
              type="text"
              onChange={handleTargetUserChange}
              placeholder='Enter username of person to chat with!' />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleCreate}>
              Create Chat!
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  )
}

export default ChatList
