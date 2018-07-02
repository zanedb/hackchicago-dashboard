import React, { Component } from 'react'

class Project extends Component {
  render() {
    const { name } = this.props
    return <div>{name}</div>
  }
}

export default Project
