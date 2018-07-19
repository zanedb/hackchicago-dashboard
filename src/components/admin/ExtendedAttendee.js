import {
  Box,
  Button,
  Card,
  Flex,
  Heading,
  Icon,
  Link,
  Text
} from '@hackclub/design-system'
import React, { Component } from 'react'

const ProjectButton = Button.button.extend`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 72px;
  box-shadow: none !important;
`
const Buttons = Flex.extend`
  display: flex;
  flex-flow: column;
`

class ExtendedProject extends Component {
  render() {
    const {
      role,
      fname,
      lname,
      id,
      phone,
      email,
      grade,
      school,
      city,
      state,
      isApproved
    } = this.props
    return (
      <Card boxShadowSize="sm" my={3} p={3} color="black" bg="white">
        <Flex px={1} ml={1} mr={1} align="center">
          <Buttons ml={1} mr={1}>
            <ProjectButton
              bg={isApproved ? 'success' : 'smoke'}
              color={isApproved ? 'white' : 'slate'}
              mb={2}
            >
              <Icon size={20} name={isApproved ? 'check' : 'cancel'} />
            </ProjectButton>
          </Buttons>
          <Box px={1} ml={1} align="left">
            <Heading m={3} mb={1}>
              {fname} {lname}
            </Heading>
            <Text m={3} fontSize={4} mt={1} mb={1}>
              {grade}th Grader at {school} in {city}, {state}
            </Text>
            <Text m={3} fontSize={3} mt={1}>
              <Link href={`mailto:${email}`}>{email}</Link>
              {phone !== '' && ', '}
              <Link href={`tel:${phone}`}>{phone}</Link>
            </Text>
          </Box>
        </Flex>
      </Card>
    )
  }
}

export default ExtendedProject
