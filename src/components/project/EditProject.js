import React, { Component } from 'react'
import { Box, Container, Field, Button, Heading } from '@hackclub/design-system'
import axios from 'axios'
import * as yup from 'yup'
import { Formik } from 'formik'

import Submit from './../Submit'
import LoadingBar from './../LoadingBar'

class EditProject extends Component {
  state = {
    project: {}
  }

  async componentDidMount() {
    try {
      const getProject = await axios({
        method: 'get',
        url: 'https://api.hackchicago.io/v1/me',
        withCredentials: true
      })
      if (getProject.status === 200 && getProject.data.project !== undefined) {
        this.setState({
          project: getProject.data.project
        })
      }
    } catch (error) {
      console.error(error)
    }
  }

  render() {
    const { project } = this.state
    return (
      <Container maxWidth={32} color="black" align="center" p={4} w={1}>
        {project.name !== undefined ? (
          <Formik
            initialValues={{
              link: ''
            }}
            validationSchema={yup.object().shape({
              url: yup
                .string()
                .url()
                .matches(/devpost\.com\/software/, 'must be a devpost.com link')
            })}
            onSubmit={async (values, { setSubmitting, setErrors }) => {
              try {
                const updateProjectRequest = await axios({
                  method: 'put',
                  url: `https://api.hackchicago.io/v1/projects/${project.id}`,
                  data: {
                    name: values.name,
                    link: values.link,
                    tagline: values.tagline,
                    description: values.description
                  },
                  withCredentials: true
                })
                if (updateProjectRequest.status === 200) {
                  this.props.onEnd()
                }
              } catch (error) {
                setErrors({ general: 'An error occurred' })
              }
            }}
            render={({
              values,
              errors,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              props
            }) => (
              <form onSubmit={handleSubmit}>
                <Heading.h2 mb={3}>Edit your project</Heading.h2>
                <Field
                  type="url"
                  name="link"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.link}
                  error={errors.link}
                  label="Devpost URL"
                  mb={4}
                />
                <Button onClick={props.onEnd} bg="muted" inverted scale mr={2}>
                  Cancel
                </Button>
                <Submit
                  disabled={isSubmitting}
                  bg="primary"
                  ml={2}
                  scale
                  value="Save"
                />
              </form>
            )}
          />
        ) : (
          <LoadingBar />
        )}
      </Container>
    )
  }
}

export default EditProject
