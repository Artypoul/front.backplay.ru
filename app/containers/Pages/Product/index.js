import React, { Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import addBg from 'dan-images/utils/add-bg.svg';
import Input from '@material-ui/core/Input';
import AddIcon from '@material-ui/icons/Add';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import Fab from '@material-ui/core/Fab';
import { styles } from './product-jss';
import { useLocation } from 'react-router-dom';
import Rating from '../../../components/Rating/Rating';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';

const ProductPage = (props) => {
  const {
    classes,
  } = props;

  const location = useLocation();

  const isEdit = location.pathname.includes('create');

  const getImageContent = () => {
    if (isEdit) {
      return (
        <label className={classes.imgWrapper}>
          <img src={addBg} alt="" />
          
          <input type="file" />
          
          <Fab size="medium" color="secondary" aria-label="add" className={classes.buttonAdd}>
            <AddIcon />
          </Fab>
        </label>
      );
    }

    return (
      <div className={classes.imgWrapper}>
        <img src={addBg} alt="" />

        <Fab size="medium" color="secondary" aria-label="add" className={classes.buttonAdd}>
          <PlayArrowIcon />
        </Fab>

        <div className={classes.label}>PLAYBACK PRO</div>
      </div>
    );
  };

  const getContent = () => {
    if (isEdit) {
      return (
        <Fragment>
          <div className={classes.rightWrapper}>
            <div className={classes.rightInner}>
              <Input
                required
                placeholder='Введите название трека'
                className={classes.input}
              />

              <Input
                required
                placeholder='Введите исполнителя'
                className={classes.input}
              />

              <label className={classes.upload}>
                <input type="file" />

                <Button variant='contained'>+ dEMO</Button>
              </label>
            </div>

            <div className={classes.types}>
              <div className={classes.top}>
                <Button variant='contained'>ПЛЕЙБЭК</Button>
                <Button variant='contained'>НОВОЕ</Button>
                <Button variant='contained'>АВТОРСКОЕ</Button>
                <Button variant='contained'>ТЕМП</Button>
              </div>

              <div className={classes.bottom}>
                <TextField
                  required
                  label="С басом"
                  variant='outlined'
                  style={{
                    width: '100%',
                  }}
                  InputProps={{
                    className: classes.vartiantInput,
                  }}
                />
                <TextField
                  required
                  label="Без баса"
                  variant='outlined'
                  style={{
                    width: '100%',
                  }}
                  InputProps={{
                    className: classes.vartiantInput,
                  }}
                />
              </div>

              {isEdit && (
                <div className={classes.vartiantsWrapper}>
                  <div className={classes.vartiants}>
                    <div className={classes.vartiant}>
                      <TextField
                        required
                        label="+ добавить ссылку на архив"
                        variant='outlined'
                        style={{
                          width: '100%',
                        }}
                        InputProps={{
                          className: classes.vartiantInput,
                        }}
                      />

                      <div className={classes.vartiantInner}>
                        <Button variant='contained' color='primary'>+ с басом</Button>
                        <Button variant='contained'>+ ключ</Button>
                        <Button variant='contained'>+ изменения</Button>
                      </div>
                    </div>
                  </div>

                  <Button
                    variant='contained'
                    color='secondary'
                    style={{
                      alignSelf: 'center',
                    }}
                  >
                    + вариант
                  </Button>
                </div>
              )}
            </div>
          </div>

          <Button
            variant='contained'
            color='secondary'
            style={{
              alignSelf: 'flex-start',
            }}
          >
            ГОТОВО
          </Button>
        </Fragment>
      );
    }

    return (
      <div className={classes.rightContent}>
        <div className={classes.price}>
          <Typography variant='caption' component='span' className={classes.value}>
            800р
          </Typography>
          <Chip label="Без баса 7000" className={classes.chipDiscount} />
        </div>

        <div className={classes.buy}>
          <Button
            variant='contained'
            color='secondary'
          >
            купить
          </Button>
        </div>

        <div
          className={classes.top}
          style={{
            padding: '16px 20px',
          }}
        >
          <Button variant='outlined' color='secondary'>ПЛЕЙБЭК</Button>
          <Button variant='outlined' color='secondary'>КАВЕР</Button>
          <Button variant='outlined' color='secondary'>АВТОРСКОЕ</Button>
          <Button variant='outlined' color='secondary'>НОВОЕ</Button>
        </div>

        <div
          className={classes.top}
          style={{
            padding: '16px 20px',
          }}
        >
          <Button variant='outlined' color='secondary'>C#</Button>
          <Button variant='outlined' color='secondary'>B</Button>
          <Button variant='outlined' color='secondary'>A#</Button>
          <Button variant='outlined' color='secondary'>D</Button>
          <Button variant='outlined' color='secondary'>D#</Button>
          <Button variant='outlined' color='secondary'>E</Button>
        </div>

        <div
          className={classes.top}
          style={{
            padding: '16px 20px',
          }}
        >
          <Button variant='outlined' color='secondary'>-1</Button>
          <Button variant='outlined' color='secondary'>-0,5</Button>
          <Button variant='outlined' color='secondary'>0</Button>
          <Button variant='outlined' color='secondary'>+0,5</Button>
          <Button variant='outlined' color='secondary'>+1</Button>
          <Button variant='outlined' color='secondary'>+1.5</Button>
        </div>
      </div>
    );
  };

  return (
    <div className={classes.backgrpund}>
      <div className={classes.wrapper}>
        <div className={`${classes.left} ${!isEdit && 'gap'}`}>
          {!isEdit && (
            <div className={classes.titleWrapper}>
              <Typography variant='h2' component='h2' className={classes.title}>
                ANNA  ASTI По барам
              </Typography>

              <Rating
                value={5}
                readOnly
                max={5}
                style={{
                  display: 'flex',
                  gap: 12,
                }}
                itemStyle={{
                  padding: 0,
                }}
              />
            </div>
          )}

          {getImageContent()} 
        </div>

        <div className={classes.right}>
          {getContent()}
        </div>
      </div>
    </div>
  );
};

export default withStyles(styles)(ProductPage);
