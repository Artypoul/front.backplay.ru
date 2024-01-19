import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Fab from '@material-ui/core/Fab';
import { withStyles } from '@material-ui/core/styles';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import styles from './cardStyle-jss';

function EditProductCard(props) {
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

  // const getCardAction = () => {
  //   if (edit && !soldout) {
  //     return (
  //       <Tooltip title="Редактировать трек" placement="top">
  //         <Fab onClick={edit} size="medium" color="secondary" aria-label="add" className={classes.buttonAdd}>
  //           <CreateIcon />
  //         </Fab>
  //       </Tooltip>
  //     );
  //   }

  //   if (!soldout) {
  //     return (
  //       <Tooltip title="Купить трек" placement="top">
  //         <Fab onClick={addToCart} size="medium" color="secondary" aria-label="add" className={classes.buttonAdd}>
  //           <AddShoppingCart />
  //         </Fab>
  //       </Tooltip>
  //     );
  //   }
  // };

  return (
    <Card className={classNames(classes.cardProduct, isWidthUp('sm', width) && list ? classes.cardList : '')}>
      <div className={classes.mediaWrapper}>
        <Fab size="medium" color="secondary" aria-label="add" className={classes.buttonPlay}>
          <AddOutlinedIcon />
        </Fab>
        <CardMedia
          className={classes.mediaProduct}
          image='http://via.placeholder.com/1050x700/E040FB/FFFFFF/'
          title='background'
        />
      </div>

      <CardContent className={classes.buttonWrapper}>
        <Button size="medium" variant="outlined" color="secondary" onClick={detailOpen}>
          Добавить проект
        </Button>
      </CardContent>
    </Card>
  );
}

EditProductCard.propTypes = {
  classes: PropTypes.object.isRequired,
  // discount: PropTypes.string,
  width: PropTypes.string.isRequired,
  // soldout: PropTypes.bool,
  // thumbnail: PropTypes.string.isRequired,
  // name: PropTypes.string.isRequired,
  // desc: PropTypes.string.isRequired,
  // ratting: PropTypes.number.isRequired,
  // price: PropTypes.number.isRequired,
  // prevPrice: PropTypes.number,
  list: PropTypes.bool,
  detailOpen: PropTypes.func,
  // addToCart: PropTypes.func,
};

EditProductCard.defaultProps = {
  // discount: '',
  // soldout: false,
  // prevPrice: 0,
  list: false,
  detailOpen: () => (false),
  addToCart: () => (false),
};

const ProductCardResponsive = withWidth()(EditProductCard);
export default withStyles(styles)(ProductCardResponsive);
