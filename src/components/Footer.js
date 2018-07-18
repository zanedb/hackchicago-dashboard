import { Flex, Text, Link } from '@hackclub/design-system'
import React from 'react'

const Base = Flex.withComponent('footer').extend.attrs({
  bg: 'snow',
  justify: 'center',
  p: 4
})`
    background-image: url(/pattern.svg);
    background-size: 20rem;
`

const Footer = () => (
  <Base>
    <Text align="center" f={3}>
      Made with{' '}
      <span role="img" aria-label="heart">
        ❤️
      </span>{' '}
      for{' '}
      <Link href="https://hackchicago.io" target="_blank">
        Hack Chicago 2018
      </Link>
    </Text>
  </Base>
)

export default Footer
