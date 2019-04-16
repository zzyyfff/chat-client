import React from 'react'

import './ChatList.scss'

const authenticatedOptions = (
  <React.Fragment>
    <Link to="/change-password">Change Password</Link>
    <Link to="/sign-out">Sign Out</Link>
  </React.Fragment>
)

const unauthenticatedOptions = (
  <React.Fragment>
    <Link to="/sign-up">Sign Up</Link>
    <Link to="/sign-in">Sign In</Link>
  </React.Fragment>
)

const alwaysOptions = (
  <React.Fragment>
    <Link to="/">Home</Link>
  </React.Fragment>
)

const ChatList = ({ user }) => (
  <div className="chat-list">
    <h1>Chats...</h1>

    { !user && <span>None yet. Start a new conversation!</span>}
    { user ? authenticatedOptions : unauthenticatedOptions }
    { alwaysOptions }

  </div>
)

export default ChatList
