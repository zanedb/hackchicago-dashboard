import React, { Component } from 'react'
import {
  Container,
  Text,
  Box,
  Flex,
  Button,
  Heading
} from '@hackclub/design-system'
import axios from 'axios'

import ExtendedAttendee from './../components/admin/ExtendedAttendee'
import LoadingBar from './../components/LoadingBar'
import ErrorPage from './../components/ErrorPage'
import Header from './../components/Header'
import EditAttendee from './../components/admin/EditAttendee'

const Switch = Box.extend`
  border-radius: 99999px;
  display: inline-flex;
  width: 40px;
  height: 24px;
  background-color: ${props => (props.checked ? 'green' : 'transparent')};
  box-shadow: inset 0 0 0 2px;
  transition-property: background-color;
  transition-duration: 0.25s;
  transition-timing-function: ease-out;
  user-select: none;
  &:after {
    content: ' ';
    width: 16px;
    height: 16px;
    margin: 4px;
    border-radius: 8px;
    background-color: ${props =>
      props.checked ? props.theme.colors.white : props.theme.cx(props.color)};
    transition-property: transform, color;
    transition-duration: 0.125s;
    transition-timing-function: ease-out;
    transform: ${props =>
      props.checked ? `translateX(16px)` : `translateX(0)`};
  }
`

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

  setParentWaiver(status, id) {
    console.log('par')
    axios
      .put(
        `https://api.hackchicago.io/v1/attendees/id/${id}`,
        {
          waiverStatus: {
            parent: status
          }
        },
        { withCredentials: true }
      )
      .then(res => {
        this.setState(({ attendee }) => {
          attendee.waiverStatus.parent = status
          return { attendee }
        })
      })
      .catch(error => {
        console.error(error)
      })
  }

  setStudentWaiver(status, id) {
    console.log('stu')
    axios
      .put(
        `https://api.hackchicago.io/v1/attendees/id/${id}`,
        {
          waiverStatus: {
            student: status
          }
        },
        { withCredentials: true }
      )
      .then(res => {
        this.setState(({ attendee }) => {
          attendee.waiverStatus.student = status
          return { attendee }
        })
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
          <Box my={4}>
            <Header
              whatIsShowing="attendee"
              role="admin"
              showProjects={this.returnHome}
              doLogout={this.returnHome}
            />
            {view === 'show' && (
              <Container align="left">
                <ExtendedAttendee attendee={attendee} />
                <Flex mt={3}>
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
                <Flex flexDirection="column" mt={3}>
                  <Heading.h2>Check-in</Heading.h2>
                  <Flex align="center" my={3}>
                    <Switch
                      color="primary"
                      role="checkbox"
                      checked={attendee.waiverStatus.student}
                      onClick={() => {
                        this.setStudentWaiver(
                          !attendee.waiverStatus.student,
                          attendee.id
                        )
                      }}
                      mr={2}
                    />
                    <Text>Student Waiver Status</Text>
                  </Flex>
                  <Flex align="center">
                    <Switch
                      color="primary"
                      role="checkbox"
                      checked={attendee.waiverStatus.parent}
                      onClick={() => {
                        this.setParentWaiver(
                          !attendee.waiverStatus.parent,
                          attendee.id
                        )
                      }}
                      mr={2}
                    />
                    <Text>Parent Waiver Status</Text>
                  </Flex>
                </Flex>
              </Container>
            )}
            {view === 'edit' && (
              <EditAttendee
                attendee={attendee}
                onEnd={() => {
                  this.loadAttendee()
                  this.setState({
                    view: 'show'
                  })
                }}
              />
            )}
          </Box>
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
