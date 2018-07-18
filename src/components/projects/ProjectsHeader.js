import { Box, Button, Heading } from '@hackclub/design-system'
import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

import LogoutButton from './../LogoutButton'

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
  <Box align="center">
    <Heading m={3}>
      <Link to="/">Projects</Link>
    </Heading>
    {whatIsShowing === 'projects' ? (
      <Fragment>
        {role === 'attendee' && (
          <Fragment>
            {wantToViewProjects ? (
              <Button onClick={addProject} bg="accent" m={2} scale>
                Add Project
              </Button>
            ) : (
              <Button onClick={editProject} bg="accent" m={2}>
                Edit My Project
              </Button>
            )}
          </Fragment>
        )}
      </Fragment>
    ) : (
      <Button onClick={showProjects} bg="accent" m={2}>
        View Projects
      </Button>
    )}
    {role === 'admin' && (
      <Link to="/admin" bg="primary" m={2}>
        Admin
      </Link>
    )}
    <LogoutButton onLogout={doLogout} />
  </Box>
)

export default ProjectsHeader
