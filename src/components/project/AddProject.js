import { Box, Container, Field, Button, Heading } from '@hackclub/design-system'
import axios from 'axios'
import * as yup from 'yup'
import { Formik } from 'formik'
import React from 'react'

import Submit from './../Submit'

const Form = Box.withComponent('form')

const AddProject = props => (
  <Container maxWidth={32} align="center" p={4} w={1} {...props}>
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
          const uploadProjectRequest = await axios({
            method: 'post',
            url: 'https://api.hackchicago.io/v1/projects',
            data: {
              link: values.link
            },
            withCredentials: true
          })
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
        <Form color="black" onSubmit={handleSubmit}>
          <Heading.h2 mb={3}>Submit your project</Heading.h2>
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
            value="Post"
          />
        </Form>
      )}
    />
  </Container>
)

export default AddProject
