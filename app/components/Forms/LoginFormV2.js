import React, { useState } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';

import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import ArrowForward from '@material-ui/icons/ArrowForward';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import classNames from 'classnames';
import brand from 'dan-api/dummy/brand';
import { Notification } from 'dan-components';
import logo from 'dan-images/logo.svg';
import PropTypes from 'prop-types';
import { TextFieldRedux } from './ReduxFormMUI';
import styles from './user-jss';

// validation functions
const required = value => (value === null ? 'Required' : undefined);
const email = value => (
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email'
    : undefined
);

function LoginFormV2(props) {
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  const handleClickShowPassword = () => {
    setShowPassword(show => !show);
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  const submitHandler = async (values) => {
    const {
      email,
      password,
    } = values;

    if (!password) {
      const {
        isSuccess,
        message,
      } = await sendPassword(email)

      setMessage(message);

      if (isSuccess) {
        setShowPasswordForm(true);
      }
      
      return;
    }

    const message = await formAction(values);
    if (message) {
      setMessage(message);
    }
  };

  const {
    classes,
    handleSubmit,
    pristine,
    submitting,
    deco,
    formAction,
    sendPassword,
  } = props;

  const getFormContent = () => {
    if (!showPasswordForm) {
      return (
        <div >
          <FormControl className={ classes.formControl }>
            <Field
              name="email"
              component={ TextFieldRedux }
              placeholder="Ваш Email"
              label="Ваш Email"
              required
              validate={ [required, email] }
              className={ classes.field }
            />
          </FormControl>
        </div >
      );
    }

    return (
      <div>
        <FormControl className={ classes.formControl }>
          <Field
            name="password"
            component={ TextFieldRedux }
            type={ showPassword ? 'text' : 'password' }
            label="Ваш пароль"
            InputProps={ {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="Toggle password visibility"
                    onClick={ handleClickShowPassword }
                    onMouseDown={ handleMouseDownPassword }
                  >
                    { showPassword ? <VisibilityOff /> : <Visibility /> }
                  </IconButton>
                </InputAdornment>
              )
            } }
            required
            validate={ required }
            className={ classes.field }
          />
        </FormControl>
      </div>
    );
  };

  return (
    <Paper className={ classNames(classes.sideWrap, deco && classes.petal) }>
      <Notification message={message} close={setMessage} />
      <div className={ classes.topBar }>
        <div className={ classes.brand }>
          <img src={ logo } alt={ brand.name } />
          { brand.name }
        </div>
      </div>

      <div className={ classes.wrapper }>
        <div>
          <Typography variant="h4" className={ classes.title } gutterBottom>
            Вход/регистрация
          </Typography>
          <Typography variant="caption" className={ classes.subtitle } gutterBottom align="center">
            Введите адрес электронной почты
          </Typography>

          <section className={ classes.pageFormSideWrap }>
            <form onSubmit={ handleSubmit(submitHandler) }>
              { getFormContent() }

              <div className={ classes.btnArea }>
                <Button variant="contained" fullWidth color="primary" size="large" type="submit" disabled={submitting || pristine}>
                  ДАЛЕЕ
                  <ArrowForward className={ classNames(classes.rightIcon, classes.iconSmall) }  />
                </Button>
              </div>
            </form>
          </section>
        </div>
      </div>
    </Paper>
  );
}

LoginFormV2.propTypes = {
  classes: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  deco: PropTypes.bool.isRequired,
};

const LoginFormReduxed = reduxForm({
  form: 'loginForm2',
  enableReinitialize: true,
})(LoginFormV2);

const FormInit = connect(
  state => ({
    force: state,
    initialValues: state.login.usersLogin,
    deco: state.ui.decoration
  }),
)(LoginFormReduxed);

export default withStyles(styles)(FormInit);
