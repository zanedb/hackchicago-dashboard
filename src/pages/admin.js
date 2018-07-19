import React, { Component } from 'react'
import { Flex, Heading, Container, Text, Badge } from '@hackclub/design-system'
import axios from 'axios'

import LoadingBar from './../components/LoadingBar'
import ErrorPage from './../components/ErrorPage'
import AttendeeSearch from './../components/admin/AttendeeSearch'
import Header from './../components/Header'

const FlexHeading = Flex.withComponent(Heading.h2).extend`
  align-items: center;
  text-align: left;
`

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
        this.setState({ status: 'logged in' })
        this.loadAttendees()
      } else {
        this.props.history.push('/')
      }
    } catch (error) {
      this.props.history.push('/')
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
      case 'logged in':
        return (
          <Container align="center">
            <Header whatIsShowing="admin" role="admin" />
            <Heading.h2 align="left" fontSize={5}>
              Attendees
            </Heading.h2>
            <LoadingBar />
          </Container>
        )
      case 'loaded':
        return (
          <Container align="center">
            <Header
              whatIsShowing="admin"
              role="admin"
              showProjects={() => {
                this.props.history.push('/')
              }}
            />
            <FlexHeading fontSize={5} mb={3}>
              Attendees
              <Badge bg="smoke" color="slate" ml={['auto', 2]}>
                {attendees.length}
              </Badge>
            </FlexHeading>
            <AttendeeSearch attendees={attendees} />
          </Container>
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
