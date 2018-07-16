import { ThemeProvider } from '@hackclub/design-system'
import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Layout from './components/Layout'
import NotFound from './pages/404'
import Index from './pages/index'
import Login from './pages/login'
import Projects from './pages/projects'

const App = () => (
  <BrowserRouter>
    <ThemeProvider webfonts>
      <Layout>
        <Switch>
          <Route path="/" component={Index} exact />
          <Route path="/login" component={Login} exact />
          <Route path="/projects" component={Projects} exact />
          <Route component={NotFound} />
        </Switch>
      </Layout>
    </ThemeProvider>
  </BrowserRouter>
)

export default App
