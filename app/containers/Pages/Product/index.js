import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Fab from '@material-ui/core/Fab';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import addBg from 'dan-images/utils/add-bg.svg';
import React, { Fragment, useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { useLocation, useHistory, useParams } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import Rating from '../../../components/Rating/Rating';
import { CreateProjectRequest, GetProjectRequest, UpdateProjectRequest } from './api';
import { changeBassHandler, updateVariantLink } from './components/handlers';
import { loadFileHandler } from './components/handlers/loadFileHandler';
import Modal from './components/modal';
import PriceField from './components/priceInput';
import { TextFieldRedux } from './components/textFieldRedux';
import { emptyVariant } from './consts';
import { styles } from './product-jss';
import { fillProduct } from '../../../redux/actions/product';
import { Snackbar } from '@material-ui/core';

const required = value => (value === null ? 'Required' : undefined);

const ProductPage = (props) => {
  const {
    classes,
    handleSubmit,
    pristine,
    submitting,
  } = props;

  const [isKeyModalOpened, setIsKeyModalOpened] = useState(false);
  const [isChangeModalOpened, setIsChangeModalOpened] = useState(false);
  
  const [product, setProduct] = useState({});

  const [tags, setTags] = useState([]);
  const [keys, setKeys] = useState([]);
  const [changes, setChanges] = useState([]);

  const [variants, setVariants] = useState([]);
  const [message, setMessage] = useState('');

  const [variantIndex, setVariantIndex] = useState(null);
  const [selectedTags, setSelectedTags] = useState({});

  const location = useLocation();
  const {id} = useParams();
  const history = useHistory();

  const dispatch = useDispatch();

  const isEdit = location.pathname.includes('edit');
  const isCreate = location.pathname.includes('create');

  const selectTag = (tagId) => {
    return () => {
      setSelectedTags(prev => {
        const copiedObject = Object.assign({}, prev);
        copiedObject[tagId] = !copiedObject[tagId];

        return copiedObject;
      });
    };
  };

  const addVariant = () => {
    setVariants(prev => {
      const newArray = Array.from(prev);
      newArray.push(emptyVariant);

      return newArray;
    });
  };

  const onChangeHandler = (variantIndex) => {
    return (event) => updateVariantLink(variantIndex, setVariants, event.target.value);
  };

  const bassHandler = (variantIndex) => {
    return () => changeBassHandler(variantIndex, setVariants);
  };

  const openModal = (action, variantIndex) => {
    return () => {
      action(true);
      setVariantIndex(variantIndex);
    };
  };

  const snackBarHandleClose = () => {
    setMessage('');
  };

  const loadFile = (action, field) => {
    return (event) => loadFileHandler(action, event, field);
  };

  const getProject = async () => {
    const {
      project,
      tags,
      variants,
      message,
      keys,
      changes,
    } = await GetProjectRequest(id, isCreate);

    if (project) {
      setProduct(project);

      if (isEdit) {
        const data = {
          name: project.name,
          singer: project.singer,
          tempo: project.tempo,
          price: project.price,
          price_without_bass: project.price_without_bass,
        }
        dispatch(fillProduct(data));

        project.tags.forEach((tag) => selectTag(tag.id)())
      }
    }

    setTags(tags);
    setVariants(variants);
    setKeys(keys);
    setChanges(changes);
  };

  const handleSubmitHandler = async (values) => {
    const {
      name,
      singer,
      price,
      price_without_bass,
      tempo,
    } = values;

    if (!product.preview) {
      setMessage('Загрузите превью');
      return;
    }
    
    if (!product.demo) {
      setMessage('Загрузите демо mp3 или mp4 формата');
      return;
    }

    if (!Object.keys(selectedTags).length) {
      setMessage('Выберите теги');
      return;
    }

    if (!variants.length) {
      setMessage('Добавьте варианта проекта');
      return;
    }

    for (const index in variants) {
      const variant = variants[index];
      
      if (variant.id) {
        continue;
      }
      
      if (!variant.link || !variant.key_id || !variant.change_id) {
        setMessage('Добавьте ссылку, +ключ и +изменения варианта(ов)');
        return;
      }
    }

    const formatedTags = [];
    Object.keys(selectedTags).forEach(key => {
      if (selectedTags[key]) {
        formatedTags.push(+key);
      }
    });

    const requestData = {
      preview: product.preview.file && product.preview,
      demo: product.demo.file && product.demo,
      tags: formatedTags,
      variants,
      name,
      singer,
      price: +String(price).replace(',', ''),
      price_without_bass: +String(price_without_bass).replace(',', ''),
      tempo,
      projectID: id,
    };

    if (isCreate) {
      const createdProject = await CreateProjectRequest(requestData);
      history.push({
        pathname: `/shop/projects/${createdProject.id}`,
      });

      return;
    }
    
    const updatedProject = await UpdateProjectRequest(requestData);
      history.push({
        pathname: `/shop/projects/${updatedProject.id}`,
      });
  };

  const onBuyHandler = () => {
    history.push({
      pathname: `/shop/bot/${product.id}/1`,
    });
  };

  useEffect(() => {
    getProject();
  }, [location.pathname]);

  const getImageContent = () => {
    if (isEdit || isCreate) {
      return (
        <label className={classes.imgWrapper}>
          <img src={(product.preview && (product.preview.blob || product.preview.path)) || addBg} alt="" />
          
          <input type="file" onChange={loadFile(setProduct, 'preview')} />
          
          <Fab size="medium" color="secondary" aria-label="add" className={classes.buttonAdd}>
            <AddIcon />
          </Fab>
        </label>
      );
    }

    return (
      <div className={classes.imgWrapper}>
        <img src={(product.preview && product.preview.path) || addBg} alt="" />

        <Fab size="medium" color="secondary" aria-label="add" className={classes.buttonAdd}>
          <PlayArrowIcon />
        </Fab>

        <div className={classes.label}>{product.singer}</div>
      </div>
    );
  };

  const getContent = () => {
    if (isEdit || isCreate) {
      return (
        <Fragment>
          <div className={classes.rightWrapper}>
            <div className={classes.rightInner}>
              <Field
                name='name'
                component={TextFieldRedux}
                type='text'
                placeholder='Введите название трека'
                required
                validate={required}
                className={classes.input}
              />

              <Field
                name='singer'
                component={TextFieldRedux}
                type='text'
                placeholder='Введите исполнителя'
                required
                validate={required}
                className={classes.input}
              />

              <label className={classes.upload}>
                <input type="file" onChange={loadFile(setProduct, 'demo')} />

                <Button variant='contained'>
                  {(product.demo && (product.demo.name || product.demo.file.name)) || '+ dEMO'}
                </Button>
              </label>
            </div>

            <div className={classes.types}>
              <div className={classes.top}>
                {tags.map((tag, tagIndex) => (
                  <Button
                    key={tag.id}
                    variant='contained'
                    color={selectedTags[tag.id] ? 'primary' : 'default'}
                    onClick={selectTag(tag.id)}
                  >
                    {tag.name}
                  </Button>
                ))}
              </div>

              <div className={classes.bottom}>
                <Field
                  name='price'
                  component={PriceField}
                  type='text'
                  label='С басом'
                  placeholder='С басом'
                  required
                  validate={required}
                />
                <Field
                  name='price_without_bass'
                  component={PriceField}
                  type='text'
                  label='Без баса'
                  placeholder='Без баса'
                  required
                  validate={required}
                />
              </div>

              <div className={classes.vartiantsWrapper}>
                <div className={classes.vartiants}>
                  {variants.map((variant, variantIndex) => (
                    <div key={variantIndex} className={classes.vartiant}>
                      <TextField
                        required
                        label="+ добавить ссылку на архив"
                        variant='outlined'
                        style={{
                          width: '100%',
                        }}
                        value={variant.link}
                        onChange={onChangeHandler(variantIndex)}
                        InputProps={{
                          className: classes.vartiantInput,
                        }}
                      />

                      <div className={classes.vartiantInner}>
                        <Button
                          variant='contained'
                          color={variant.with_bass ? 'primary' : 'default'}
                          onClick={bassHandler(variantIndex)}
                        >
                          {variant.with_bass ? '- без баса' : '+ с басом'}
                        </Button>
                        <Button
                          variant='contained'
                          color={(variant.key_id || (variant.key && variant.key.id)) ? 'primary' : 'default'}
                          onClick={openModal(setIsKeyModalOpened, variantIndex)}
                        >
                          + ключ
                        </Button>
                        <Button
                          variant='contained'
                          color={(variant.change_id || (variant.change && variant.change.id)) ? 'primary' : 'default'}
                          onClick={openModal(setIsChangeModalOpened, variantIndex)}
                        >
                          + изменения
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <Button
                  variant='contained'
                  color='secondary'
                  style={{
                    alignSelf: 'center',
                  }}
                  onClick={addVariant}
                >
                  + вариант
                </Button>
              </div>
            </div>
          </div>

          <Button
            variant='contained'
            color='secondary'
            style={{
              alignSelf: 'flex-start',
            }}
            type='submit'
            disabled={submitting}
          >
            ГОТОВО
          </Button>

          <Modal
            isOpen={isKeyModalOpened}
            onClose={setIsKeyModalOpened}
            variant={variantIndex}
            updateVariant={setVariants}
            title='Доступные тональности'
            keyIndex='key_id'
            items={keys}
          />
          <Modal
            isOpen={isChangeModalOpened}
            onClose={setIsChangeModalOpened}
            variant={variantIndex}
            updateVariant={setVariants}
            keyIndex='change_id'
            title='Доступные изменения'
            items={changes}
          />
        </Fragment>
      );
    }

    return (
      <div className={classes.rightContent}>
        <div className={classes.price}>
          <Typography variant='caption' component='span' className={classes.value}>
            {product.price}р
          </Typography>
          <Chip label={`Без баса ${product.price_without_bass}р`} className={classes.chipDiscount} />
        </div>

        <div className={classes.buy}>
          <Button
            variant='contained'
            color='secondary'
            onClick={onBuyHandler}
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
          {(product.tags || []).map((tag) => (
            <Button key={tag.id} variant='outlined' color='secondary'>{tag.name}</Button>
          ))}
        </div>

        <div
          className={classes.top}
          style={{
            padding: '16px 20px',
          }}
        >
          {variants.map((varinat) => (
            <Button key={varinat.id} variant='outlined' color='secondary'>{varinat.key.name}</Button>
          ))}
        </div>

        <div
          className={classes.top}
          style={{
            padding: '16px 20px',
          }}
        >
          {variants.map((varinat) => (
            <Button key={varinat.id} variant='outlined' color='secondary'>{varinat.change.name}</Button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className={classes.backgrpund}>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        autoHideDuration={3000}
        open={message}
        onClose={snackBarHandleClose}
        message={message}
        key='toptight'
      />

      <form className={classes.wrapper} onSubmit={handleSubmit(handleSubmitHandler)}>
        <div className={`${classes.left} ${!isEdit && 'gap'}`}>
          {(!isEdit && !isCreate) && (
            <div className={classes.titleWrapper}>
              <Typography variant='h2' component='h2' className={classes.title}>
                {product.name}
              </Typography>

              <Rating
                value={product.rate}
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
      </form>
    </div>
  );
};

const ProductReduxed = reduxForm({
  form: 'product',
  enableReinitialize: true,
  destroyOnUnmount: true,
})(ProductPage);

const ProductInit = connect(
  state => ({
    initialValues: state.product.product,
  }),
)(ProductReduxed);

export default withStyles(styles)(ProductInit);
