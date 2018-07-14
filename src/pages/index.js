import React, { Component, Fragment } from 'react'
import './../App.css'
import { ThemeProvider, Heading, Box } from '@hackclub/design-system'
import { Route, Link, Switch } from 'react-router-dom'
import axios from 'axios'

import LoginForm from './../components/LoginForm'
import NotFound from './../components/NotFound'
import LoadingBar from './../components/LoadingBar'
import LogoutButton from './../components/LogoutButton'
import Projects from './../components/Projects'

class App extends Component {
  state = {
    loginStatus: 'loading'
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
      } else if (loginRequest.status === 401) {
        this.setState({
          loginStatus: 'not logged in'
        })
      }
    } catch (error) {
      console.error(error)
    }
  }

  showProjects = () => {
    this.setState({
      loginStatus: 'logged in'
    })
  }

  doLogout = () => {
    this.setState({
      loginStatus: 'not logged in'
    })
  }

  render() {
    const { loginStatus } = this.state
    return (
      <ThemeProvider>
        <Switch>
          <Route
            exact
            path="/"
            component={() => (
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
                          <LogoutButton onLogout={this.doLogout} />
                        </Box>
                        <Projects />
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
            )}
          />
          <Route component={NotFound} />
        </Switch>
      </ThemeProvider>
    )
  }
}

export default App
