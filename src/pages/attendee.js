import React, { Component, Fragment } from 'react'
import { Container, Text, Box, Flex, Button } from '@hackclub/design-system'
import axios from 'axios'

import ExtendedAttendee from './../components/admin/ExtendedAttendee'
import LoadingBar from './../components/LoadingBar'
import ErrorPage from './../components/ErrorPage'
import Header from './../components/Header'
import EditAttendee from './../components/admin/EditAttendee'

class Project extends Component {
  state = {
    status: 'loading',
    view: 'show',
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

  viewAdmin = () => {
    this.props.history.push('/admin')
  }

  deleteAttendee(id) {
    axios
      .delete(`https://api.hackchicago.io/v1/attendees/id/${id}`, {
        withCredentials: true
      })
      .then(res => {
        console.log(res)
        this.props.viewAdmin()
      })
      .catch(error => {
        console.error(error)
      })
  }

  render() {
    const { attendee, status, view } = this.state
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
            {view === 'show' && (
              <Container align="left">
                <ExtendedAttendee
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
                <Flex mt={4}>
                  <Button
                    bg="primary"
                    mr={1}
                    onClick={() => {
                      this.setState({
                        view: 'edit'
                      })
                    }}
                  >
                    Edit Attendee
                  </Button>
                  {attendee.role !== 'admin' && (
                    <Button
                      bg="important"
                      mr={1}
                      onClick={() => {
                        if (
                          window.confirm(
                            `Are you SURE you want to delete ${attendee.fname}?`
                          )
                        )
                          this.deleteAttendee(attendee.id)
                      }}
                    >
                      Delete Attendee
                    </Button>
                  )}
                  <Button bg="muted" onClick={this.viewAdmin}>
                    Cancel
                  </Button>
                </Flex>
              </Container>
            )}
            {view === 'edit' && <EditAttendee attendee={attendee} />}
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
