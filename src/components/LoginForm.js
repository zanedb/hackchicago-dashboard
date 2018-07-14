import React, { Component } from 'react'
import { Formik } from 'formik'
import axios from 'axios'
import axiosCookieJarSupport from 'node-axios-cookiejar'
import tough from 'tough-cookie'
import { Text, Field, Button, Container } from '@hackclub/design-system'

axiosCookieJarSupport(axios)
const cookieJar = new tough.CookieJar()

class LoginForm extends Component {
  state = {
    loginCodeSent: false
  }

  render() {
    const { loginCodeSent } = this.state
    return (
      <Container maxWidth={32}>
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
            return errors
          }}
          onSubmit={(values, { setSubmitting, setErrors }) => {
            if (values.token === '') {
              axios({
                method: 'post',
                url: 'https://api.hackchicago.io/auth',
                data: {
                  email: values.email
                },
                jar: cookieJar,
                withCredentials: true
              })
                .then(res => {
                  console.log(res)
                  setSubmitting(false)
                  this.setState({
                    loginCodeSent: true
                  })
                })
                .catch(error => {
                  if (error.response.status === 401) {
                    setErrors({ token: 'Invalid email address' })
                  } else {
                    setErrors({ token: 'An error occurred' })
                  }
                })
            } else {
              axios({
                method: 'post',
                url: 'https://api.hackchicago.io/auth',
                data: {
                  email: values.email,
                  token: values.token
                },
                jar: cookieJar,
                withCredentials: true
              })
                .then(res => {
                  console.log(res)
                  setSubmitting(true)
                  if (res.data.message === 'Authenticated!') {
                    this.props.onLogin()
                  }
                })
                .catch(error => {
                  console.log(error.response)
                  setSubmitting(false)
                  if (error.response.status === 401) {
                    setErrors({ token: 'Invalid email or token' })
                  } else {
                    setErrors({ token: 'An error occurred' })
                  }
                })
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
                    type="token"
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
              <Button type="submit" disabled={isSubmitting} bg="accent">
                Submit
              </Button>
            </form>
          )}
        />
      </Container>
    )
  }
}

export default LoginForm
