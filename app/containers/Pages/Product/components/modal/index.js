import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import { styles } from './modal-jss';
import { close } from './icons';
import { useDispatch } from 'react-redux';

const Modal = (props) => {
  const {
    isOpen,
    title,
    items,
    classes,
    onClose,
    variant,
    updateVariant,
    keyIndex,
  } = props;

  const closeHandler = () => onClose(false);

  const itemClickHandler = (value) => {
    return () => {
      updateVariant(prev => {
        const copiedVariant = Object.assign({}, prev[variant]);
        copiedVariant[keyIndex] = value.id;
        copiedVariant[`${keyIndex}_name`] = value.name;
    
        const newArray = Array.from(prev);
        newArray[variant] = copiedVariant;
    
        return newArray;
      });
      
      closeHandler();
    };
  };

  return (
    <div className={`${classes.backgroundWrapper} ${isOpen && classes.opened}`}>
      <div className={classes.background}>
        <div className={classes.close} onClick={closeHandler}>
          {close}
        </div>
        <div className={classes.wrapper}>
          <h3 className={classes.title}>{title}</h3>

          <div className={classes.items}>
            {items.map((item, itemIndex) => (
              <div key={item.id} onClick={itemClickHandler(item)} className={classes.item}>{item.name}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default withStyles(styles)(Modal);
