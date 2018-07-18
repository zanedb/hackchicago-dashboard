import React, { Component } from 'react'
import { Box, Heading, Divider, Container, Text } from '@hackclub/design-system'
import axios from 'axios'

import LoadingBar from './../components/LoadingBar'
import ErrorPage from './../components/ErrorPage'
import Attendee from '../components/Attendee'

class Admin extends Component {
  state = {
    status: 'loading'
  }

  async componentDidMount() {
    try {
      const loadMe = await axios({
        method: 'get',
        url: 'https://api.hackchicago.io/v1/me',
        withCredentials: true
      })
      if (loadMe.status === 200 && loadMe.data.role === 'admin') {
        this.setState({
          status: 'logged in'
        })
      } else {
        window.location.href = '/'
      }
    } catch (error) {
      window.location.href = '/'
    }
  }

  render() {
    const { status } = this.state
    switch (status) {
      case 'loading':
        return <LoadingBar />
      case 'logged in':
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
              <Attendee
                fname="First"
                lname="Last"
                id="a"
                phone="1234567890"
                email="email@email.com"
                grade={8}
                school="School"
                city="San Francisco"
                state="California"
                isApproved={true}
              />
            </Container>
          </Box>
        )
      default:
        return <ErrorPage />
    }
  }
}

export default Admin
