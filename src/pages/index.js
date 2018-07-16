import { Box, Button, Heading } from '@hackclub/design-system'
import axios from 'axios'
import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'

import AddProject from './../components/AddProject'
import LoadingBar from './../components/LoadingBar'
import LoginForm from './../components/LoginForm'
import LogoutButton from './../components/LogoutButton'
import Projects from './../components/Projects'

class App extends Component {
  state = {
    loginStatus: 'loading',
    view: 'projects'
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
    const { loginStatus, view } = this.state

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
                <Button onClick={this.addProject} bg="accent" m={2} scale>
                  Add Project
                </Button>
              ) : (
                <Button onClick={this.showProjects} bg="accent" m={2}>
                  View Projects
                </Button>
              )}
              <LogoutButton onLogout={this.doLogout} />
            </Box>
            {view === 'projects' && <Projects />}
            {view === 'addProject' && <AddProject onEnd={this.showProjects} />}
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
    }
  }
}

export default App
