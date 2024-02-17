import React, { Fragment, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import LocalPhone from '@material-ui/icons/LocalPhone';
import DateRange from '@material-ui/icons/DateRange';
import LocationOn from '@material-ui/icons/LocationOn';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Divider from '@material-ui/core/Divider';
import Chip from '@material-ui/core/Chip';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import Check from '@material-ui/icons/Check';
import AcUnit from '@material-ui/icons/AcUnit';
import Adb from '@material-ui/icons/Adb';
import AllInclusive from '@material-ui/icons/AllInclusive';
import AssistantPhoto from '@material-ui/icons/AssistantPhoto';
import imgData from 'dan-api/images/imgData';
import Type from 'dan-styles/Typography.scss';
import Timeline from '../SocialMedia/Timeline';
import PapperBlock from '../PapperBlock/PapperBlock';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import styles from './profile-jss';
import { reduxForm, Field, } from 'redux-form';
import { connect, useDispatch, useSelector } from 'react-redux';
import { TextFieldRedux } from './textFieldRedux';
import { UpdateUserHandler } from './api';
import { userInit } from '../../redux/actions/user';
import { aboutInit } from '../../redux/actions/about';

function About(props) {
  const {
    classes,
    data,
    title,
    handleSubmit,
    pristine,
    submitting,
  } = props;

  const dispatch = useDispatch();

  const {
    user,
  } = useSelector(state => state.user);

  const onSubmitHandler = async (values) => {
    const result = await UpdateUserHandler(user.id, values);
    if (result.user) {
      dispatch(userInit(result.user));
    }
  };

  useEffect(() => {
    const data = {
      first_name: user.first_name,
      last_name: user.last_name,
      address: user.address,
      phone: user.phone,
      seller_name: user.seller_name,
      brand_name: user.brand_name,
    };

    dispatch(aboutInit(data));
  }, []);

  return (
    <div className={classes.background}>
      <form className={classes.wrapper} onSubmit={handleSubmit(onSubmitHandler)}>
        <div className={classes.inner}>
          <Typography variant="h6" gutterBottom>
            {title}
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Field
                name='last_name'
                component={TextFieldRedux}
                type='text'
                label='Фамилия'
                placeholder='Фамилия'
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Field
                name='first_name'
                component={TextFieldRedux}
                type='text'
                label='Имя'
                placeholder='Имя'
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                name='address'
                component={TextFieldRedux}
                type='text'
                label='Адрес'
                placeholder='Адрес'
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Field
                name={user.role.id === 2 ? 'seller_name' : 'brand_name'}
                component={TextFieldRedux}
                type='text'
                label='Название коллектива'
                placeholder='Название коллектива'
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Field
                name='phone'
                component={TextFieldRedux}
                type='text'
                label='Телефон'
                placeholder='Телефон'
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox required color="secondary" name="saveAddress" value="yes" />}
                label="Согласен на обработку персональных данных"
              />
            </Grid>
          </Grid>
        </div>

        <Button
          type='submit'
          variant='contained'
          color='secondary'
          className={classes.ready}
          disabled={submitting}
        >
          ГОТОВО
        </Button>
      </form>
    </div>
  );
}

About.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired
};

const AboutReduxForm = reduxForm({
  form: 'about',
  enableReinitialize: true,
})(About);

const AboutInit = connect(
  state => ({
    initialValues: state.about.userData,
  })
)(AboutReduxForm);

export default withStyles(styles)(AboutInit);
