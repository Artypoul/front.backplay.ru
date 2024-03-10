import { withStyles } from '@material-ui/core/styles';
import { ProductCard, EditProductCard, SearchProduct, Filter } from 'dan-components';
import PropTypes from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router-dom';
import styles from './photo-jss';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from '../Pagination/Pagination';
import { UpdateMusicIndex } from '../../redux/actions/player';

function PhotoGallery(props) {
  const {
    classes,
    pagination,
    projects,
    setProjects,
    tags,
    selectedTags,
    setSelectedTags,
    setPage,
    setSearchedValue,
  } = props;

  const {
    user,
    isAdmin,
  } = useSelector(state => state.user);

  const history = useHistory();
  const dispatch = useDispatch();

  const addToCart = (item) => {
    return async () => {
      history.push(`/shop/bot/${item.id}/1`);
    };
  };

  const editProject = (projectID) => {
    return () => {
      history.push(`/shop/projects/${projectID}/edit`);
    };
  };

  const handleOpenProject = (projectID, index) => {
    return () => {
      history.push(`/shop/projects/${projectID}`)
      dispatch(UpdateMusicIndex(index));
    };
  };

  const searchHandler = (value) => {
    setSearchedValue(value);
  };

  return (
    <div>
      <SearchProduct
        dataProduct={projects}
        listView='grid'
        search={searchHandler}
      />

      <Filter
        items={tags}
        selectedItems={selectedTags}
        setSelectedItems={setSelectedTags}
        onFilter={setProjects}
      />

      <div className={`${classes.masonry} ${!projects.length && 'empty'}`}>
        <EditProductCard isAdmin={isAdmin} />

        {projects.map((project, index) => (
          <ProductCard
            key={index}
            thumbnail={project.preview.path}
            name={project.name}
            desc={project.singer}
            ratting={project.rate}
            price={project.price}
            prevPrice={project.price_without_bass}
            soldout={project.soldout}
            addToCart={addToCart(project)}
            edit={editProject(project.id)}
            open={handleOpenProject(project.id, index)}
            isAdmin={isAdmin}
            demo={project.demo}
            productIndex={index}
          />
        ))}
      </div>

      {pagination.total_pages > 1 && (
        <Pagination
          curpage={pagination.current_page || 0}
          totpages={pagination.total_pages || 1}
          onChange={setPage}
          onPrev={setPage}
          onNext={setPage}
          onGoFirst={setPage}
          onGoLast={setPage}
        />
      )}
    </div>
  );
}

PhotoGallery.propTypes = {
  classes: PropTypes.object.isRequired,
  projects: PropTypes.array.isRequired
};

export default withStyles(styles)(PhotoGallery);
