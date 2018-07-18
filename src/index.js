import { ThemeProvider } from '@hackclub/design-system'
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import NotFound from './components/NotFound'
import App from './pages/index'
import Project from './pages/project'
import Admin from './pages/admin'

ReactDOM.render(
  <BrowserRouter>
    <ThemeProvider webfonts>
      <Switch>
        <Route path="/" component={App} exact />
        <Route path="/admin" component={Admin} exact />
        <Route path="/project/:project_id" component={Project} exact />
        <Route path="/projects/:project_id" component={Project} exact />
        <Route component={NotFound} />
      </Switch>
    </ThemeProvider>
  </BrowserRouter>,
  document.getElementById('root')
)
