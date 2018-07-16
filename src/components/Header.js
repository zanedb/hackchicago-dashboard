import { Box } from '@hackclub/design-system'
import React from 'react'

import LogoutButton from './LogoutButton'

const Header = props => (
  <Box>
    <LogoutButton onLogout={() => props.history.push('/login')} />
  </Box>
)

export default Header
