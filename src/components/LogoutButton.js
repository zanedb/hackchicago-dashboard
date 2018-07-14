import React, { Component } from 'react'
import axios from 'axios'
import { Button } from '@hackclub/design-system'

class LogoutButton extends Component {
  logout = () => {
    axios({
      method: 'get',
      url: 'https://api.hackchicago.io/auth/logout',
      withCredentials: true
    })
      .then(res => {
        console.log(res)
        if (res.data.message === 'Logged out!') {
          this.props.onLogout()
        }
      })
      .catch(error => {
        console.log(error)
        console.error('An error occurred when logging out')
      })
  }

  render() {
    return (
      <Button onClick={this.logout} bg="accent">
        Logout
      </Button>
    )
  }
}

export default LogoutButton
