import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Button, TextField, Select, MenuItem } from '@mui/material';

const ReviewSchema = Yup.object().shape({
  reviewText: Yup.string().required('Review text is required'),
  rating: Yup.number().required('Rating is required'),
});

export function ReviewForm({ initialValues, onSubmit, onChange }) {
  const { reviewText, rating } = initialValues;

  return (
    <div>
      <Formik initialValues={initialValues} validationSchema={ReviewSchema} onSubmit={onSubmit}>
        {({ errors, touched }) => (
          <Form className="formik" onSubmit={onSubmit}>
            <Field
              as={TextField}
              name="reviewText"
              value={reviewText}
              label="Review"
              multiline
              rows={4}
              variant="outlined"
              fullWidth
              onChange={onChange}
            />
            {errors.reviewText && touched.reviewText && <div>{errors.reviewText}</div>}
            <Field as={Select} name="rating" label="Rating" variant="outlined" fullWidth value={rating} onChange={onChange}>
              <MenuItem value={1}>1 star</MenuItem>
              <MenuItem value={2}>2 stars</MenuItem>
              <MenuItem value={3}>3 stars</MenuItem>
              <MenuItem value={4}>4 stars</MenuItem>
              <MenuItem value={5}>5 stars</MenuItem>
            </Field>
            {errors.rating && touched.rating && <div>{errors.rating}</div>}

            <Button variant="outlined" type="submit">
              Submit Review
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
