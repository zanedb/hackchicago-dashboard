import React, { Component } from 'react'
import { Heading, Text, Card, Link } from '@hackclub/design-system'

class Project extends Component {
  render() {
    const {
      name,
      description,
      submitter,
      link,
      tagline,
      timestamp
    } = this.props
    return (
      <Card boxShadowSize="sm" my={3} p={3} color="black" bg="white">
        <Heading m={3} mb={1}>
          <Link href={link} target="_blank">
            {name} {link !== undefined && `»`}
          </Link>
        </Heading>
        <Text m={3} fontSize={2} mt={1}>
          Submitted by {submitter.name}
        </Text>
        <Text m={3} fontSize={1}>
          {tagline}
        </Text>
      </Card>
    )
  }
}

export default Project
