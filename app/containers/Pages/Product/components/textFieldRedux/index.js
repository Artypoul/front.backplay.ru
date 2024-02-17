import React from 'react';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';

export const TextFieldRedux = ({ meta: { touched, error }, input, ...rest }) => (
  <Input
    {...rest}
    {...input}
    error={touched && Boolean(error)}
  />
);