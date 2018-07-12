import React, { Component, Fragment } from 'react'
import './App.css'
import { ThemeProvider, Heading, Text } from '@hackclub/design-system'
import { Route, Link, Switch } from 'react-router-dom'
import LoginForm from './components/LoginForm'
import NotFound from './components/NotFound'

import Projects from './components/Projects'

class App extends Component {
  state = {
    status: ''
  }
  
  showProjects = () => {
    this.setState({
      status: 'logged in'
    })
  }

  render() {
    const { status } = this.state
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
                {status === '' ? (
                  <Fragment>
                    <Text f={3} color="accent" py={4} align="center" bold>
                      <Link to="/login">Login</Link>
                    </Text>
                    <button onClick={this.showProjects}>
                      I am logged in (temp)
                    </button>
                  </Fragment>
                ) : (
                  <Projects />
                )}
              </Fragment>
            )}
          />
          <Route
            path="/login"
            component={() => <LoginForm status={status} />}
            status=""
          />
          <Route component={NotFound} />
        </Switch>
      </ThemeProvider>
    )
  }
}

export default App
