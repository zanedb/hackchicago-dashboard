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
  wantToViewProjects,
  editProject,
  addProject,
  showProjects,
  doLogout,
  ...props
}) => (
  <Base mt={4} mb={3} width={1}>
    <Heading.h1 fontSize={[6, 7]} align="left">
      <Link to="/" onClick={showProjects}>
        {whatIsShowing.toLowerCase().includes('projects') && 'Projects'}
        {whatIsShowing.toLowerCase().includes('admin') && 'Admin'}
      </Link>
    </Heading.h1>
    {whatIsShowing.toLowerCase().includes('projects') ? (
      <Fragment>
        {wantToViewProjects ? (
          <Button onClick={addProject} bg="accent" mr={2} scale>
            Add Project
          </Button>
        ) : (
          <Button onClick={editProject} bg="accent" mr={2}>
            Edit My Project
          </Button>
        )}
      </Fragment>
    ) : (
      <Button onClick={showProjects} bg="accent" mr={2}>
        View Projects
      </Button>
    )}
    {role === 'admin' && (
      <Link to="/admin">
        <Button bg="important" mr={2}>
          Admin
        </Button>
      </Link>
    )}
    <LogoutButton onLogout={doLogout} />
  </Base>
)

export default ProjectsHeader
