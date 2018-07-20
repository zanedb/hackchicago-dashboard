import React, { Component, Fragment } from 'react'
import {
  Badge,
  Button,
  Flex,
  Heading,
  Link,
  Text
} from '@hackclub/design-system'

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
const FlexHeading = Flex.withComponent(Heading.h2).extend`
  align-items: center;
  text-align: left;
`

class ExtendedAttendee extends Component {
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
      isApproved,
      parentEmail,
      parentName,
      parentPhone,
      viewAdmin
    } = this.props
    return (
      <Fragment>
        <FlexHeading fontSize={6} mb={2}>
          {fname} {lname}
          <Badge
            bg={role === 'admin' ? 'important' : 'smoke'}
            color={role === 'admin' ? 'white' : 'slate'}
            ml={['auto', 2]}
          >
            {role}
          </Badge>
        </FlexHeading>
        <Heading f={4} mb={3}>
          {grade}th Grader at {school} in {city}, {state}
        </Heading>
        <Text f={4}>
          Email: <Link href={`mailto:${email}`}>{email}</Link>
          {phone !== '' && (
            <Fragment>
              <br />Phone: <Link href={`tel:${phone}`}>{phone}</Link>
            </Fragment>
          )}
        </Text>
        <Heading.h2 f={5} my={3}>
          Parent/Guardian
        </Heading.h2>
        <Text f={4}>
          Name: {parentName}
          <br />
          Email: <Link href={`mailto:${parentEmail}`}>{parentEmail}</Link>
          <br />
          Phone: <Link href={`tel:${parentPhone}`}>{parentPhone}</Link>
        </Text>
      </Fragment>
    )
  }
}

export default ExtendedAttendee
