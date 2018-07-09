import React, { Component } from 'react'
import { Text } from '@hackclub/design-system'

class NotFound extends Component {
  render() {
    return (
      <Text f={3} color="error" py={4} align="center" bold>
        404: Page Not Found
      </Text>
    )
  }
}

export default NotFound
