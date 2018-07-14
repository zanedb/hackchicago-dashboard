import React, { Component } from 'react'
import { Heading, Text, Card } from '@hackclub/design-system'

const Project = ({
  name,
  description,
  submitter,
  tagline,
  timestamp,
  ...props
}) => (
  <Card boxShadowSize="sm" my={3} p={3} color="black" bg="white">
    <Heading m={3} mb={1}>
      {name}
    </Heading>
    <Text m={3} fontSize={2} mt={1}>
      Submitted by {submitter.name}
    </Text>
    <Text m={3} fontSize={1}>
      {tagline}
    </Text>
  </Card>
)

export default Project
