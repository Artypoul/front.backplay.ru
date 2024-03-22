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
import { useDispatch, useSelector } from 'react-redux';
import { NextMusic, PlayMusic, PrevMusic } from '../../redux/actions/player';

const Player = (props) => {
  const {
    classes,
    data,
  } = props;

  // const [isStarted, setIsStarted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [isSliderDrag, setIsSliderDrag] = useState(false);

  const {
    isPlayed,
  } = useSelector(state => state.player);
  
  const ref = useRef(null);
  const dispatch = useDispatch();
  
  const playStateHandler = () => {
    if (!isPlayed) {
      dispatch(PlayMusic());
      ref.current.pause();
      
      return;
    }
    
    dispatch(PlayMusic());
    ref.current.play();
  };
  
  const prev = () => {
    dispatch(PrevMusic())
  };

  const next = () => {
    dispatch(NextMusic())
  };

  const changeDuration = (event, newValue) => {
    if (!isSliderDrag) {
      setIsSliderDrag(true)
    }

    setCurrentTime(newValue);
  };

  const changeVolume = (event, newValue) => {
    ref.current.volume  = (newValue / 100);
  };

  const onTimeUpdateHandler = (event) => {
    if (!isSliderDrag) {
      setCurrentTime(event.target.currentTime);
    }
  };

  const onChangeCommitted = (event, newValue) => {
    ref.current.currentTime = newValue;
    setIsSliderDrag(false);
  };

  useEffect(() => {
    if (!isPlayed) {
      ref.current.pause();
      return;
    }

    ref.current.play();
  }, [isPlayed]);

  return (
    <div className={classes.background}>
      <audio ref={ref} src={data.path} autoPlay={true} onTimeUpdate={onTimeUpdateHandler}></audio>

      <div className={classes.left}>
        <div className={classes.buttons}>
          <div onClick={prev}>
            <SvgIcon className={classes.svg} viewBox='0 0 36 36'>
              {prevArrow}
            </SvgIcon>
          </div>

          <Fab size='small' className={classes.play} onClick={playStateHandler}>
            {isPlayed ? (
              <StopIcon />
            ) : (
              <PlayArrowIcon />
            )}
          </Fab>

          <div onClick={next}>
            <SvgIcon className={classes.svg} viewBox='0 0 36 36'>
              {nextArrow}
            </SvgIcon>
          </div>
        </div>

        <div className={classes.name}>
          <Typography component='h4' noWrap className={classes.title}>{data.name}</Typography>
          <Typography component='p' className={classes.desc}>{data.singer}</Typography>
        </div>
      </div>
      <div className={classes.center}>
        <Slider
          size="small"
          aria-label="Small"
          className={classes.slider}
          onChange={changeDuration}
          max={Math.floor(ref.current && ref.current.duration)}
          defaultValue={currentTime}
          value={currentTime}
          onChangeCommitted={onChangeCommitted}
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
