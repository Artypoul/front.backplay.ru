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
import cardBg from 'dan-images/utils/editCardBg.svg';
import styles from './cardStyle-jss';
import { useHistory } from 'react-router-dom';

function EditProductCard(props) {
  const {
    classes,
    list,
    detailOpen,
    addToCart,
    width,
    edit,
    isAdmin,
  } = props;

  const history = useHistory();

  const playButtonHandler = () => {
    if (isAdmin) {
      history.push({
        pathname: `/shop/projects/create`,
      });
      
      return;
    }
    
    history.push({
      pathname: `/shop/bot/null/3`,
    });
  };
  
  const buttonTitle = isAdmin ? 'Добавить проект' : 'Заказать уникальный проект';

  return (
    <Card className={classNames(classes.cardProduct, isWidthUp('sm', width) && list ? classes.cardList : '')}>
      <div className={classes.mediaWrapper}>
        <Fab size="medium" color="secondary" aria-label="add" className={classes.buttonPlay} onClick={playButtonHandler}>
          <AddOutlinedIcon />
        </Fab>
        <CardMedia
          className={classes.mediaProduct}
          image={cardBg}
          title='background'
        />
      </div>

      <CardContent className={classes.buttonWrapper}>
        <Button size="medium" variant="outlined" color="secondary" onClick={detailOpen}>
          {buttonTitle}
        </Button>
      </CardContent>
    </Card>
  );
}

EditProductCard.propTypes = {
  classes: PropTypes.object.isRequired,
  width: PropTypes.string.isRequired,
  list: PropTypes.bool,
  detailOpen: PropTypes.func,
  isAdmin: PropTypes.bool,
};

EditProductCard.defaultProps = {
  list: false,
  detailOpen: () => (false),
  addToCart: () => (false),
};

const ProductCardResponsive = withWidth()(EditProductCard);
export default withStyles(styles)(ProductCardResponsive);
