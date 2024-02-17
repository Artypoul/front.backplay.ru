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
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useSelector } from 'react-redux';

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
  const {
    classes,
    items,
  } = props;

  const history = useHistory();
  const {
    isAdmin,
  } = useSelector(state => state.user);

  const addToCart = (item) => {
    return async () => {
      console.log('item', item);
    };
  };

  const editItem = (projectID) => {
    return () => {
      history.push(`/shop/projects/${projectID}/edit`);
    };
  };

  const handleOpenItem = (projectID) => {
    return () => history.push(`/shop/projects/${projectID}`);
  };
  
  return (
    <div className={classes.masonry}>
      {/* <EditProductCard /> */}

      {(items || []).map((item, index) => (
        <ProductCard
          key={index}
          thumbnail={item.preview.path}
          name={item.name}
          desc={item.singer}
          ratting={item.rate}
          price={item.price}
          prevPrice={item.price_without_bass}
          soldout={item.soldout}
          addToCart={addToCart(item)}
          edit={editItem(item.id)}
          open={handleOpenItem(item.id)}
          isAdmin={isAdmin}
          demo={item.demo}
        />
      ))}
    </div>
  );
}

Favorites.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Favorites);
