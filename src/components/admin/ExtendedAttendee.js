import React, { Fragment } from 'react'
import { Badge, Flex, Heading, Link, Text } from '@hackclub/design-system'

const FlexHeading = Flex.withComponent(Heading.h2).extend`
  align-items: center;
  text-align: left;
`

const ExtendedAttendee = ({ attendee }) => (
  <Fragment>
    <FlexHeading>
      {attendee.fname} {attendee.lname}
      <Badge
        bg={attendee.role === 'admin' ? 'important' : 'smoke'}
        color={attendee.role === 'admin' ? 'white' : 'slate'}
        ml={['auto', 2]}
      >
        {attendee.role}
      </Badge>
    </FlexHeading>
    <Text f={3} mb={2} color="slate">
      Signed up at {attendee.timestamp}
    </Text>
    <Text f={4}>
      {attendee.grade}th Grader at {attendee.school} in {attendee.city},{' '}
      {attendee.state}
    </Text>
    <Text f={4}>
      Email: <Link href={`mailto:${attendee.email}`}>{attendee.email}</Link>
      {attendee.phone !== '' && (
        <Fragment>
          <br />Phone:{' '}
          <Link href={`tel:${attendee.phone}`}>{attendee.phone}</Link>
        </Fragment>
      )}
    </Text>
    <Heading.h3 my={2}>Parent/Guardian</Heading.h3>
    <Text f={4}>
      Name: {attendee.parentName}
      <br />
      Email:{' '}
      <Link href={`mailto:${attendee.parentEmail}`}>
        {attendee.parentEmail}
      </Link>
      <br />
      Phone:{' '}
      <Link href={`tel:${attendee.parentPhone}`}>{attendee.parentPhone}</Link>
    </Text>
  </Fragment>
)

export default ExtendedAttendee
