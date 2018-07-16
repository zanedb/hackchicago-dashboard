import axios from 'axios'
import React, { Component } from 'react'

class Index extends Component {
  async componentDidMount() {
    const { history } = this.props
    try {
      const loginRequest = await axios({
        method: 'get',
        url: 'https://api.hackchicago.io/v1/me',
        withCredentials: true
      })
      if (loginRequest.status === 200) {
        history.push('/projects')
      }
    } catch (error) {
      history.push('/login')
    }
  }

  render() {
    return null
  }
}

export default Index
