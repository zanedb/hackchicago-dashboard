import React, { Component, Fragment } from 'react'
import { Text } from '@hackclub/design-system'
import LoadingBar from './LoadingBar'
import ErrorPage from './ErrorPage'
import Project from './Project'
import axios from 'axios'

class Projects extends Component {
  state = {
    projects: [],
    upvotes: [],
    status: 'loading',
    message: ''
  }

  loadProjects() {
    axios({
      method: 'get',
      url: 'http://localhost:8080/v1/projects'
    })
      .then(res => {
        this.setState({
          projects: res.data,
          status: 'success',
          message: res.statusText
        })
      })
      .catch(error => {
        this.setState({
          message: error.response.statusText,
          status: 'error'
        })
      })
  }

  componentDidMount() {
    this.loadProjects()

    this.refreshIntervalId = setInterval(() => {
      this.loadProjects()
    }, 4000)
  }

  componentWillUnmount() {
    clearInterval(this.refreshIntervalId)
  }

  render() {
    const { projects, upvotes, status, message } = this.state
    switch (status) {
      case 'loading':
        return <LoadingBar />
      case 'success':
        console.log(projects)
        return (
          <Fragment>
            {projects.length < 1 ? (
              <Text f={3} color="muted" py={4} align="center" bold>
                No projects yet!
              </Text>
            ) : (
              projects.map(project => (
                <Project
                  key={project._id}
                  name={project.name}
                  description={project.description}
                  submitter={project.submitter}
                  tagline={project.tagline}
                  timestamp={project.timestamp}
                />
              ))
            )}
          </Fragment>
        )
      case 'error':
        return (
          <Text f={3} color="error" py={4} align="center" bold>
            Error: {message}
          </Text>
        )
      default:
        return <ErrorPage />
    }
  }
}

export default Projects
