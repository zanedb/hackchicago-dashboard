import { ThemeProvider } from '@hackclub/design-system'
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import App from './pages/index'
import NotFound from './components/NotFound'

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
