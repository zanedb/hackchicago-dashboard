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
import React from 'react'

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

const Attendee = ({
  id,
  fname,
  lname,
  email,
  phone,
  grade,
  school,
  city,
  state,
  isApproved,
  ...props
}) => (
  <Card boxShadowSize="sm" my={3} p={3} color="black" bg="white">
    <Flex px={1} ml={1} mr={1} align="center">
      <Buttons ml={1} mr={1}>
        <ProjectButton
          bg={isApproved ? 'accent' : 'smoke'}
          color={isApproved ? 'white' : 'slate'}
          mb={1}
        >
          <Icon size={20} name="arrow_upward" />
        </ProjectButton>
        <ProjectButton bg={'smoke'} color={'slate'} mt={1}>
          <Icon size={20} name="open_in_new" />
        </ProjectButton>
      </Buttons>
      <Box px={1} ml={1} align="left">
        <Heading m={3} mb={1}>
          <Link href={`/attendee/${id}`}>{`${fname} ${lname}`}</Link>
        </Heading>
        <Text m={3} fontSize={2} mt={1}>
          <Link href={`mailto:${email}`}>{email}</Link>,{' '}
          <Link href={`tel:${phone}`}>{phone}</Link>
        </Text>
        <Text m={3} fontSize={1}>
          {grade}th Grader at {school} in {city}, {state}
        </Text>
      </Box>
    </Flex>
  </Card>
)

export default Attendee
