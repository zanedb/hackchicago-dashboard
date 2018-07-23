import {
  Container,
  Box,
  Text,
  Heading,
  LargeButton
} from '@hackclub/design-system'
import React from 'react'

const Jumbotron = Box.extend`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: -1;
  background-image: url(https://hackchicago.io/img/bg.png);
  background-size: auto 100%;
  background-repeat: no-repeat;
  background-position: bottom;
  ${({ theme }) => theme.mediaQueries.md} {
    background-size: cover;
  }
`
const ThankYou = () => (
  <Container maxWidth={32} align="left">
    <Heading.h1 mt={4}>Thank You!</Heading.h1>
    <Text color="slate" f={4} my={3}>
      We had a blast at Hack Chicago 2018, and hope you did too. Project
      submission is now closed, and prize information will be sent shortly to
      all winners.
    </Text>
    <LargeButton
      onClick={() =>
        (window.location.href = 'https://hackchicago18.devpost.com/submissions')
      }
      bg="accent"
      scale
      mt={3}
    >
      View Projects
    </LargeButton>
    <Jumbotron />
  </Container>
)

export default ThankYou
