import React, { Component } from 'react'
import { Text, Container } from '@hackclub/design-system'
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

  async loadProjects() {
    try {
      const projectLoad = await axios({
        method: 'get',
        url: 'https://api.hackchicago.io/v1/projects',
        withCredentials: true
      })
      if (projectLoad.status === 200) {
        this.setState({
          projects: projectLoad.data,
          status: 'success',
          message: projectLoad.statusText
        })
      } else {
        this.setState({
          message: projectLoad.statusText,
          status: 'error'
        })
      }
    } catch (error) {
      console.error(error)
    }
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
          <Container p={4}>
            {projects.length < 1 ? (
              <Text f={3} color="muted" py={4} align="center" bold>
                No projects yet!
              </Text>
            ) : (
              projects.map(project => (
                <Project
                  key={project.id}
                  name={project.name}
                  link={project.link}
                  tagline={project.tagline}
                  description={project.description}
                  submitter={project.submitter}
                  timestamp={project.timestamp}
                />
              ))
            )}
          </Container>
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
