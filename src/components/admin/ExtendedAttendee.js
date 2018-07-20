import React, { Fragment } from 'react'
import { Badge, Flex, Heading, Link, Text } from '@hackclub/design-system'

const FlexHeading = Flex.withComponent(Heading.h2).extend`
  align-items: center;
  text-align: left;
`

const ExtendedAttendee = ({ attendee }) => (
  <Fragment>
    <FlexHeading fontSize={6} mb={2}>
      {attendee.fname} {attendee.lname}
      <Badge
        bg={attendee.role === 'admin' ? 'important' : 'smoke'}
        color={attendee.role === 'admin' ? 'white' : 'slate'}
        ml={['auto', 2]}
      >
        {attendee.role}
      </Badge>
    </FlexHeading>
    <Heading f={4} mb={3}>
      {attendee.grade}th Grader at {attendee.school} in {attendee.city},{' '}
      {attendee.state}
    </Heading>
    <Text f={4}>
      Email: <Link href={`mailto:${attendee.email}`}>{attendee.email}</Link>
      {attendee.phone !== '' && (
        <Fragment>
          <br />Phone:{' '}
          <Link href={`tel:${attendee.phone}`}>{attendee.phone}</Link>
        </Fragment>
      )}
    </Text>
    <Heading.h2 f={5} my={3}>
      Parent/Guardian
    </Heading.h2>
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
