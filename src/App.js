import React from 'react'
import palx from 'palx'
import { ThemeProvider, theme } from '@hackclub/design-system'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Layout from './components/Layout'
import NotFound from './pages/404'
import Index from './pages/index'
import Project from './pages/project'
import Admin from './pages/admin'
import AdminProjects from './pages/adminProjects'
import Attendee from './pages/attendee'

const config = theme

const blue = '#0069ff'
const palette = palx(blue)

const grays = {
  black: palette.black,
  slate: palette.gray[8],
  silver: palette.gray[7],
  smoke: palette.gray[2],
  snow: palette.gray[0],
  white: '#ffffff'
}

const brand = {
  primary: blue,
  important: palette.red[8],
  accent: palette.fuschia[7],
  success: palette.teal[5],
  info: palette.blue[5],
  warning: palette.orange[5],
  error: palette.red[7],
  muted: grays.silver
}

const colors = {
  ...brand,
  ...grays,
  ...palette
}

config.colors = colors

const App = () => (
  <BrowserRouter>
    <ThemeProvider>
      <Layout>
        <Switch>
          <Route path="/" component={Index} exact />
          <Route path="/admin" component={Admin} exact />
          <Route path="/admin/projects" component={AdminProjects} exact />
          <Route path="/projects/:project_id" component={Project} exact />
          <Route path="/attendees/:attendee_id" component={Attendee} exact />
          <Route component={NotFound} />
        </Switch>
      </Layout>
    </ThemeProvider>
  </BrowserRouter>
)

export default App
