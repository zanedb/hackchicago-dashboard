import React, { Component } from 'react'
import { Formik } from 'formik'
import axios from 'axios'
import { Text } from '@hackclub/design-system'

class LoginForm extends Component {
  state = {
    status: this.props.status
  }

  render() {
    const { status } = this.state
    return (
      <div>
        {status === '' ? (
          <Formik
            initialValues={{
              email: ''
            }}
            validate={values => {
              // same as above, but feel free to move this into a class method now.
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
            onSubmit={(
              values,
              { setSubmitting, setErrors /* setValues and other goodies */ }
            ) => {
              axios({
                method: 'post',
                url: 'http://localhost:8080/v1/auth/sendtoken',
                data: `user=${values.email}`
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
                      status: 'This email is not signed up.'
                    })
                  } else {
                    this.setState({
                      status: error.response.statusText
                    })
                  }
                })
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
