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

const Base = Card.withComponent(Flex).extend`
  align-items: center;
  border-top: 1px solid ${({ theme }) => theme.colors.smoke};
`

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
  <Base color="black" py={[2, 3]}>
    <Buttons ml={1} mr={1}>
      <ProjectButton
        bg={isApproved ? 'success' : 'smoke'}
        color={isApproved ? 'white' : 'slate'}
        mb={1}
        aria-label={isApproved ? 'Approved' : 'Not approved'}
      >
        <Icon size={20} name={isApproved ? 'check' : 'cancel'} />
      </ProjectButton>
      <ProjectButton bg="smoke" color="slate" mt={1}>
        <Icon size={20} name="open_in_new" />
      </ProjectButton>
    </Buttons>
    <Box ml={2} align="left">
      <Text fontSize={3} bold>
        <Link href={`/attendee/${id}`}>{`${fname} ${lname}`}</Link>
      </Text>
      <Text my={[1, 2]} fontSize={1} color="slate">
        {grade}th Grader at {school} in {city}, {state}
      </Text>
      <Text fontSize={1} color="slate">
        <Link href={`mailto:${email}`}>{email}</Link>
        {phone !== '' && ', '}
        <Link href={`tel:${phone}`}>{phone}</Link>
      </Text>
    </Box>
  </Base>
)

export default Attendee
