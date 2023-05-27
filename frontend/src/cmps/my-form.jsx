import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Button, TextField } from '@mui/material';

const SignupSchema = Yup.object().shape({
  username: Yup.string().min(2, 'Too Short!').max(15, 'Too Long!').required('Required'),
  password: Yup.string().min(2, 'Too Short!').max(20, 'Too Long!').required('Required'),
});

function CustomInput(props) {
  return <TextField id="outlined-basic" variant="outlined" {...props} />;
}

export function MyForm({ onChange, credentials, onSubmit, isSignupState, onToggleSignupState }) {
  const { username, password, fullname } = credentials;
  return (
    <div>
      <Formik initialValues={credentials} validationSchema={SignupSchema} onSubmit={onSubmit}>
        {({ errors, touched, dirty }) => (
          <Form className="formik">
            <Field as={CustomInput} name="username" label="Username" onChange={onChange} value={username} />
            {errors.username && touched.username && <div>{errors.username}</div>}
            <Field as={CustomInput} name="password" label="Password" onChange={onChange} value={password} type="password" />
            {errors.password && touched.password ? <div>{errors.password}</div> : null}
            {isSignupState && <Field as={CustomInput} name="fullname" value={fullname} onChange={onChange} label="Full Name" type="text" />}

            <Button variant="outlined" type="submit">
              {isSignupState ? 'Signup' : 'Login'}
            </Button>

            <div className="btns">
              <a href="#" onClick={onToggleSignupState}>
                {isSignupState ? 'Already a member? Login' : 'New user? Signup here'}
              </a>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
