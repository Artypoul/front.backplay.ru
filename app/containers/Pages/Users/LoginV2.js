import React from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Hidden from '@material-ui/core/Hidden';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import brand from 'dan-api/dummy/brand';
import { LoginFormV2 } from 'dan-components';
import styles from 'dan-components/Forms/user-jss';

import PropTypes from 'prop-types';
import { userInit } from '../../../redux/actions/user';
import { HOME } from '../../../utils/routes';
import { LoginRequest, SendPasswordRequest } from './api';

function LoginV2(props) {
  const history = useHistory()
  
  const dispatch = useDispatch()

  const submitForm = async (values) => {
    const {
      message,
      user,
    } = await LoginRequest(values)

    if (user) {
      dispatch(userInit(user));
      history.push(HOME);
    }

    return message;
  };

  const title = brand.name;
  const description = brand.desc;
  const { classes } = props;
  return (
    <div className={classes.rootFull}>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
      </Helmet>
      <div className={classes.containerSide}>
        <Hidden smDown>
          <div className={classes.opening}>
            <Typography variant="h3" component="h1" className={classes.opening} gutterBottom>Добро пожаловать в магазин мультитреков</Typography>
            <Typography variant="h6" component="p" className={classes.subpening}>Авторизуйтесь пожалуйста</Typography>
          </div>
        </Hidden>
        <div className={classes.sideFormWrap}>
          <LoginFormV2
            formAction={submitForm}
            sendPassword={SendPasswordRequest}
          />
        </div>
      </div>
    </div>
  );
}

LoginV2.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoginV2);
