import React, { useState } from 'react'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { styles } from './sum-jss';
import { useHistory } from 'react-router-dom';
import { BOT, ORDER, PROJECT } from '../../../../../utils/routes';

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
          history.push(`${PROJECT}/${data.project_id}`)
          break;
        case menuItems[1]:
          history.push(`${BOT}/${data.project_id}/2`);
          break;
        case menuItems[2]:
          history.push(`${ORDER}/${data.id}`);
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

  const getMenuItem = (menuItem, menuItemIndex) => {
    if (menuItem === menuItems[3]) {
      return (
        <MenuItem
          key={menuItem}
          className={`${classes.menuItem} ${menuItemIndex % 2 ? null : classes.primary}`}
        >
          <a href={data.link} download={true} target='_blank'>
            {menuItem}
          </a>
        </MenuItem>
      );
    }

    return (
      <MenuItem
        key={menuItem}
        onClick={handleMenuItemClick(menuItem)}
        className={`${classes.menuItem} ${menuItemIndex % 2 ? null : classes.primary}`}
      >
        {menuItem}
      </MenuItem>
    );
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
        {menuItems.map((menuItem, menuItemIndex) => getMenuItem(menuItem, menuItemIndex))}
      </Menu>
    </div>
  );
};

export default withStyles(styles)(Sum);
