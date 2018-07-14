import React, { Component, Fragment } from 'react'
import './../App.css'
import { ThemeProvider, Heading } from '@hackclub/design-system'
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

  componentDidMount() {
    axios({
      method: 'get',
      url: 'https://api.hackchicago.io/v1/me',
      withCredentials: true
    })
      .then(res => {
        console.log(res)
        this.setState({
          loginStatus: 'logged in'
        })
      })
      .catch(error => {
        console.log(error)
        if (error.response.status === 401) {
          this.setState({
            loginStatus: 'not logged in'
          })
        } else {
          this.setState({
            loginStatus: 'error'
          })
        }
      })
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
        <Heading m={3}>
          <Link to="/">Dashboard</Link>
        </Heading>

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
                        <LogoutButton onLogout={this.doLogout} />
                        <Projects />
                      </Fragment>
                    ) : (
                      <LoginForm onLogin={this.showProjects} />
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
