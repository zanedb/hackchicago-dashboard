import React from 'react'
import { Box, Loading } from '@hackclub/design-system'

const LoadingBar = props => (
  <Box py={5} {...props}>
    <Loading />
  </Box>
)

export default LoadingBar
