import React, { useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import classNames from 'classnames';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { GuideSlider } from 'dan-components';
import { toggleAction, openAction, playTransitionAction } from 'dan-redux/actions/uiActions';
import LeftSidebarLayout from './layouts/LeftSidebarLayout';
import RightSidebarLayout from './layouts/RightSidebarLayout';
import LeftSidebarBigLayout from './layouts/LeftSidebarBigLayout';
import DropMenuLayout from './layouts/DropMenuLayout';
import MegaMenuLayout from './layouts/MegaMenuLayout';
import styles from './appStyles-jss';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { BOT, CHAT, CHECKOUT, CREATE_PROJECT, HOME, ORDERS, PROFILE, PROJECT } from '../../utils/routes';

const places = {
  [HOME]: {
    name: 'Магазин',
    path: HOME,
  },
  [ORDERS]: {
    name: 'Заказы',
    path: ORDERS,
  },
  [CHAT]: {
    name: 'Чат',
    path: CHAT,
  },
  [CREATE_PROJECT]: {
    name: 'Добавление нового проекта',
    path: CREATE_PROJECT,
  },
  [`${PROJECT}/details`]: {
    name: 'Карточка проекта',
    path: PROJECT,
  },
  [`${PROJECT}/edit`]: {
    name: 'Редактирование проекта',
    path: PROJECT,
  },
  [`${CHECKOUT}/details`]: {
    name: 'Оформление заказа',
    path: CHECKOUT,
  },
  [PROFILE]: {
    name: '',
    path: PROFILE,
  },
  [`${BOT}/auto`]: {
    name: 'Автоматическое оформление заказа',
    path: PROFILE,
  },
  [`${BOT}/change`]: {
    name: 'Заказ новой тональности',
    path: PROFILE,
  },
  [`${BOT}/individual`]: {
    name: 'Индивидуальный заказ мультитрека',
    path: PROFILE,
  },
};

function Dashboard(props) {
  const [openGuide, setOpenGuide] = useState(false);
  const [appHeight, setAppHeight] = useState(0);

  useEffect(() => {
    const { history, loadTransition } = props;

    setAppHeight(window.innerHeight + 112);

    const currentPath = history.location.pathname;
    props.initialOpen(currentPath);

    loadTransition(true);

    const unlisten = history.listen(() => {
      window.scrollTo(0, 0);
      setTimeout(() => {
        loadTransition(true);
      }, 500);
    });

    return () => {
      if (unlisten != null) {
        unlisten();
      }
    };
  }, []);

  const handleOpenGuide = () => {
    setOpenGuide(true);
  };

  const handleCloseGuide = () => {
    setOpenGuide(false);
  };

  const {
    classes,
    children,
    toggleDrawer,
    sidebarOpen,
    loadTransition,
    pageLoaded,
    mode,
    history,
    gradient,
    deco,
    bgPosition,
    layout,
    changeMode
  } = props;

  const titleException = [];

  const getPageName = () => {
    const pathname = history.location.pathname;

    const parts = pathname.split('/');
    const [_, name, firstParam, secondParam, thirdParam] = parts;

    let resultName = places[pathname];
    if (firstParam) {
      const isNumber = +firstParam;

      if (isNumber) {
        resultName = places[`/${name}/details`];
      } else {
        resultName = places[`/${name}/${firstParam}`];
      }
    }

    if (`/${name}` === BOT) {
      if (+secondParam === 1) {
        resultName = places[`/${name}/auto`];
        return resultName;
      }

      if (+secondParam === 2) {
        resultName = places[`/${name}/change`];
        return resultName
      }

      if (+secondParam === 3) {
        resultName = places[`/${name}/individual`];
        return resultName
      }
    }

    if (secondParam) {
      const isNumber = +secondParam;
      resultName = places[`/${name}/${secondParam}`];
    }

    return resultName;
  };

  const place = {};

  return (
    <div
      style={ { minHeight: appHeight } }
      className={
        classNames(
          classes.appFrameInner,
          layout === 'top-navigation' || layout === 'mega-menu' ? classes.topNav : classes.sideNav,
          mode === 'dark' ? 'dark-mode' : 'light-mode'
        )
      }
    >
      <GuideSlider openGuide={ openGuide } closeGuide={ handleCloseGuide } />
      {
        layout === 'left-sidebar' && (
          <LeftSidebarLayout
            history={ history }
            toggleDrawer={ toggleDrawer }
            loadTransition={ loadTransition }
            changeMode={ changeMode }
            sidebarOpen={ sidebarOpen }
            pageLoaded={ pageLoaded }
            mode={ mode }
            gradient={ gradient }
            deco={ deco }
            bgPosition={ bgPosition }
            place={ getPageName() }
            titleException={ titleException }
            handleOpenGuide={ handleOpenGuide }
          >
            { children }
          </LeftSidebarLayout>
        )
      }
      {/* {
        layout === 'big-sidebar' && (
          <LeftSidebarBigLayout
            history={ history }
            toggleDrawer={ toggleDrawer }
            loadTransition={ loadTransition }
            changeMode={ changeMode }
            sidebarOpen={ sidebarOpen }
            pageLoaded={ pageLoaded }
            gradient={ gradient }
            deco={ deco }
            bgPosition={ bgPosition }
            mode={ mode }
            place={ place }
            titleException={ titleException }
            handleOpenGuide={ handleOpenGuide }
          >
            { children }
          </LeftSidebarBigLayout>
        )
      } */}
      {/* {
        layout === 'right-sidebar' && (
          <RightSidebarLayout
            history={ history }
            toggleDrawer={ toggleDrawer }
            loadTransition={ loadTransition }
            changeMode={ changeMode }
            sidebarOpen={ sidebarOpen }
            pageLoaded={ pageLoaded }
            mode={ mode }
            gradient={ gradient }
            deco={ deco }
            bgPosition={ bgPosition }
            place={ place }
            titleException={ titleException }
            handleOpenGuide={ handleOpenGuide }
          >
            { children }
          </RightSidebarLayout>
        )
      } */}
      {/* {
        layout === 'top-navigation' && (
          <DropMenuLayout
            history={ history }
            toggleDrawer={ toggleDrawer }
            loadTransition={ loadTransition }
            changeMode={ changeMode }
            sidebarOpen={ sidebarOpen }
            pageLoaded={ pageLoaded }
            mode={ mode }
            gradient={ gradient }
            deco={ deco }
            bgPosition={ bgPosition }
            place={ place }
            titleException={ titleException }
            handleOpenGuide={ handleOpenGuide }
          >
            { children }
          </DropMenuLayout>
        )
      } */}
      {/* {
        layout === 'mega-menu' && (
          <MegaMenuLayout
            history={ history }
            toggleDrawer={ toggleDrawer }
            loadTransition={ loadTransition }
            changeMode={ changeMode }
            sidebarOpen={ sidebarOpen }
            pageLoaded={ pageLoaded }
            mode={ mode }
            gradient={ gradient }
            deco={ deco }
            bgPosition={ bgPosition }
            place={ place }
            titleException={ titleException }
            handleOpenGuide={ handleOpenGuide }
          >
            { children }
          </MegaMenuLayout>
        )
      } */}
    </div>
  );
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  history: PropTypes.object.isRequired,
  initialOpen: PropTypes.func.isRequired,
  toggleDrawer: PropTypes.func.isRequired,
  loadTransition: PropTypes.func.isRequired,
  changeMode: PropTypes.func.isRequired,
  sidebarOpen: PropTypes.bool.isRequired,
  pageLoaded: PropTypes.bool.isRequired,
  mode: PropTypes.string.isRequired,
  gradient: PropTypes.bool.isRequired,
  deco: PropTypes.bool.isRequired,
  bgPosition: PropTypes.string.isRequired,
  layout: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  sidebarOpen: state.ui.sidebarOpen,
  pageLoaded: state.ui.pageLoaded,
  mode: state.ui.type,
  gradient: state.ui.gradient,
  deco: state.ui.decoration,
  layout: state.ui.layout,
  bgPosition: state.ui.bgPosition,
});

const mapDispatchToProps = dispatch => ({
  toggleDrawer: () => dispatch(toggleAction),
  initialOpen: bindActionCreators(openAction, dispatch),
  loadTransition: bindActionCreators(playTransitionAction, dispatch),
});

const DashboardMaped = connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);

export default (withStyles(styles)(DashboardMaped));
