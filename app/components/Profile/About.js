import React, { Fragment } from 'react';
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

function About(props) {
  const { classes, data, title } = props;
  return (
    <div className={classes.background}>
      <div className={classes.wrapper}>
        <div className={classes.inner}>
          <Typography variant="h6" gutterBottom>
            {title}
          </Typography>
          <Grid container spacing={3}>
            {/* {fields.map((field, index) => (
            ))} */}
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="firstName"
                name="firstName"
                label="First name"
                fullWidth
                autoComplete="fname"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="lastName"
                name="lastName"
                label="Last name"
                fullWidth
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="address1"
                name="address1"
                label="Address line 1"
                fullWidth
                autoComplete="billing address-line1"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="city"
                name="city"
                label="City"
                fullWidth
                autoComplete="billing address-level2"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField id="state" name="state" label="State/Province/Region" fullWidth />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="address1"
                name="address1"
                label="Address line 1"
                fullWidth
                autoComplete="billing address-line1"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
                label="Согласен на обработку персональных данных"
              />
            </Grid>
          </Grid>
        </div>

        <Button variant='contained' color='secondary' className={classes.ready}>ГОТОВО</Button>
      </div>
    </div>
  );
}

About.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired
};

export default withStyles(styles)(About);
