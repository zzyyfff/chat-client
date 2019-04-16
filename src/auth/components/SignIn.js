import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { signIn } from '../api'
import messages from '../messages'

class SignIn extends Component {
  constructor () {
    super()

    this.state = {
      username: '',
      password: ''
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onSignIn = event => {
    event.preventDefault()

    const { alert, history, setUser } = this.props

    signIn(this.state)
      .then(res => setUser(res.data.user))
      .then(() => alert(messages.signInSuccess, 'success', 'Welcome!'))
      .then(() => history.push('/'))
      .catch(error => {
        console.error(error)
        this.setState({ username: '', password: '' })
        alert(messages.signInFailure, 'danger', 'Failed to sign in.')
      })
  }

  render () {
    const { username, password } = this.state

    return (
      <form className='auth-form' onSubmit={this.onSignIn}>
        <h3>Sign In</h3>
        <label htmlFor="username">username</label>
        <input
          required
          type="text"
          name="username"
          value={username}
          placeholder="username"
          onChange={this.handleChange}
        />
        <label htmlFor="password">Password</label>
        <input
          required
          name="password"
          value={password}
          type="password"
          placeholder="Password"
          onChange={this.handleChange}
        />
        <button type="submit">Sign In</button>
      </form>
    )
  }
}

export default withRouter(SignIn)
