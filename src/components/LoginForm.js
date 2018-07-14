import React, { Component } from 'react'
import { Formik } from 'formik'
import axios from 'axios'
import axiosCookieJarSupport from 'node-axios-cookiejar'
import tough from 'tough-cookie'
import { Text, Field, Button, Container } from '@hackclub/design-system'

import Submit from './Submit'

axiosCookieJarSupport(axios)
const cookieJar = new tough.CookieJar()

class LoginForm extends Component {
  state = {
    loginCodeSent: false
  }

  render() {
    const { loginCodeSent } = this.state
    return (
      <Container p={4} maxWidth={32}>
        <Formik
          initialValues={{
            email: '',
            token: ''
          }}
          validate={values => {
            let errors = {}
            if (!values.email) {
              errors.email = 'Required'
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
            ) {
              errors.email = 'Invalid email address'
            }
            if (!values.token && this.state.loginCodeSent) {
              errors.token = 'Required'
            } else if (values.token.length !== 6 && this.state.loginCodeSent) {
              errors.token = 'Must be 6 characters'
            } else if (
              values.token.match(/^[0-9]+$/) == null &&
              this.state.loginCodeSent
            ) {
              errors.token = 'Numbers only'
            }
            return errors
          }}
          onSubmit={async (values, { setSubmitting, setErrors }) => {
            if (values.token === '') {
              try {
                const generateTokenRequest = await axios({
                  method: 'post',
                  url: 'https://api.hackchicago.io/auth',
                  data: {
                    email: values.email
                  },
                  jar: cookieJar,
                  withCredentials: true
                })
                if (generateTokenRequest.status === 200) {
                  setSubmitting(false)
                  this.setState({
                    loginCodeSent: true
                  })
                } else if (generateTokenRequest.status === 401) {
                  setErrors({ token: 'Invalid email address' })
                } else {
                  setErrors({ token: 'An error occurred' })
                }
              } catch (error) {
                console.log(error)
              }
            } else {
              try {
                const loginWithTokenRequest = await axios({
                  method: 'post',
                  url: 'https://api.hackchicago.io/auth',
                  data: {
                    email: values.email,
                    token: values.token
                  },
                  jar: cookieJar,
                  withCredentials: true
                })
                if (loginWithTokenRequest.status === 200) {
                  setSubmitting(true)
                  if (loginWithTokenRequest.data.message === 'Authenticated!') {
                    this.props.onLogin()
                  }
                } else {
                  setSubmitting(false)
                  if (loginWithTokenRequest.status === 401) {
                    setErrors({ token: 'Invalid email or token' })
                  } else {
                    setErrors({ token: 'An error occurred' })
                  }
                }
              } catch (error) {
                console.log(error)
              }
            }
          }}
          render={({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting
          }) => (
            <form onSubmit={handleSubmit}>
              {loginCodeSent === true ? (
                <div>
                  <Text f={3} color="accent" py={4} bold>
                    Please check your email, and enter the token.
                  </Text>
                  <Field
                    type="text"
                    name="token"
                    placeholder="000000"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.token}
                    error={errors.token}
                    label="Token"
                  />
                </div>
              ) : (
                <Field
                  type="email"
                  name="email"
                  placeholder="youremail@gmail.com"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  label="Email"
                  error={errors.email}
                />
              )}
              <Submit
                onClick={this.handleSubmit}
                disabled={isSubmitting}
                bg="accent"
                scale={true}
                value="Submit"
              />
            </form>
          )}
        />
      </Container>
    )
  }
}

export default LoginForm
