import React, { Component, Fragment } from 'react'
import { Text } from '@hackclub/design-system'
import Fuse from 'fuse.js'

import Attendee from './Attendee'
import SearchInput from './AttendeeSearchInput'

class AttendeeSearch extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: ''
    }
    const attendees = this.props.attendees
    // make full name of user searchable
    for (const attendee of attendees) {
      attendee.fullname = `${attendee.fname} ${attendee.lname}`
    }
    const options = {
      shouldSort: true,
      threshold: 0.2,
      keys: ['_id', 'fullname', 'email']
    }
    this.fuse = new Fuse(props.attendees, options)
  }

  handleInputChange = e => this.setState({ value: e.target.value })

  render() {
    const results =
      this.state.value === ''
        ? this.props.attendees
        : this.fuse.search(this.state.value)

    return (
      <Fragment>
        <SearchInput
          placeholder="Search attendees"
          label="Search"
          value={this.state.inputValue}
          onChange={this.handleInputChange}
          mb={5}
        />
        {results.length !== 0 ? (
          <Fragment>
            {results.map(attendee => (
              <Attendee
                key={attendee._id}
                fname={attendee.fname}
                lname={attendee.lname}
                id={attendee._id}
                phone={attendee.phone}
                email={attendee.email}
                grade={attendee.grade}
                school={attendee.school}
                city={attendee.city}
                state={attendee.state}
                checkedIn={attendee.checkedIn}
              />
            ))}
          </Fragment>
        ) : (
          <Text fontSize={5} color="error">
            No results found {this.state.value && `for "${this.state.value}"`}
          </Text>
        )}
      </Fragment>
    )
  }
}

export default AttendeeSearch
