import React, { Component } from 'react'
import './App.scss'
import { Route } from 'react-router-dom'

import AuthenticatedRoute from './auth/components/AuthenticatedRoute'
import Header from './header/Header'
import SignUp from './auth/components/SignUp'
import SignIn from './auth/components/SignIn'
import SignOut from './auth/components/SignOut'
import ChangePassword from './auth/components/ChangePassword'

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

  alert = (message, type, headline = '') => {
    const newAlert = {
      id: (new Date()).getTime(),
      type: type,
      headline: headline,
      message: message
    }

    this.setState({
      alerts: [...this.state.alerts, newAlert]
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
          timeout={1700}
          dismissTitle="Begone!"
          onDismiss={this.onAlertDismissed.bind(this)}
        />
        <main className="container">
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
          <h1>Test</h1>
        </main>
      </React.Fragment>
    )
  }
}

export default App
