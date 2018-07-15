import { ThemeProvider } from '@hackclub/design-system'
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import NotFound from './components/NotFound'
import App from './pages/index'

ReactDOM.render(
  <BrowserRouter>
    <ThemeProvider webfonts>
      <Switch>
        <Route path="/" component={App} exact />
        <Route component={NotFound} />
      </Switch>
    </ThemeProvider>
  </BrowserRouter>,
  document.getElementById('root')
)
