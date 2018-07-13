import React, { Component } from 'react'
import { Formik } from 'formik'
import axios from 'axios'
import axiosCookieJarSupport from 'node-axios-cookiejar'
import tough from 'tough-cookie'
import { Text } from '@hackclub/design-system'

axiosCookieJarSupport(axios)
const cookieJar = new tough.CookieJar()

class LoginForm extends Component {
  state = {
    loginCodeSent: false
  }

  render() {
    const { loginCodeSent } = this.state
    return (
      <div>
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
                    setErrors({ token: 'Invalid token' })
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
                  <input
                    type="token"
                    name="token"
                    placeholder="000000"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.token}
                  />
                  {touched.token && errors.token && <div>{errors.token}</div>}
                </div>
              ) : (
                <input
                  type="email"
                  name="email"
                  placeholder="youremail@gmail.com"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
              )}
              {touched.email && errors.email && <div>{errors.email}</div>}
              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </form>
          )}
        />
      </div>
    )
  }
}

export default LoginForm
