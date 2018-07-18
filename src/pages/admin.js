import React, { Component } from 'react'
import axios from 'axios'

import LoadingBar from './../components/LoadingBar'

class Admin extends Component {
  state = {
    status: 'loading'
  }

  async componentDidMount() {
    try {
      const loadMe = await axios({
        method: 'get',
        url: 'https://api.hackchicago.io/v1/me',
        withCredentials: true
      })
      if (loadMe.status === 200 && loadMe.data.role === 'admin') {
        this.setState({
          status: 'logged in'
        })
      } else {
        window.location.href = '/'
      }
    } catch (error) {
      window.location.href = '/'
    }
  }

  render() {
    const { status } = this.state
    switch (status) {
      case 'loading':
        return <LoadingBar />
      case 'logged in':
        return <p>You are an Admin.</p>
    }
  }
}

export default Admin
