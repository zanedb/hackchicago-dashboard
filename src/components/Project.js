import React, { Component } from 'react'

class Project extends Component {
  render() {
    const { name, description, submitter, tagline, timestamp } = this.props
    return (
      <div>
        <h2>{name}</h2>
        <h3>{tagline}</h3>
        <br />Description: {description}
        <br />Submitted by{' '}
        <b>
          {submitter.email} at {timestamp}
        </b>
      </div>
    )
  }
}

export default Project
