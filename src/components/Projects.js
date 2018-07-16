import { Text, Container } from '@hackclub/design-system'
import axios from 'axios'
import React, { Component } from 'react'

import ErrorPage from './ErrorPage'
import LoadingBar from './LoadingBar'
import Project from './Project'

class Projects extends Component {
  state = {
    projects: [],
    upvotes: [],
    status: 'loading',
    message: ''
  }

  upvoteProject = async id => {
    try {
      console.log(this.state.upvotes) // logs an array the first time, 1 the second times
      const upvoteProject = await axios({
        method: 'post',
        url: `https://api.hackchicago.io/v1/projects/${id}/upvotes`,
        withCredentials: true
      })
      if (upvoteProject.status === 200) {
        this.setState(prevState => ({
          upvotes: prevState.upvotes.push(id)
        }))
        console.log(`state: ${this.state}`)
      }
    } catch (error) {
      console.error(error)
    }
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
        console.log(upvotes)
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
                  id={project.id}
                  name={project.name}
                  link={project.link}
                  tagline={project.tagline}
                  description={project.description}
                  submitter={project.submitter}
                  timestamp={project.timestamp}
                  upvotesCount={project.upvotes}
                  upvoteProject={this.upvoteProject}
                  isUpvoted={upvotes.length > -1 ? true : false}
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
