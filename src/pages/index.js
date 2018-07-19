import { Box, Heading } from '@hackclub/design-system'
import axios from 'axios'
import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'

import AddProject from './../components/project/AddProject'
import EditProject from './../components/project/EditProject'
import LoadingBar from './../components/LoadingBar'
import LoginForm from './../components/LoginForm'
import Projects from './../components/project/Projects'
import ErrorPage from './../components/ErrorPage'
import ProjectsHeader from './../components/project/ProjectsHeader'

class Index extends Component {
  state = {
    loginStatus: 'loading',
    view: 'projects',
    role: '',
    hasSubmitted: false
  }

  componentDidMount() {
    axios
      .get('https://api.hackchicago.io/v1/me', { withCredentials: true })
      .then(res => {
        this.setState({
          loginStatus: 'logged in',
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

  showProjects = () => {
    this.setState({
      loginStatus: 'logged in',
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
            <ProjectsHeader
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
          <Box align="center">
            <Heading m={3}>
              <Link to="/">Login</Link>
            </Heading>
            <LoginForm onLogin={this.showProjects} />
          </Box>
        )
      default:
        return <ErrorPage />
    }
  }
}

export default Index
