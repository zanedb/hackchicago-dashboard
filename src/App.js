import React, { Component, Fragment } from 'react'
import './App.css'
import { ThemeProvider, Heading, Text } from '@hackclub/design-system'
import { Route, Link } from 'react-router-dom'
import LoginForm from './components/LoginForm'

import Projects from './components/Projects'

class App extends Component {
  state = {
    status: 'not logged in'
  }

  render() {
    const { status } = this.state
    return (
      <ThemeProvider>
        <Heading m={3}>
          <Link to="/">Dashboard</Link>
        </Heading>
        <Route
          exact
          path="/"
          component={() => (
            <Fragment>
              {status === 'not logged in' ? (
                <Text f={3} color="accent" py={4} align="center" bold>
                  <Link to="/login">Login</Link>
                </Text>
              ) : (
                <Projects authKey="" />
              )}
            </Fragment>
          )}
        />
        <Route path="/login" component={LoginForm} />
      </ThemeProvider>
    )
  }
}

export default App
