import React, { Component, Fragment } from 'react'
import './../App.css'
import { ThemeProvider, Heading, Box, Button } from '@hackclub/design-system'
import { Link } from 'react-router-dom'
import axios from 'axios'

import LoginForm from './../components/LoginForm'
import NotFound from './../components/NotFound'
import LoadingBar from './../components/LoadingBar'
import LogoutButton from './../components/LogoutButton'
import Projects from './../components/Projects'
import AddProject from './../components/AddProject'

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
    return (
      <Fragment>
        {loginStatus === 'loading' ? (
          <LoadingBar />
        ) : (
          <Fragment>
            {loginStatus === 'logged in' ? (
              <Fragment>
                <Box align="center">
                  <Heading m={3}>
                    <Link to="/">Projects</Link>
                  </Heading>
                  {view === 'projects' ? (
                    <Button
                      onClick={this.addProject}
                      bg="accent"
                      m={2}
                      scale={true}
                    >
                      Add Project
                    </Button>
                  ) : (
                    <Button
                      onClick={this.showProjects}
                      bg="accent"
                      m={2}
                    >
                      View Projects
                    </Button>
                  )}
                  <LogoutButton onLogout={this.doLogout} />
                </Box>
                {view === 'projects' && <Projects />}
                {view === 'addProject' && (
                  <AddProject onEnd={this.showProjects} />
                )}
              </Fragment>
            ) : (
              <Box align="center">
                <Heading m={3}>
                  <Link to="/">Login</Link>
                </Heading>
                <LoginForm onLogin={this.showProjects} />
              </Box>
            )}
          </Fragment>
        )}
      </Fragment>
    )
  }
}

export default App
