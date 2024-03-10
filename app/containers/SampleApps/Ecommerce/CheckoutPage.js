import React, { useState, Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {
  AddressForm,
  PaymentForm,
  Review,
  SideReview
} from 'dan-components';
import About from '../../../components/Profile/About';
import { reduxForm, Field, } from 'redux-form';
import { connect, useDispatch, useSelector } from 'react-redux';
import { aboutInit } from '../../../redux/actions/about';
import { UpdateUserHandler } from './api/updateUserHandler';
import { userInit } from '../../../redux/actions/user';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { GetOrder } from './api/getOrder';
import { PayOrder } from './api/payOrder';

const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(3),
  },
  stepper: {
    padding: `${theme.spacing(3)}px 0 ${theme.spacing(5)}px`,
  },
  finishMessage: {
    textAlign: 'center',
    maxWidth: 600,
    margin: '0 auto',
    '& h4': {
      color: theme.palette.primary.main,
      '& span': {
        textAlign: 'center',
        display: 'block',
        '& i': {
          fontSize: 120
        }
      }
    }
  },
  buttons: {
    display: 'flex',
    justifyContent: 'center',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
});

function Checkout(props) {
  const {
    handleSubmit,
    submitting,
    classes,
    width,
  } = props;

  const [order, setOrder] = useState(null);

  const history = useHistory();

  const {
    user,
  } = useSelector(state => state.user);
  const dispatch = useDispatch();

  const {
    orderId,
  } = useParams();

  const onSubmitHandler = async (values) => {
    const result = await UpdateUserHandler(user.id, values);
    if (result.user) {
      dispatch(userInit(result.user));
    }

    const message = await PayOrder(orderId);
    history.push(`/shop/payment/${orderId}/success`);
  };

  const getOrderHandler = async () => {
    const {
      order,
    } = await GetOrder(orderId);

    if (order) {
      setOrder(order);
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

    getOrderHandler();
  }, []);
  
  const getContent = () => {
    // if (false) {
    //   return (
    //     <div className={classes.finishMessage}>
    //       <Typography variant="h4" gutterBottom>
    //         <span>
    //           <i className="ion-ios-checkmark-outline" />
    //         </span>
    //         Thank you for your order.
    //       </Typography>
    //       <Typography variant="subtitle1">
    //         Your order number is&nbsp;
    //         <strong>#2001539</strong>
    //         .&nbsp;We have emailed your order confirmation, and will
    //         send you an update when your order has shipped.
    //       </Typography>
    //       <Button variant="contained" color="primary" href="/app/pages/ecommerce" className={classes.button}>
    //         Shoping Again
    //       </Button>
    //     </div>
    //   );
    // }

    return (
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={7}>
            <AddressForm
              title='Проверте пожалуйста ваши данные'
            />
          </Grid>
          <Grid item xs={12} md={5}>
            {order && (
              <SideReview
                items={[{
                  name: order.name,
                  // description: `${order.author}, c` 'PLAYBACK PRO, с басом - 800р. ориг. тональльность без барабанов',
                  description: `${order.author}, c басом - ${order.amount}р. ориг. тональльность без барабанов`,
                  img: 'https://api.backplay.ru/storage/uploads/uySsVGpPPgUG5Mp2aIadWOLUYZ5XQ43eNLdxPVhr.png',
                }]}
                totalPrice={order.amount}
              />
            )}
          </Grid>
        </Grid>
        <div className={classes.buttons}>
          <Button
            type='submit'
            variant="contained"
            color="secondary"
            className={classes.button}
            size="large"
            disabled={submitting}
          >
            ГОТОВО
          </Button>
        </div>
      </form>
    );
  }

  return (
    <Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          {getContent()}
        </Paper>
      </main>
    </Fragment>
  );
}

Checkout.propTypes = {
  classes: PropTypes.object.isRequired,
  width: PropTypes.string.isRequired,
};

const CheckoutRedux = reduxForm({
  form: 'checkout',
  enableReinitialize: true,
})(Checkout);

const CheckoutReduxInit = connect(
  state => ({
    initialValues: state.about.userData,
  })
)(CheckoutRedux);

export default withWidth()(withStyles(styles)(CheckoutReduxInit));
