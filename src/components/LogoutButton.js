import React, { Component } from 'react'
import axios from 'axios'
import { Button } from '@hackclub/design-system'

class LogoutButton extends Component {
  logout = async () => {
    try {
      const logout = await axios({
        method: 'get',
        url: 'https://api.hackchicago.io/auth/logout',
        withCredentials: true
      })
      if (logout.data.message === 'Logged out!') {
        this.props.onLogout()
      }
    } catch (error) {
      console.error(error)
    }
  }

  render() {
    return (
      <Button onClick={this.logout} bg="accent" m={2} inverted={true}>
        Logout
      </Button>
    )
  }
}

export default LogoutButton
