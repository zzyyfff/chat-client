import React from 'react'

import './SendFooter.scss'

const SendFooter = ({ user, alert, handleSendBodyChange, handleSubmit, sendBody }) => {
  return (
    <footer className="send-footer">
      <form className='send-form' onSubmit={handleSubmit}>
        <input className='send-input'
          value={sendBody}
          placeholder='Enter Message'
          name="body"
          autoComplete='off'
          onChange={handleSendBodyChange}/>
      </form>
    </footer>
  )
}

export default SendFooter

// <Message key={index} user={user} alert={alert} message={message} />
