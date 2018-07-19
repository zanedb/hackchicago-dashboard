import React, { Component, Fragment } from 'react'
import { Container, Text, Box } from '@hackclub/design-system'
import axios from 'axios'

import ExtendedAttendee from './../components/admin/ExtendedAttendee'
import LoadingBar from './../components/LoadingBar'
import ErrorPage from './../components/ErrorPage'
import Header from './../components/Header'

class Project extends Component {
  state = {
    status: 'loading',
    attendee: {}
  }

  componentDidMount() {
    this.loadAttendee()
  }

  loadAttendee() {
    const { match } = this.props
    axios
      .get(
        `https://api.hackchicago.io/v1/attendees/id/${
          match.params.attendee_id
        }`,
        { withCredentials: true }
      )
      .then(res => {
        this.setState({
          status: 'loaded',
          attendee: res.data
        })
      })
      .catch(error => {
        if (error.response.status === 401) {
          this.props.history.push('/')
        } else {
          this.setState({
            status: 'invalid'
          })
        }
      })
  }

  returnHome = () => {
    this.props.history.push('/')
  }

  render() {
    const { attendee, status } = this.state
    switch (status) {
      case 'loading':
        return <LoadingBar />
      case 'loaded':
        return (
          <Fragment>
            <Header
              whatIsShowing="attendee"
              role="admin"
              showProjects={this.returnHome}
              doLogout={this.returnHome}
            />
            <Container>
              <ExtendedAttendee
                key={attendee._id}
                role={attendee.role}
                fname={attendee.fname}
                lname={attendee.lname}
                id={attendee._id}
                phone={attendee.phone}
                email={attendee.email}
                grade={attendee.grade}
                school={attendee.school}
                city={attendee.city}
                state={attendee.state}
                isApproved={attendee.isApproved}
                parentName={attendee.parentName}
                parentEmail={attendee.parentEmail}
                parentPhone={attendee.parentPhone}
              />
            </Container>
          </Fragment>
        )
      case 'invalid':
        return (
          <Box
            style={{
              display: 'flex',
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'center'
            }}
          >
            <Text color="error" fontSize={5} p={3}>
              404: Attendee Not Found
            </Text>
          </Box>
        )
      default:
        return <ErrorPage />
    }
  }
}

export default Project
