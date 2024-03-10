import React, { Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { reduxForm, Field, } from 'redux-form';
import { TextFieldRedux } from './textFieldRedux';
import { useSelector } from 'react-redux';

function AddressForm(props) {
  const {
    title,
    fields,
  } = props;

  const {
    user,
  } = useSelector(state => state.user);

  return (
    <Fragment>
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
    </Fragment>
  );
}

export default AddressForm;
