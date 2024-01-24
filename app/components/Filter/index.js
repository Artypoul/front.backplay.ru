import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import FavoriteOutlinedIcon from '@material-ui/icons/FavoriteOutlined';

import styles from './filter-jss';
import { Button, Fab, IconButton, MenuItem, Select } from '@material-ui/core';

const filterItems = [{
  value: 'all',
  label: 'ВСЕ',
}, {
  value: 'playback',
  label: 'ПЛЕЙБЭК',
}, {
  value: 'new',
  label: 'НОВОЕ',
}, {
  value: 'composition',
  label: 'КОМПОЗИЦИЯ',
}, {
  value: 'melody',
  label: 'МЕЛОДИЯ',
}, {
  value: 'gormony',
  label: 'ГАРМОНИЯ',
}, {
  value: 'gitar',
  label: 'ГИТАРА',
}, {
  value: 'bar',
  label: 'БАРАБАНЫ',
}, {
  value: 'other',
  label: 'РАЗНОЕ',
}];

const Filter = (props) => {
  const {
    classes,
  } = props;

  const [selectedItemValue, setSelectedItemValue] = useState(0);

  const changeFilterItems = (itemIndex) => {
    return () => {
      setSelectedItemValue(itemIndex);
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
          {filterItems.map((filterItem, index) => (
            <Button
              variant='contained'
              key={filterItem.label}
              value={filterItem.value}
              className={`${classes.item} ${index === selectedItemValue && 'active'}`}
              onClick={changeFilterItems(index)}
            >
              {filterItem.label}
            </Button>
          ))}
        </div>
      </div>
      {/* <Select
        autoWidth={true}
        value={selectedItemValue}
        onChange={handleValueChange}
        name='music-types'
        style={{
          width: 100,
        }}
      >
        {filterItems.map((filterItem) => (
          <MenuItem key={filterItem.label} value={filterItem.value}>
            {filterItem.label}
          </MenuItem>
        ))}
      </Select> */}
    </div>
  );
};

export default withStyles(styles)(Filter);
