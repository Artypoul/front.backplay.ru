import React from 'react';
import TextField from '@material-ui/core/TextField';

export const TextFieldRedux = ({ meta: { touched, error }, input, ...rest }) => (
  <TextField
    {...rest}
    {...input}
    error={touched && Boolean(error)}
  />
);