import { Container, Box, Text, Heading } from '@hackclub/design-system'
import axios from 'axios'
import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'

import AddProject from './../components/project/AddProject'
import EditProject from './../components/project/EditProject'
import LoadingBar from './../components/LoadingBar'
import LoginForm from './../components/LoginForm'
import Projects from './../components/project/Projects'
import ErrorPage from './../components/ErrorPage'
import Header from './../components/Header'

const LOGIN_STATUSES = {
  loading: 'loading',
  loggedIn: 'logged in'
}

const Jumbotron = Box.extend`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: -1;
  background-image: url(https://hackchicago.io/img/bg.png);
  background-size: 100% auto;
  background-position: bottom;
`

class Index extends Component {
  state = {
    loginStatus: LOGIN_STATUSES.loading,
    view: 'projects',
    role: '',
    hasSubmitted: false
  }

  componentDidMount() {
    this.checkLogin()
  }

  addProject = () => {
    this.setState({
      view: 'addProject'
    })
  }

  editProject = () => {
    this.setState({
      view: 'editProject'
    })
  }

  checkLogin = () => {
    axios
      .get('https://api.hackchicago.io/v1/me', { withCredentials: true })
      .then(res => {
        this.setState({
          loginStatus: LOGIN_STATUSES.loggedIn,
          role: res.data.role
        })
        if (res.data.project) {
          this.setState({
            hasSubmitted: true
          })
        }
      })
      .catch(error => {
        this.setState({
          loginStatus: 'not logged in'
        })
      })
  }

  showProjects = () => {
    this.setState({
      loginStatus: LOGIN_STATUSES.loggedIn,
      view: 'projects'
    })
  }

  doLogout = () => {
    this.setState({
      loginStatus: 'not logged in'
    })
  }

  render() {
    const { loginStatus, view, role, hasSubmitted } = this.state

    switch (loginStatus) {
      case 'loading':
        return <LoadingBar />
      case 'logged in':
        return (
          <Fragment>
            <Header
              whatIsShowing={view}
              role={role}
              wantToViewProjects={!hasSubmitted}
              editProject={this.editProject}
              addProject={this.addProject}
              showProjects={this.showProjects}
              doLogout={this.doLogout}
            />
            {view === 'projects' && <Projects />}
            {view === 'addProject' && <AddProject onEnd={this.showProjects} />}
            {view === 'editProject' && (
              <EditProject onEnd={this.showProjects} />
            )}
          </Fragment>
        )
      case 'not logged in':
        return (
          <Container maxWidth={32} align='left'>
            <Heading.h1 mt={4}>
              Welcome!
            </Heading.h1>
            <Text color='slate' f={4} my={3}>
              We can’t wait to see what you’ve built! Enter your email to sign in below.
            </Text>
            <LoginForm onLogin={this.checkLogin} />
            <Jumbotron />
          </Container>
        )
      default:
        return <ErrorPage />
    }
  }
}

export default Index
