import React from 'react'

// import './Home.scss'

const Home = ({ user, alert }) => {
  return (
    <div className="home">
      {!user && <h2>Sign in to begin chatting with other users!</h2>}
    </div>
  )
}

export default Home
