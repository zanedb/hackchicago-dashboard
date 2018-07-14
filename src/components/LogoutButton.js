import React, { Component } from 'react'
import axios from 'axios'

class LogoutButton extends Component {
  logout = () => {
    axios({
      method: 'get',
      url: 'https://api.hackchicago.io/auth/logout',
      withCredentials: true
    })
      .then(res => {
        console.log(res)
        if (res.data.message === 'Authenticated!') {
          this.props.onLogin()
        }
      })
      .catch(error => {
        console.log(error)
        console.error('An error occurred when logging out')
      })
  }

  render() {
    return(
      <button onClick={this.logout}>
        Logout
      </button>
    )
  }
}

export default LogoutButton