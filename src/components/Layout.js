import { Box, Flex } from '@hackclub/design-system'
import React from 'react'

import Footer from './Footer'

const Layout = ({ children }) => (
  <Flex flexDirection="column" style={{ minHeight: '100vh' }}>
    <Box
      align="center"
      w={1}
      style={{
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center'
      }}
    >
      {children}
    </Box>
    <Footer />
  </Flex>
)

export default Layout
