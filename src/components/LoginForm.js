import React, { Component, Fragment } from 'react'
import { Container, Field, Text } from '@hackclub/design-system'
import axios from 'axios'
import { Formik } from 'formik'
import axiosCookieJarSupport from 'node-axios-cookiejar'
import tough from 'tough-cookie'

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
                setErrors({ email: 'Invalid email address' })
              } else {
                setErrors({ email: 'An error occurred' })
              }
            } catch (error) {
              setErrors({ token: 'Could not authenticate' })
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
              setSubmitting(false)
              setErrors({
                token: 'Authentication failed, are the email + token correct?'
              })
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
              <Fragment>
                <Text f={3} color="primary" mb={3} bold>
                  Check your email for your token!
                </Text>
                <Field
                  type="text"
                  name="token"
                  placeholder="012345"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.token}
                  error={errors.token}
                  label="Token"
                />
              </Fragment>
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
              value="Sign in"
              bg="accent"
              scale
              mt={3}
            />
          </form>
        )}
      />
    )
  }
}

export default LoginForm
