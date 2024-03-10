import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import { styles } from './modal-jss';
import { close } from './icons';
import { useDispatch } from 'react-redux';

const Modal = (props) => {
  const {
    isOpen,
    titles,
    items,
    classes,
    onClose,
    variant,
    updateVariant,
    keyIndex,
    onSelect,
  } = props;

  const closeHandler = () => onClose(false);

  const [topTitle, bottomTitle] = titles;
  const {
    topItems,
    bottomItems,
    variants,
  } = items;
  console.log('items', items)

  return (
    <div className={`${classes.backgroundWrapper} ${isOpen && classes.opened}`}>
      <div className={classes.background}>
        <div className={classes.close} onClick={closeHandler}>
          {close}
        </div>

        <div className={classes.content}>
          <div className={classes.wrapper}>
            <h3 className={classes.title}>{topTitle}</h3>

            <div className={classes.items}>
              {(topItems || []).map((item, itemIndex) => (
                // <div key={item.id} onClick={itemClickHandler(item.id)} className={classes.item}>{item.name}</div>
                <div key={item.id} onClick={onSelect('key_id', item)} className={classes.item}>{item.name || item.key.name}</div>
              ))}
            </div>
          </div>

          <div className={classes.wrapper}>
            <h3 className={classes.title}>{bottomTitle}</h3>

            <div className={classes.items}>
              {(bottomItems || []).map((item, itemIndex) => (
                <div key={item.id} onClick={onSelect('change_id', item)} className={classes.item}>{item.name || item.change.name}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withStyles(styles)(Modal);
