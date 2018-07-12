import React, { Component } from 'react'
import { Formik } from 'formik'
import axios from 'axios'
import { Text } from '@hackclub/design-system'

class LoginForm extends Component {
  state = {
    status: this.props.status,
    loginCodeSent: false
  }

  render() {
    const { status, loginCodeSent } = this.state
    return (
      <div>
        {status === '' ? (
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
                  url: 'http://localhost:8080/auth',
                  data: {
                    email: values.email
                  }
                })
                  .then(res => {
                    setSubmitting(false)
                    this.setState({
                      loginCodeSent: true
                    })
                  })
                  .catch(error => {
                    if (error.response.status === 401) {
                      this.setState({
                        status: 'This email is not signed up.'
                      })
                    } else {
                      this.setState({
                        status: error.response.statusText
                      })
                    }
                  })
              } else {
                axios({
                  method: 'post',
                  url: 'http://localhost:8080/auth',
                  data: {
                    email: values.email,
                    token: values.token
                  }
                })
                  .then(res => {
                    console.log(res)
                    setSubmitting(true)
                    this.setState({
                      status: res.data.message
                    })
                  })
                  .catch(error => {
                    console.log(error.response)
                    if (error.response.status === 401) {
                      this.setState({
                        status: 'Error authenticating, either the email or token is invalid.'
                      })
                    } else {
                      this.setState({
                        status: error.response.statusText
                      })
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
                <input
                  type="email"
                  name="email"
                  placeholder="youremail@gmail.com"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
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
                  </div>
                ) : (
                  <div />
                )}
                {touched.email && errors.email && <div>{errors.email}</div>}
                <button type="submit" disabled={isSubmitting}>
                  Submit
                </button>
              </form>
            )}
          />
        ) : (
          <Text f={3} color="accent" py={4} align="center" bold>
            {status}
          </Text>
        )}
      </div>
    )
  }
}

export default LoginForm
