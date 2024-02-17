import { withStyles } from '@material-ui/core/styles';
import { ProductCard, EditProductCard, SearchProduct, Filter } from 'dan-components';
import PropTypes from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router-dom';
import styles from './photo-jss';
import { useSelector } from 'react-redux';
import Pagination from '../Pagination/Pagination';

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
  } = props;

  const {
    user,
    isAdmin,
  } = useSelector(state => state.user);

  const history = useHistory();

  const addToCart = (item) => {
    return async () => {
      history.push(`/shop/bot`);
    };
  };

  const editProject = (projectID) => {
    return () => {
      history.push(`/shop/projects/${projectID}/edit`);
    };
  };

  const handleOpenProject = (projectID) => {
    return () => history.push(`/shop/projects/${projectID}`);
  };

  const onChange = (page) => {
    setPage(page);
  }

  const onPrev = (page) => {
    setPage(page);
  }

  const onNext = (page) => {
    setPage(page);
  }

  const onGoFirst = (page) => {
    setPage(page);
  }

  const onGoLast = (page) => {
    setPage(page);
  }

  return (
    <div>
      <SearchProduct
        dataProduct={[]}
        listView='grid'
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
            open={handleOpenProject(project.id)}
            isAdmin={isAdmin}
            demo={project.demo}
          />
        ))}
      </div>

      {pagination.total_pages > 1 && (
        <Pagination
          curpage={pagination.current_page || 0}
          totpages={pagination.total_pages || 1}
          onChange={onChange}
          onPrev={onPrev}
          onNext={onNext}
          onGoFirst={onGoFirst}
          onGoLast={onGoLast}
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
