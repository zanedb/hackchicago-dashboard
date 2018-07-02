import React, { Component, Fragment } from 'react'
import { Text } from '@hackclub/design-system'
import LoadingBar from './LoadingBar'
import ErrorPage from './ErrorPage'
import Project from './Project'
const axios = require('axios');

class Projects extends Component {
  state = {
    projects: [],
    upvotes: [],
    status: 'loading',
    message: ''
  }

  loadProjects() {
    const { authKey } = this.props;
    if(authKey) {
      const api = axios.create({
        baseURL: 'https://hackchicago.herokuapp.com/api/',
        headers: {'Auth': authKey}
      });
      api.get('v1/projects')
        .then(res => {
          this.setState({ projects: res.data, status: 'success', message: res.statusText });
        })
        .catch(error => {
          this.setState({ message: error.response.data.message, status: 'error' });
        })
    } else {
      this.setState({ message: 'No authentication key provided', status: 'error' });
    }
  }

  componentDidMount() {
    this.loadProjects();

    this.refreshIntervalId = setInterval(() => {
      this.loadProjects()
    }, 4096)
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
        return (
          <Fragment>
            {projects.length < 1 && (
              <Text f={3} color="muted" py={4} align="center" bold>
                No projects yet!
              </Text>
            )}
            {projects.map(project => (
              <Project
                name={project.name}
                key={project._id}
              />
            ))}
          </Fragment>
        )
      case 'error':
        return (
          <Fragment>
            <Text f={3} color="error" py={4} align="center" bold>
              Error: {message}
            </Text>
          </Fragment>
        )
      default:
        return <ErrorPage />
    }
  }
}

export default Projects