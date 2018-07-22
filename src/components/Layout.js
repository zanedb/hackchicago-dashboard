import React, { Fragment } from 'react'
import { Container, cx } from '@hackclub/design-system'
import { injectGlobal } from 'styled-components'

import Footer from './Footer'

// Corrects body width when scrollbar is present
injectGlobal`
  body {
    display: flex;
    flex-direction: column;
    width: 100%;
    background-image: linear-gradient(
      ${cx('white')},
      ${cx('snow')}
    );
  }
`

const Base = Container.withComponent('main').extend`min-height: 100vh;`

const Layout = ({ children }) => (
  <Fragment>
    <Base maxWidth={48} color="black" align="center" px={3}>
      {children}
    </Base>
    <Footer />
  </Fragment>
)

export default Layout
