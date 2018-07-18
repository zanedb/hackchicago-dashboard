import { ThemeProvider } from '@hackclub/design-system'
import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Layout from './components/Layout'
import NotFound from './components/NotFound'
import Index from './pages/index'
import Project from './pages/project'
import Admin from './pages/admin'

const App = () => (
  <BrowserRouter>
    <ThemeProvider webfonts>
      <Layout>
        <Switch>
          <Route path="/" component={Index} exact />
          <Route path="/admin" component={Admin} exact />
          <Route path="/project/:project_id" component={Project} exact />
          <Route component={NotFound} />
        </Switch>
      </Layout>
    </ThemeProvider>
  </BrowserRouter>
)

export default App
