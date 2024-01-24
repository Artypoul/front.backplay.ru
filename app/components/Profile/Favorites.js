import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import imgApi from 'dan-api/images/photos';
import avatarApi from 'dan-api/images/avatars';
import GeneralCard from '../CardPaper/GeneralCard';
import PostCard from '../CardPaper/PostCard';
import imgData from 'dan-api/images/imgDataMasonry';
import { ProductCard, EditProductCard } from 'dan-components';
import Quote from '../Quote/Quote';

const styles = theme => ({
  divider: {
    margin: `${theme.spacing(2)}px 0`,
    background: 'none'
  },
  masonry: {
    columnGap: '1em',
    rowGap: '1em',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(374px, 1fr))',
    [theme.breakpoints.down('md')]: {
      gridTemplateColumns: 'repeat(auto-fit, minmax(309px, 1fr))',
    },
  },
});

function Favorites(props) {
  const { classes } = props;
  const bull = <span className={classes.bullet}>•</span>;
  return (
    <div className={classes.masonry}>
      <EditProductCard />

      {imgData.map((thumb, index) => (
        <ProductCard
          key={index}
          thumbnail={thumb.img}
          name={thumb.title}
          desc={thumb.desc}
          ratting={thumb.ratting}
          price={thumb.price}
          prevPrice={thumb.prevPrice}
          soldout={thumb.soldout}
          // addToCart={addToCart(thumb)}
        />
      ))}
    </div>
  );
}

Favorites.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Favorites);
