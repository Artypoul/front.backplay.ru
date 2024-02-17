import React, { useEffect, useRef, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import StopIcon from '@material-ui/icons/Stop';
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
    data,
  } = props;

  const [isStarted, setIsStarted] = useState(true);
  
  const ref = useRef(null);

  const playStateHandler = () => {
    if (isStarted) {
      setIsStarted(false);
      ref.current.pause();

      return;
    }

    setIsStarted(true);
    ref.current.play();
  };
  
  const prev = () => {

  };

  const next = () => {

  };

  const changeDuration = (event, newValue) => {
    ref.current.currentTime = newValue;
  };

  const changeVolume = (event, newValue) => {
    ref.current.volume  = (newValue / 100);
  };

  return (
    <div className={classes.background}>
      <audio ref={ref} src={data.path} autoPlay={isStarted}></audio>

      <div className={classes.left}>
        <div className={classes.buttons}>
          <SvgIcon className={classes.svg} viewBox='0 0 36 36'>
            {prevArrow}
          </SvgIcon>

          <Fab size='small' className={classes.play} onClick={playStateHandler}>
            {isStarted ? (
              <StopIcon />
            ) : (
              <PlayArrowIcon />
            )}
          </Fab>

          <SvgIcon className={classes.svg} viewBox='0 0 36 36'>
            {nextArrow}
          </SvgIcon>
        </div>

        <div className={classes.name}>
          <Typography component='h4' noWrap className={classes.title}>{data.name}</Typography>
          <Typography component='p' className={classes.desc}>{data.singer} PREVIEW</Typography>
        </div>
      </div>
      <div className={classes.center}>
        <Slider
          size="small"
          aria-label="Small"
          className={classes.slider}
          onChange={changeDuration}
          max={Math.floor(ref.current && ref.current.duration)}
          defaultValue={0}
        />
      </div>
      <div className={classes.right}>
        <VolumeUpIcon />

        <Slider
          size="small"
          aria-label="Small"
          onChange={changeVolume}
          defaultValue={100}
          max={100}
        />
      </div>
    </div>
  );
};

export default withStyles(styles)(Player);
