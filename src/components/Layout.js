import React, { Fragment } from 'react'
import { Box, Flex } from '@hackclub/design-system'
import { injectGlobal } from 'styled-components'

import Footer from './Footer'

// Corrects body width when scrollbar is present
injectGlobal`
  body {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
`

const Layout = ({ children }) => (
  <Fragment>
    <Box.main align="center" px={3} style={{ minHeight: '100vh' }}>
      {children}
    </Box.main>
    <Footer />
  </Fragment>
)

export default Layout
