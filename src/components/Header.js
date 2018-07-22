import { Container, Flex, Button, Heading } from '@hackclub/design-system'
import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

import LogoutButton from './LogoutButton'

const Base = Container.withComponent(Flex).extend`
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.smoke};
  flex-wrap: wrap;

  h1 {
    flex: 1 1 auto;
  }
`

const ProjectsHeader = ({
  whatIsShowing,
  role,
  hasSubmitted,
  editProject,
  addProject,
  showProjects,
  doLogout,
  ...props
}) => (
  <Base mt={4} mb={3} width={1} color="black">
    <Heading.h1 fontSize={6} align="left" style={{ fontWeight: '800' }}>
      <Link to="/" onClick={showProjects}>
        {whatIsShowing.toLowerCase().includes('project') && 'Projects'}
        {whatIsShowing.toLowerCase().includes('admin') && 'Admin'}
        {whatIsShowing.toLowerCase().includes('attendee') && 'Attendee'}
      </Link>
    </Heading.h1>
    {whatIsShowing === 'projects' ? (
      <Fragment>
        {!hasSubmitted ? (
          <Button onClick={addProject} bg="success" mr={2} scale>
            Add Project
          </Button>
        ) : (
          <Button onClick={editProject} bg="primary" mr={2}>
            Edit My Project
          </Button>
        )}
      </Fragment>
    ) : (
      <Button onClick={showProjects} bg="primary" mr={2}>
        View Projects
      </Button>
    )}
    {role === 'admin' && (
      <Link to="/admin/projects">
        <Button bg="important" mr={2}>
          Admin
        </Button>
      </Link>
    )}
    <LogoutButton onLogout={doLogout} />
  </Base>
)

export default ProjectsHeader
