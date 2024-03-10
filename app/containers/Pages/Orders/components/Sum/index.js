import React, { useState } from 'react'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { styles } from './sum-jss';
import { useHistory } from 'react-router-dom';

const nf = new Intl.NumberFormat('ru-Ru', {
  style: 'currency',
  currency: 'RUB',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
});

const menuItems = [
  'Просмотр',
  'Другая тональность',
  'История заказа',
  'Скачать',
  'Скачать чек',
];

const Sum = (props) => {
  const {
    data,
    classes,
  } = props;

  const [anchorEl, setAnchorEl] = useState(null);

  const history = useHistory();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (item) => {
    return () => {

      switch (item) {
        case menuItems[0]:
          history.push(`/shop/orders/`)
          break;
        case menuItems[1]:
          history.push(`/shop/bot/${data.id}/2`);
          break;
        case menuItems[2]:
          history.push(`/shop/order/${data.id}`);
          break;
        case menuItems[3]:
          
          break;
        case menuItems[4]:
          
          break;
        default:
          break;
      }
      
      handleClose();
    };
  };

  const getPriceValue = () => {
    return nf.format(data.amount);
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        maxWidth: 190,
      }}
    >
      {getPriceValue()}

      <MoreVertIcon onClick={handleClick} />

      <Menu
        anchorEl={anchorEl}
        open={anchorEl}
        onClose={handleClose}
        PaperProps={{
          className: classes.menu
        }}
      >
        {menuItems.map((menuItem, menuItemIndex) => (
          <MenuItem
            key={menuItem}
            onClick={handleMenuItemClick(menuItem)}
            className={`${classes.menuItem} ${menuItemIndex % 2 ? null : classes.primary}`}
          >
            {menuItem}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default withStyles(styles)(Sum);
