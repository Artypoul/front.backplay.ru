import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SvgIcon from '@material-ui/core/SvgIcon';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { prevArrow, nextArrow } from './icons';

import { styles } from './player-jss';

const Player = (props) => {
  const {
    classes,
  } = props;

  return (
    <div className={classes.background}>
      <div className={classes.left}>
        <div className={classes.buttons}>
          <SvgIcon className={classes.svg} viewBox='0 0 36 36'>
            {prevArrow}
          </SvgIcon>

          <Fab size='small' className={classes.play}>
            <PlayArrowIcon />
          </Fab>

          <SvgIcon className={classes.svg} viewBox='0 0 36 36'>
            {nextArrow}
          </SvgIcon>
        </div>

        <div className={classes.name}>
          <Typography component='h4' noWrap className={classes.title}>Smack My Bitch Up PREVIEW</Typography>
          <Typography component='p' className={classes.desc}>Smack My Bitch Up PREVIEW</Typography>
        </div>
      </div>
      <div className={classes.center}>
        <Slider
          size="small"
          aria-label="Small"
          className={classes.slider}
        />
      </div>
      <div className={classes.right}>
        <VolumeUpIcon />

        <Slider
          size="small"
          aria-label="Small"
        />
      </div>
    </div>
  );
};

export default withStyles(styles)(Player);
