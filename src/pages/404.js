import { Text } from '@hackclub/design-system'
import React from 'react'

const NotFound = props => (
  <Text f={3} color="error" py={4} align="center" bold {...props}>
    404: Page Not Found
  </Text>
)

export default NotFound
