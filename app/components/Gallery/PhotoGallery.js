import { withStyles } from '@material-ui/core/styles';
import { ProductCard, EditProductCard, SearchProduct, Filter } from 'dan-components';
import PropTypes from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router-dom';
import styles from './photo-jss';

function PhotoGallery(props) {
  const { classes, imgData } = props;

  const history = useHistory();

  const editTrack = (trackId) => {
    return () => {
      history.push(`/music/${trackId}`);
    };
  };

  const addToCart = (item) => {
    return async () => {
      console.log('item', item);
    };
  };

  const isAuthor = false;

  return (
    <div>
      <SearchProduct
        dataProduct={[]}
        listView='grid'
      />

      <Filter />

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
            addToCart={addToCart(thumb)}
            edit={() => {}}
          />
        ))}
      </div>
    </div>
  );
}

PhotoGallery.propTypes = {
  classes: PropTypes.object.isRequired,
  imgData: PropTypes.array.isRequired
};

export default withStyles(styles)(PhotoGallery);
