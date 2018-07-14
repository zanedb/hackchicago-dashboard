import React, { Component } from 'react'
import { Text } from '@hackclub/design-system'

const NotFound = props => (
  <Text f={3} color="error" py={4} align="center" bold {...props}>
    404: Page Not Found
  </Text>
)

export default NotFound
