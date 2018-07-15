import React, { Component } from 'react'
import { Container, Field, Button } from '@hackclub/design-system'
import { Formik } from 'formik'
import axios from 'axios'

import Submit from './Submit'

const AddProject = props => (
  <Container p={4} maxWidth={32} {...props}>
    <Formik
      initialValues={{
        name: '',
        link: '',
        tagline: '',
        description: ''
      }}
      validate={values => {
        let errors = {}
        if (!values.name) {
          errors.name = 'Required'
        }
        if (!values.link) {
          errors.link = 'Required'
        }
        if (!values.tagline) {
          errors.tagline = 'Required'
        }
        if (!values.description) {
          errors.description = 'Required'
        }
        return errors
      }}
      onSubmit={async (values, { setSubmitting, setErrors }) => {
        try {
          const uploadProjectRequest = await axios({
            method: 'post',
            url: 'https://api.hackchicago.io/v1/projects',
            data: {
              name: values.name,
              link: values.link,
              tagline: values.tagline,
              description: values.description
            },
            withCredentials: true
          })
          console.log(uploadProjectRequest)
          if (uploadProjectRequest.status === 200) {
            props.onEnd()
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
            placeholder="A Fantastical Project"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.name}
            error={errors.name}
            label="Project Name"
          />
          <Field
            type="url"
            name="link"
            placeholder="https://www.example.com"
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
          <Button onClick={props.onEnd} bg="accent" inverted={true} m={2}>
            Cancel
          </Button>
        </form>
      )}
    />
  </Container>
)

export default AddProject
