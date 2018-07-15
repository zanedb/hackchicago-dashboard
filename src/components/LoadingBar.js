import { Box, Loading } from '@hackclub/design-system'
import React from 'react'

const LoadingBar = props => (
  <Box py={5} {...props}>
    <Loading />
  </Box>
)

export default LoadingBar
