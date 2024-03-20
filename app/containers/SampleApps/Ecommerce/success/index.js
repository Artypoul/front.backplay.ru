import React from 'react'
import { alpha, withStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { HOME, ORDERS } from '../../../../utils/routes';

const styles = (theme, opacity) => ({
  open: {
    display: 'flex',
  },
  background: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    position: 'fixed',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    zIndex: 9999,
    overflow: 'hidden',

    textAlign: 'center',
    background: 'linear-gradient(-45deg, #2196F3 0%, #2196F3 33%, #00BFA5 100%)',
  },
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: '1 1 auto',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },
  title: {
    fontSize: 48,
    fontWeight: 400,
    lineHeight: '56px',
    color: '#fff',
    margin: 0,
  },
  button: {
    fontSize: 24,
    fontWeight: 600,
    lineHeight: '29px',
    cursor: 'pointer',
    color: '#fff',
  },
  bottom: {
    display: 'flex',
    alignItems: 'center',
    gap: 48,
    justifyContent: 'flex-start',
    padding: '12px 68px',
    backgroundColor: '#fff',

    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      gap: 24,
    },
  },
  navigate: {
    fontSize: 14,
    fontWeight: 600,
    cursor: 'pointer',
  },
  orders: {
    padding: '8px 16px',
    cursor: 'pointer',
    backgroundColor: '#27AE60',
    fontSize: 14,
    fontWeight: 600,
    borderRadius: 18,
    color: '#fff',
  },
});

const Success = (props) => {
  const {
    isOpen,
    orderId,
    classes,
  } = props;

  const history = useHistory();

  const homeHandler = () => {
    history.push(HOME);
  };

  const ordersHandler = () => {
    history.push(ORDERS);
  };

  return (
    <div className={`${classes.background} ${isOpen && classes.open}`}>
      <div className={classes.wrapper}>
        <div className={classes.content}>
          <h1 className={classes.title}>Ваш заказ успешно оформлен</h1>
          <span className={classes.button} onClick={homeHandler}>Перейти на главную</span>
        </div>
      </div>

      <div className={classes.bottom}>
        <span className={classes.navigate}>Перейти к заказам</span>
        <span className={classes.orders} onClick={ordersHandler}>Заказы</span>
      </div>
    </div>
  );
};

export default withStyles(styles)(Success);
