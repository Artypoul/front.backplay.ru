import React from 'react';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import NumberFormat from 'react-number-format';
import { withStyles } from '@material-ui/core/styles';
import { styles } from '../../product-jss';

const NumberFormatInput = (props) => {
  const {
    inputRef,
    onChange,
    ...other
  } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => onChange(values.value)}
      thousandSeparator
      isNumericString
    />
  );
};

const PriceFieldRedux = (props) => {
  const {
    meta: {
      touched,
      error
    },
    input,
    classes,
    ...rest
  } = props;

  return (
    <TextField
      {...rest}
      {...input}
      variant='outlined'
      style={{
        width: '100%',
      }}
      InputProps={{
        className: classes.vartiantInput,
        inputComponent: NumberFormatInput,
        endAdornment: 'руб.',
      }}
      error={touched && Boolean(error)}
    />
  );
};

export default withStyles(styles)(PriceFieldRedux);
