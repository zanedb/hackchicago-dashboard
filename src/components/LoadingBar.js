import React from 'react'
import { Box, Loading } from '@hackclub/design-system'

const Base = Box.extend`
  position: relative;
`

const LoadingBar = props => (
  <Base py={5}>
    <Loading />
  </Base>
)

export default LoadingBar
