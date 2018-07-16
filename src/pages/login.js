import { Box, Heading } from '@hackclub/design-system'
import React from 'react'

import LoginForm from '../components/LoginForm'
import storage from '../storage'

const Login = ({ history }) => (
  <Box align="center">
    <Heading m={3}>Login</Heading>
    <LoginForm
      onLogin={() => {
        history.push('/projects')
      }}
    />
  </Box>
)

export default Login
