import React, { useState } from 'react'
import './App.scss'
import { Route } from 'react-router-dom'

import AuthenticatedRoute from './auth/components/AuthenticatedRoute'
import Header from './header/Header'
import Home from './Home'
import SignUp from './auth/components/SignUp'
import SignIn from './auth/components/SignIn'
import SignOut from './auth/components/SignOut'
import ChangePassword from './auth/components/ChangePassword'
import ChatList from './chatlist/ChatList'
import Chat from './chat/Chat'

import { AlertList } from 'react-bs-notifier'

const App = () => {
  const [user, setUser] = useState(null)
  const [alerts, setAlerts] = useState([])

  const clearUser = () => setUser(null)

  const alert = (message, type, headline = '', timeout = 2000) => {
    const newAlert = {
      id: (new Date()).getTime(),
      type: type,
      headline: headline,
      message: message
    }

    setAlerts(prevState => [...prevState, newAlert])
  }

  const onAlertDismissed = (alertArgument) => {
    // find the index of the alert that was dismissed
    const index = alerts.findIndex(x => x.id === alertArgument.id)

    if (index >= 0) {
      setAlerts(prevState => {
        // remove the alert from the array
        return [...prevState.slice(0, index), ...prevState.slice(index + 1)]
      })
    }
  }

  return (
    <React.Fragment>
      <Header user={user} />
      <AlertList
        position='bottom-right'
        alerts={alerts}
        timeout={2000}
        dismissTitle="Begone!"
        onDismiss={onAlertDismissed.bind(this)}
      />
      <main className="container">
        <Route user={user} exact path='/' render={() => (
          <Home alert={alert} user={user} />
        )} />
        <Route path='/sign-up' render={() => (
          <SignUp alert={alert} setUser={setUser} />
        )} />
        <Route path='/sign-in' render={() => (
          <SignIn alert={alert} setUser={setUser} />
        )} />
        <AuthenticatedRoute user={user} path='/sign-out' render={() => (
          <SignOut alert={alert} clearUser={clearUser} user={user} />
        )} />
        <AuthenticatedRoute user={user} path='/change-password' render={() => (
          <ChangePassword alert={alert} user={user} />
        )} />
        <AuthenticatedRoute user={user} path='/chat-list' render={() => (
          <ChatList alert={alert} user={user} />
        )} />
        <AuthenticatedRoute user={user} path='/chat/:id' render={({ match }) => (
          <Chat alert={alert} user={user} match={match} />
        )} />
      </main>
    </React.Fragment>
  )
}

export default App

// debugger // eslint-disable-line no-debugger
