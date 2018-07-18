import React, { Component, Fragment } from 'react'
import { Container } from '@hackclub/design-system'
import axios from 'axios'

import ExtendedProject from './../components/ExtendedProject'
import LoadingBar from './../components/LoadingBar'
import ErrorPage from './../components/ErrorPage'
import ProjectsHeader from './../components/ProjectsHeader'

class Project extends Component {
  state = {
    status: 'loading',
    project: {},
    upvotes: [],
    role: ''
  }

  async componentDidMount() {
    this.loadProject()
  }

  upvoteProject = async id => {
    try {
      if (this.state.upvotes.includes(id)) {
        const deUpvoteProject = await axios({
          method: 'delete',
          url: `https://api.hackchicago.io/v1/projects/${id}/upvotes`,
          withCredentials: true
        })
        if (deUpvoteProject.status === 200) {
          this.setState(({ upvotes, project }) => {
            for (let i = 0; i < upvotes.length; i++) {
              if (upvotes[i] === id) upvotes.splice(i, 1)
            }
            project.upvotes = project.upvotes - 1
            return { upvotes, project }
          })
        }
      } else {
        const upvoteProject = await axios({
          method: 'post',
          url: `https://api.hackchicago.io/v1/projects/${id}/upvotes`,
          withCredentials: true
        })
        if (upvoteProject.status === 200) {
          this.setState(({ upvotes, project }) => {
            upvotes.push(id)
            project.upvotes = project.upvotes + 1
            return { upvotes, project }
          })
        }
      }
    } catch (error) {
      console.error(error)
    }
  }

  async loadProject() {
    const { match } = this.props
    try {
      const projectLoad = await axios({
        method: 'get',
        url: `https://api.hackchicago.io/v1/projects/${
          match.params.project_id
        }`,
        withCredentials: true
      })
      if (projectLoad.status === 200) {
        this.setState({
          status: 'loaded',
          project: projectLoad.data
        })
      } else {
        this.setState({
          status: 'error'
        })
      }

      const upvoteLoad = await axios({
        method: 'get',
        url: 'https://api.hackchicago.io/v1/me',
        withCredentials: true
      })
      if (upvoteLoad.status === 200) {
        let upvotes = []
        if (upvoteLoad.data.upvotes !== undefined) {
          for (const upvote of upvoteLoad.data.upvotes) {
            upvotes.push(upvote.projectId)
          }
        }
        this.setState({
          upvotes,
          role: upvoteLoad.data.role
        })
      }
    } catch (error) {
      console.error(error)
    }
  }

  returnHome() {
    window.open('/', '_self')
  }

  render() {
    const { project, status, upvotes, role } = this.state
    switch (status) {
      case 'loading':
        return <LoadingBar />
      case 'loaded':
        return (
          <Fragment>
            <ProjectsHeader
              whatIsShowing="project"
              role={role}
              wantToViewProjects={true}
              editProject={this.returnHome}
              addProject={this.returnHome}
              showProjects={this.returnHome}
              doLogout={this.returnHome}
            />
            <Container p={4}>
              <ExtendedProject
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
                isUpvoted={upvotes.includes(project.id) ? true : false}
              />
            </Container>
          </Fragment>
        )
      case 'error':
        return <ErrorPage />
      default:
        return <ErrorPage />
    }
  }
}

export default Project
