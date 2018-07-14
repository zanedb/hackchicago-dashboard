import React, { Component } from 'react'
import { Heading, Text, Card } from '@hackclub/design-system'

class Project extends Component {
  render() {
    const { name, description, submitter, tagline, timestamp } = this.props
    return (
      <Card boxShadowSize="sm" my={3} p={3} color="black" bg="white">
        <Heading m={3}>{name}</Heading>
        <Text m={3} fontSize={2}>
          Submitted by {submitter.email}
        </Text>
        <Text m={3} fontSize={1}>
          {tagline}
        </Text>
      </Card>
    )
  }
}

export default Project
