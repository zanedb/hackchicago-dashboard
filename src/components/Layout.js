import { Box, Flex } from '@hackclub/design-system'
import React from 'react'

import Footer from './Footer'

// Corrects body width when scrollbar is present
const css = `
  body {
    width: 100%;
  }
`

const Layout = ({ children }) => (
  <Flex flexDirection="column" style={{ minHeight: '100vh' }}>
    <style dangerouslySetInnerHTML={{ __html: css }} />
    <Box
      align="center"
      w={1}
      style={{
        display: 'flex',
        flex: 1,
        flexDirection: 'column'
      }}
    >
      {children}
    </Box>
    <Footer />
  </Flex>
)

export default Layout
