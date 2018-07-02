import React, { Component } from 'react'
import './App.css'
import { ThemeProvider, Heading } from '@hackclub/design-system'

import Projects from './components/Projects'

class App extends Component {
  render() {
    return (
      <ThemeProvider>
        <Heading m={3}>Dashboard</Heading>
        {/* This auth key | needs to be set when running this code locally - DO NOT commit/deploy with the auth key set
            new auth way  | coming soon! */}
        <Projects authKey="" />
      </ThemeProvider>
    )
  }
}

export default App
