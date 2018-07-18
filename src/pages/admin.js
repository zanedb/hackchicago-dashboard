import React, { Component, Fragment } from 'react'
import { Box, Heading, Divider, Container, Text } from '@hackclub/design-system'
import axios from 'axios'

import LoadingBar from './../components/LoadingBar'
import ErrorPage from './../components/ErrorPage'
import Attendee from '../components/Attendee'

class Admin extends Component {
  state = {
    status: 'loading',
    error: '',
    attendees: []
  }

  async componentDidMount() {
    try {
      const loadMe = await axios({
        method: 'get',
        url: 'https://api.hackchicago.io/v1/me',
        withCredentials: true
      })
      if (loadMe.status === 200 && loadMe.data.role === 'admin') {
        this.loadAttendees()
      } else {
        window.location.href = '/'
      }
    } catch (error) {
      window.location.href = '/'
    }
  }

  loadAttendees() {
    axios
      .get('https://api.hackchicago.io/v1/attendees', {
        withCredentials: true
      })
      .then(res => {
        this.setState({ attendees: res.data, status: 'loaded' })
      })
      .catch(err => {
        this.setState({ error: 'Authentication failed.', status: 'error' })
      })
  }

  render() {
    const { status, error, attendees } = this.state
    switch (status) {
      case 'loading':
        return <LoadingBar />
      case 'loaded':
        return (
          <Box align="center">
            <Heading m={3} fontSize={6}>
              Admin
            </Heading>
            <Container>
              <Text align="left" fontSize={5}>
                Attendees
              </Text>
              <Divider />
              {attendees.map(attendee => (
                <Attendee
                  fname={attendee.fname}
                  lname={attendee.lname}
                  id={attendee.id}
                  phone={attendee.phone}
                  email={attendee.email}
                  grade={attendee.grade}
                  school={attendee.school}
                  city={attendee.city}
                  state={attendee.state}
                  isApproved={attendee.isApproved}
                />
              ))}
            </Container>
          </Box>
        )
      case 'error':
        return (
          <Text color="error" fontSize={4}>
            Error: {error}
          </Text>
        )
      default:
        return <ErrorPage />
    }
  }
}

export default Admin
