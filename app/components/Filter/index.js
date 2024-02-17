import React, { useEffect, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import FavoriteOutlinedIcon from '@material-ui/icons/FavoriteOutlined';

import styles from './filter-jss';
import { Button, Fab, IconButton, MenuItem, Select } from '@material-ui/core';

const Filter = (props) => {
  const {
    classes,
    items,
    selectedItems,
    setSelectedItems,
    onFilter,
  } = props;

  const changeFilterItems = (itemId) => {
    return () => {
      if (itemId === 0) {
        setSelectedItems({});

        return;
      }

      if (itemId) {
        setSelectedItems((prev) => {
          const copiedTags = Object.assign({}, prev);
          
          if (copiedTags[itemId]) {
            delete copiedTags[itemId];
          } else {
            copiedTags[itemId] = true;
          }

          return copiedTags;
        });
      }
    };
  };

  return (
    <div className={classes.wrapper}>
      <Fab size='small' style={{minWidth: 40,}}>
        <IconButton className={classes.iconButton}>
          <FavoriteOutlinedIcon />
        </IconButton>
      </Fab>

      <div className={classes.itemsWrapper}>
        <div className={classes.items}>
          <Button
            variant='contained'
            className={`${classes.item} ${!Object.keys(selectedItems).length && 'active'}`}
            onClick={changeFilterItems(0)}
          >
            Все
          </Button>
          {(items || []).map((filterItem, index) => (
            <Button
              variant='contained'
              key={filterItem.id}
              className={`${classes.item} ${selectedItems[filterItem.id] && 'active'}`}
              onClick={changeFilterItems(filterItem.id)}
            >
              {filterItem.name}
            </Button>
          ))}
          {/* <Button
            variant='contained'
            className={`${classes.item} ${selectedItems['-1'] && 'active'}`}
            onClick={changeFilterItems(-1)}
          >
            Разное
          </Button> */}
        </div>
      </div>
    </div>
  );
};

export default withStyles(styles)(Filter);
