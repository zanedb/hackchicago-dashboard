import React, { Component } from 'react'
import {
  Box,
  Flex,
  Heading,
  Container,
  Text,
  Badge,
  Image,
  Link,
  Button
} from '@hackclub/design-system'
import axios from 'axios'

import LoadingBar from './../components/LoadingBar'
import ErrorPage from './../components/ErrorPage'
import Header from './../components/Header'

const FlexHeading = Flex.withComponent(Heading.h2).extend`
  align-items: center;
  text-align: left;
`

const Project = ({ data, onDelete, onSetTable }) => (
  <Flex align="center" mb={3}>
    <Image
      src={data.image}
      bg="smoke"
      mr={3}
      style={{ width: 128, minHeight: 64, height: 'auto', objectFit: 'cover' }}
    />
    <Box align="left">
      <Link href={data.link}>
        <Heading.h3 color="primary" f={4} children={data.name} />
        <Text color="muted">{data.tagline}</Text>
        <Text color="muted">
          {data.upvotes} upvotes – submitted by {data.submitter.name}
        </Text>
      </Link>
    </Box>
    <Text
      f={5}
      mr={[3, 4]}
      ml="auto"
      onClick={e => onSetTable(data.id)}
      children={data.tableId || '–'}
    />
    <Button bg="error" onClick={e => onDelete(data.id)}>
      Delete
    </Button>
  </Flex>
)

class AdminProjects extends Component {
  state = {
    status: 'loading',
    error: '',
    projects: []
  }

  async componentDidMount() {
    try {
      const loadMe = await axios({
        method: 'get',
        url: 'https://api.hackchicago.io/v1/me',
        withCredentials: true
      })
      if (loadMe.status === 200 && loadMe.data.role === 'admin') {
        this.setState({ status: 'logged in' })
        this.loadProjects()
      } else {
        this.props.history.push('/')
      }
    } catch (error) {
      this.props.history.push('/')
    }
  }

  loadProjects() {
    axios
      .get('https://api.hackchicago.io/v1/projects', {
        withCredentials: true
      })
      .then(res => {
        this.setState({ projects: res.data, status: 'loaded' })
      })
      .catch(err => {
        this.setState({ error: 'Authentication failed.', status: 'error' })
      })
  }

  setProjectTable = id => {
    const tableId = prompt('New Table ID')
    axios
      .put(
        `https://api.hackchicago.io/v1/projects/${id}`,
        { tableId },
        { withCredentials: true }
      )
      .then(res => {
        this.loadProjects()
      })
      .catch(error => {
        if (error.response.status === 400) {
          alert(error.response.data.message)
        }
      })
  }

  deleteProject = id => {
    axios
      .delete(`https://api.hackchicago.io/v1/projects/${id}`, {
        withCredentials: true
      })
      .then(res => {
        this.loadProjects()
      })
      .catch(error => {
        if (error.response.status === 400) {
          alert(error.response.data.message)
        }
      })
  }

  render() {
    const { status, error, projects } = this.state
    switch (status) {
      case 'loading':
        return <LoadingBar />
      case 'logged in':
        return (
          <Container align="center">
            <Header
              whatIsShowing="admin"
              role="admin"
              showProjects={() => {
                this.props.history.push('/')
              }}
              onLogout={() => {
                this.props.history.push('/')
              }}
            />
            <Heading.h2 align="left" fontSize={5}>
              Projects
            </Heading.h2>
            <LoadingBar />
          </Container>
        )
      case 'loaded':
        return (
          <Container align="center">
            <Header
              whatIsShowing="admin"
              role="admin"
              showProjects={() => {
                this.props.history.push('/')
              }}
              onLogout={() => {
                this.props.history.push('/')
              }}
            />
            <FlexHeading fontSize={5} mb={3}>
              Projects
              <Badge bg="smoke" color="slate" ml={['auto', 2]}>
                {projects.length}
              </Badge>
            </FlexHeading>
            {projects.map(project => (
              <Project
                data={project}
                onDelete={this.deleteProject}
                onSetTable={this.setProjectTable}
                key={project.id}
              />
            ))}
            {projects.length === 0 && (
              <Text color="muted" f={4} bold align="center">
                No projects yet
              </Text>
            )}
          </Container>
        )
      case 'error':
        return (
          <Text color="error" fontSize={4}>
            Error: {error}
          </Text>
        )
      default:
        return <ErrorPage />
    }
  }
}

export default AdminProjects
