import React from 'react'
import { Text } from '@hackclub/design-system'

const ErrorPage = props => (
  <Text color="error" py={3} align="center" {...props}>
    <span role="img" aria-label="warning">
      🚨
    </span>
    Something terrible has happened
    <span role="img" aria-label="warning">
      🚨
    </span>
    <br />
    Please let us know about this by emailing us at{' '}
    <a href="mailto:zane@hackchicago.io">zane@hackchicago.io</a>
  </Text>
)
export default ErrorPage