import React, { Component } from 'react'
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

class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      alerts: []
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  alert = (message, type, headline = '', timeout = 2000) => {
    const newAlert = {
      id: (new Date()).getTime(),
      type: type,
      headline: headline,
      message: message
    }

    this.setState(prevState => ({
      alerts: [...prevState.alerts, newAlert]
    }), () => {
      setTimeout(() => {
        const index = this.state.alerts.indexOf(newAlert)
        if (index >= 0) {
          this.setState(prevState => ({
            // remove the alert from the array
            alerts: [...prevState.alerts.slice(0, index), ...prevState.alerts.slice(index + 1)]
          }))
        }
      }, timeout)
    })
  }
  onAlertDismissed (alert) {
    const { alerts } = this.state

    // find the index of the alert that was dismissed
    const index = alerts.indexOf(alert)

    if (index >= 0) {
      this.setState({
        // remove the alert from the array
        alerts: [...alerts.slice(0, index), ...alerts.slice(index + 1)]
      })
    }
  }

  render () {
    const { alerts, user } = this.state

    return (
      <React.Fragment>
        <Header user={user} />
        <AlertList
          position='bottom-right'
          alerts={alerts}
          timeout={0}
          dismissTitle="Begone!"
          onDismiss={this.onAlertDismissed.bind(this)}
        />
        <main className="container">
          <Route user={user} exact path='/' render={() => (
            <Home alert={this.alert} user={user} />
          )} />
          <Route path='/sign-up' render={() => (
            <SignUp alert={this.alert} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn alert={this.alert} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut alert={this.alert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword alert={this.alert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/chat-list' render={() => (
            <ChatList alert={this.alert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/chat/:id' render={({ match }) => (
            <Chat alert={this.alert} user={user} match={match} />
          )} />
        </main>
      </React.Fragment>
    )
  }
}

export default App

// debugger // eslint-disable-line no-debugger
