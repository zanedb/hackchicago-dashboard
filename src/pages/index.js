import { Box, Button, Heading } from '@hackclub/design-system'
import axios from 'axios'
import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'

import AddProject from './../components/AddProject'
import EditProject from './../components/EditProject'
import LoadingBar from './../components/LoadingBar'
import LoginForm from './../components/LoginForm'
import LogoutButton from './../components/LogoutButton'
import Projects from './../components/Projects'
import ErrorPage from './../components/ErrorPage'

class App extends Component {
  state = {
    loginStatus: 'loading',
    view: 'projects',
    hasSubmitted: false
  }

  async componentDidMount() {
    try {
      const loginRequest = await axios({
        method: 'get',
        url: 'https://api.hackchicago.io/v1/me',
        withCredentials: true
      })
      console.log(loginRequest)
      if (loginRequest.status === 200) {
        this.setState({
          loginStatus: 'logged in'
        })
        if (loginRequest.data.project) {
          this.setState({
            hasSubmitted: true
          })
        }
      }
    } catch (error) {
      this.setState({
        loginStatus: 'not logged in'
      })
    }
  }

  addProject = () => {
    this.setState({
      view: 'addProject'
    })
  }

  editProject = () => {
    this.setState({
      view: 'editProject'
    })
  }

  showProjects = () => {
    this.setState({
      loginStatus: 'logged in',
      view: 'projects'
    })
  }

  doLogout = () => {
    this.setState({
      loginStatus: 'not logged in'
    })
  }

  render() {
    const { loginStatus, view, hasSubmitted } = this.state

    switch (loginStatus) {
      case 'loading':
        return <LoadingBar />
      case 'logged in':
        return (
          <Fragment>
            <Box align="center">
              <Heading m={3}>
                <Link to="/">Projects</Link>
              </Heading>
              {view === 'projects' ? (
                <Fragment>
                  {hasSubmitted ? (
                    <Button onClick={this.editProject} bg="accent" m={2}>
                      Edit My Project
                    </Button>
                  ) : (
                    <Button onClick={this.addProject} bg="accent" m={2} scale>
                      Add Project
                    </Button>
                  )}
                </Fragment>
              ) : (
                <Button onClick={this.showProjects} bg="accent" m={2}>
                  View Projects
                </Button>
              )}
              <LogoutButton onLogout={this.doLogout} />
            </Box>
            {view === 'projects' && <Projects />}
            {view === 'addProject' && <AddProject onEnd={this.showProjects} />}
            {view === 'editProject' && (
              <EditProject onEnd={this.showProjects} />
            )}
          </Fragment>
        )
      case 'not logged in':
        return (
          <Box align="center">
            <Heading m={3}>
              <Link to="/">Login</Link>
            </Heading>
            <LoginForm onLogin={this.showProjects} />
          </Box>
        )
      default:
        return <ErrorPage />
    }
  }
}

export default App
