import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import classNames from 'classnames';
import Card from '@material-ui/core/Card';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Chip from '@material-ui/core/Chip';
import AddShoppingCart from '@material-ui/icons/AddShoppingCart';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import CreateIcon from '@material-ui/icons/Create';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import Type from 'dan-styles/Typography.scss';
import Rating from '../Rating/Rating';
import styles from './cardStyle-jss';
import { Link, useHistory } from 'react-router-dom';
import { Box } from '@material-ui/core';

function ProductCard(props) {
  const {
    classes,
    discount,
    soldout,
    thumbnail,
    name,
    desc,
    ratting,
    price,
    prevPrice,
    list,
    detailOpen,
    addToCart,
    width,
    edit,
  } = props;

  const getCardAction = () => {
    if (edit && !soldout) {
      return (
        <Tooltip title="Редактировать трек" placement="top">
          <Fab onClick={edit} size="medium" color="secondary" aria-label="add" className={classes.buttonAdd}>
            <CreateIcon />
          </Fab>
        </Tooltip>
      );
    }

    if (!soldout) {
      return (
        <Tooltip title="Купить трек" placement="top">
          <Fab onClick={addToCart} size="medium" color="secondary" aria-label="add" className={classes.buttonAdd}>
            <AddShoppingCart />
          </Fab>
        </Tooltip>
      );
    }
  };

  return (
    <Card className={classNames(classes.cardProduct, isWidthUp('sm', width) && list ? classes.cardList : '')}>
      <div className={classes.status}>
        {discount !== '' && (
          <Chip label={'Discount ' + discount} className={classes.chipDiscount} />
        )}
        {soldout && (
          <Chip label="Проданно" className={classes.chipSold} />
        )}
      </div>

      <div className={classes.mediaWrapper}>
        <Fab size="medium" color="secondary" aria-label="add" className={classes.buttonPlay}>
          <PlayArrowIcon />
        </Fab>
        <CardMedia
          className={classes.mediaProduct}
          image={thumbnail}
          title={name}
        />
      </div>

      <CardContent className={classes.floatingButtonWrap}>
        {getCardAction()}
        <Typography noWrap gutterBottom variant="h5" className={classes.title} component="h2">
          {name}
        </Typography>
        <Typography component="p" className={classes.desc}>
          {desc}
        </Typography>
        <div className={classes.ratting}>
          <Rating value={ratting} max={5} readOnly />
        </div>
      </CardContent>
      <CardActions className={classes.price}>
        <Box fontWeight={600} fontSize={24}>
          {price && (
            <span>
              {price || 0}Р
            </span>
          )}
        </Box>
        {prevPrice > 0 && (
          <Typography variant="caption" component="h5">
            <span className={Type.lineThrought}>
              {prevPrice}P
            </span>
          </Typography>
        )}
        <div className={classes.rightAction}>
          <Button size="small" variant="outlined" color="secondary" onClick={detailOpen}>
            Playback Version
          </Button>
        </div>
      </CardActions>
    </Card>
  );
}

ProductCard.propTypes = {
  classes: PropTypes.object.isRequired,
  discount: PropTypes.string,
  width: PropTypes.string.isRequired,
  soldout: PropTypes.bool,
  thumbnail: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  ratting: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  prevPrice: PropTypes.number,
  list: PropTypes.bool,
  detailOpen: PropTypes.func,
  addToCart: PropTypes.func,
};

ProductCard.defaultProps = {
  discount: '',
  soldout: false,
  prevPrice: 0,
  list: false,
  detailOpen: () => (false),
  addToCart: () => (false),
};

const ProductCardResponsive = withWidth()(ProductCard);
export default withStyles(styles)(ProductCardResponsive);
