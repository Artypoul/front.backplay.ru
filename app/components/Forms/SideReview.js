import React, { Fragment } from 'react';
import { lighten, darken } from '@material-ui/core/styles/colorManipulator';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Type from 'dan-styles/Typography.scss';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import imgApi from 'dan-api/images/photos';
import { formatCurrency } from '../../utils/formatCurrency';

// const dataCart = [
//   {
//     name: 'Product 1',
//     thumb: imgApi[21],
//     price: 9.99,
//     quantity: 1
//   },
//   {
//     name: 'Product 1',
//     thumb: imgApi[22],
//     price: 2.34,
//     quantity: 1
//   },
//   {
//     name: 'Product 1',
//     thumb: imgApi[23],
//     price: 10.00,
//     quantity: 2
//   },
//   {
//     name: 'Product 1',
//     thumb: imgApi[24],
//     price: 7.99,
//     quantity: 3
//   },
// ];

const styles = theme => ({
  listItem: {
    padding: `${theme.spacing(1)}px 0`,
    gap: 16,
    alignItems: 'flex-start',
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
    },
  },
  total: {
    fontWeight: '700',
  },
  title: {
    marginTop: theme.spacing(2),
  },
  orderSummary: {
    [theme.breakpoints.up('md')]: {
      width: 600,
      margin: '0 auto'
    },
  },
  paper: {
    background: theme.palette.type === 'dark' ? darken(theme.palette.secondary.main, 0.5) : lighten(theme.palette.secondary.light, 0.5),
    padding: theme.spacing(2),
    overflow: 'auto',
    '& h6': {
      textAlign: 'center',
    }
  },
  thumb: {
    overflow: 'hidden',
    borderRadius: theme.rounded.small,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    objectFit: 'cover',
    maxWidth: 120,
    [theme.breakpoints.down('sm')]: {
      maxWidth: '100%',
    },
    '& img': {
      maxWidth: '100%',
      aspectRatio: '5 / 3',
    }
  },
  totalPrice: {
    '& h6': {
      textAlign: 'right',
      width: '100%',
      '& span': {
        color: theme.palette.primary.main,
        fontSize: 28
      }
    },
  },
});

function SideReview(props) {
  const {
    classes,
    items,
    totalPrice,
  } = props;

  const getCartItem = dataArray => dataArray.map((item, index) => (
    <Fragment key={index.toString()}>
      <ListItem className={classes.listItem}>
        <figure className={classes.thumb}>
          <img src={item.img} alt="thumb" />
        </figure>
        <ListItemText
          primary={item.name}
          secondary={item.description}
          className={classes.itemText}
          primaryTypographyProps={{
            style: {
              whiteSpace: 'pre-wrap',
              wordWrap: 'break-word',
            }
          }}
          secondaryTypographyProps={{
            style: {
              whiteSpace: 'pre-wrap',
              wordWrap: 'break-word',
            }
          }}
        />
      </ListItem>
      <li>
        <Divider />
      </li>
    </Fragment>
  ));

  return (
    <Paper className={classes.paper} elevation={0}>
      <Typography variant="h6" gutterBottom>
        <ShoppingCart />
        &nbsp; Краткое описание заказа
      </Typography>
      <List component="ul">
        {getCartItem(items)}

        <ListItem className={classes.totalPrice}>
          <Typography variant="h6">
            Общая стоимость : &nbsp;
            <span>
              <strong className={Type.bold}>{formatCurrency(totalPrice)}</strong>
            </span>
          </Typography>
        </ListItem>
      </List>
    </Paper>
  );
}

SideReview.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SideReview);
