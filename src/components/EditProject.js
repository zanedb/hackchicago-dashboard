import { Container, Field, Button } from '@hackclub/design-system'
import React, { Component } from 'react'
import axios from 'axios'
import { Formik } from 'formik'

import Submit from './Submit'

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
      <Container p={4} maxWidth={32}>
        <Formik
          initialValues={{
            name: project.name,
            link: project.link,
            tagline: project.tagline,
            description: project.description
          }}
          validate={values => {
            const allErrors = Object.keys(values).reduce((errors, value) => {
              if (!values[value]) {
                errors[value] = 'Required'
              }
              return errors
            }, {})
            return allErrors
          }}
          onSubmit={async (values, { setSubmitting, setErrors }) => {
            try {
              const updateProjectRequest = await axios({
                method: 'put',
                url: `https://api.hackchicago.io/v1/projects/${project.id}`,
                data: {
                  link: values.link,
                  tagline: values.tagline,
                  description: values.description
                },
                withCredentials: true
              })
              console.log(updateProjectRequest)
              if (updateProjectRequest.status === 200) {
                this.props.onEnd()
              }
            } catch (error) {
              setErrors({ name: 'An error occurred' })
            }
          }}
          render={({
            values,
            errors,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting
          }) => (
            <form onSubmit={handleSubmit}>
              <Field
                type="text"
                name="name"
                disabled={true}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                error={errors.name}
                label="Project Name"
              />
              <Field
                type="url"
                name="link"
                placeholder="Link to a working demo, GitHub repository, etc."
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.link}
                error={errors.link}
                label="Project URL"
              />
              <Field
                type="text"
                name="tagline"
                placeholder="Write a brief description of your project here"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.tagline}
                error={errors.tagline}
                label="Tagline"
              />
              <Field
                type="textarea"
                name="description"
                placeholder="Write an extended description of your project here (markdown supported!)"
                rows={10}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.description}
                error={errors.description}
                label="Description"
              />
              <Submit
                disabled={isSubmitting}
                bg="accent"
                m={2}
                scale={true}
                value="Submit"
              />
              <Button
                onClick={this.props.onEnd}
                bg="accent"
                inverted={true}
                m={2}
              >
                Cancel
              </Button>
            </form>
          )}
        />
      </Container>
    )
  }
}

export default EditProject
