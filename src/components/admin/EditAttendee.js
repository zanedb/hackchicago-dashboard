import React, { Component } from 'react'
import { Container, Field, Button, Text } from '@hackclub/design-system'
import axios from 'axios'
import { Formik } from 'formik'

import Submit from './../Submit'
import LoadingBar from './../LoadingBar'

class EditAttendee extends Component {
  render() {
    const { attendee } = this.props
    return (
      <Container maxWidth={32}>
        {attendee !== {} ? (
          <Formik
            initialValues={{
              fname: attendee.fname,
              lname: attendee.lname,
              email: attendee.email,
              phone: attendee.phone,
              gender: attendee.gender,
              state: attendee.state,
              city: attendee.city,
              school: attendee.school,
              grade: attendee.grade,
              ref: attendee.ref,
              internalNotes: attendee.internalNotes,
              shirtSize: attendee.shirtSize,
              dietRestrictions: attendee.dietRestrictions,
              parentName: attendee.parentName,
              parentEmail: attendee.parentEmail,
              parentPhone: attendee.parentPhone
            }}
            validate={values => {
              const allErrors = Object.keys(values).reduce((errors, value) => {
                if (
                  !values[value] &&
                  value !== 'ref' &&
                  value !== 'internalNotes' &&
                  value !== 'dietRestrictions'
                ) {
                  errors[value] = 'Required'
                }
                return errors
              }, {})
              if (
                values.fname === attendee.fname &&
                values.lname === attendee.lname &&
                values.email === attendee.email &&
                values.phone === attendee.phone &&
                values.gender === attendee.gender &&
                values.state === attendee.state &&
                values.city === attendee.city &&
                values.school === attendee.school &&
                values.grade === attendee.grade &&
                values.ref === attendee.ref &&
                values.internalNotes === attendee.internalNotes &&
                values.shirtSize === attendee.shirtSize &&
                values.dietRestrictions === attendee.dietRestrictions &&
                values.parentName === attendee.parentName &&
                values.parentEmail === attendee.parentEmail &&
                values.parentPhone === attendee.parentPhone
              ) {
                allErrors.general = 'Attendee info cannot be the same'
              }
              return allErrors
            }}
            onSubmit={(values, { setSubmitting, setErrors }) => {
              axios
                .put(
                  `https://api.hackchicago.io/v1/attendees/id/${attendee._id}`,
                  {
                    fname: values.fname,
                    lname: values.lname,
                    email: values.email,
                    phone: values.phone,
                    gender: values.gender,
                    state: values.state,
                    city: values.city,
                    school: values.school,
                    grade: values.grade,
                    ref: values.ref,
                    internalNotes: values.internalNotes,
                    shirtSize: values.shirtSize,
                    dietRestrictions: values.dietRestrictions,
                    parentName: values.parentName,
                    parentEmail: values.parentEmail,
                    parentPhone: values.parentPhone
                  },
                  { withCredentials: true }
                )
                .then(res => {
                  this.props.onEnd()
                })
                .catch(error => {
                  setErrors({ general: 'An error occurred' })
                  console.error(error)
                  console.log(error.response)
                })
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
                  name="fname"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.fname}
                  error={errors.fname}
                  label="First Name"
                />
                <Field
                  type="text"
                  name="lname"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.lname}
                  error={errors.lname}
                  label="Last Name"
                />
                <Field
                  type="text"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  error={errors.email}
                  label="Email"
                />
                <Field
                  type="text"
                  name="phone"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.phone}
                  error={errors.phone}
                  label="Phone Number"
                />
                <Field
                  type="text"
                  name="gender"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.gender}
                  error={errors.gender}
                  label="Gender"
                />
                <Field
                  type="text"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  error={errors.email}
                  label="Email"
                />
                <Field
                  type="text"
                  name="state"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.state}
                  error={errors.state}
                  label="State"
                />
                <Field
                  type="text"
                  name="city"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.city}
                  error={errors.city}
                  label="City"
                />
                <Field
                  type="text"
                  name="school"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.school}
                  error={errors.school}
                  label="School"
                />
                <Field
                  type="text"
                  name="grade"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.grade}
                  error={errors.grade}
                  label="Grade"
                />
                <Field
                  type="text"
                  name="ref"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.ref}
                  error={errors.ref}
                  label="Referrer"
                />
                <Field
                  type="textarea"
                  name="internalNotes"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.internalNotes}
                  error={errors.internalNotes}
                  label="Internal Notes"
                />
                <Field
                  type="text"
                  name="shirtSize"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.shirtSize}
                  error={errors.shirtSize}
                  label="Shirt Size"
                />
                <Field
                  type="text"
                  name="dietRestrictions"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.dietRestrictions}
                  error={errors.dietRestrictions}
                  label="Diet Restrictions"
                />
                <Field
                  type="text"
                  name="parentName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.parentName}
                  error={errors.parentName}
                  label="Parent Name"
                />
                <Field
                  type="text"
                  name="parentEmail"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.parentEmail}
                  error={errors.parentEmail}
                  label="Parent Email"
                />
                <Field
                  type="text"
                  name="parentPhone"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.parentPhone}
                  error={errors.parentPhone}
                  label="Parent Phone Number"
                />

                {errors.general && <Text color="error">{errors.general}</Text>}
                <Submit
                  disabled={isSubmitting}
                  bg="accent"
                  m={2}
                  scale={true}
                  value="Submit"
                />
                <Button onClick={this.props.onEnd} bg="muted" m={2}>
                  Cancel
                </Button>
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

export default EditAttendee
