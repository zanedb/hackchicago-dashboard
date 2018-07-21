import {
  Box,
  Button,
  Card,
  Flex,
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
  checkedIn,
  checkInAttendee,
  error,
  ...props
}) => (
  <Base color="black" py={[2, 3]}>
    <Buttons ml={1} mr={1}>
      {error ? (
        <ProjectButton
          bg="error"
          color="white"
          mb={1}
          aria-label="Error"
          onClick={e => {
            checkInAttendee(id)
          }}
        >
          <Icon size={20} name="cancel" />
        </ProjectButton>
      ) : (
        <ProjectButton
          bg={checkedIn ? 'success' : 'smoke'}
          color={checkedIn ? 'white' : 'slate'}
          mb={1}
          aria-label={checkedIn ? 'Checked in' : 'Not checked in'}
          onClick={e => {
            checkInAttendee(id)
          }}
        >
          <Icon size={20} name={checkedIn ? 'check' : 'cancel'} />
        </ProjectButton>
      )}
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
