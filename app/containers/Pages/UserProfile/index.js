import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import AppBar from '@material-ui/core/AppBar';
import dummy from 'dan-api/dummy/dummyContents';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Hidden from '@material-ui/core/Hidden';
import AccountCircle from '@material-ui/icons/AccountCircle';
import SupervisorAccount from '@material-ui/icons/SupervisorAccount';
import Favorite from '@material-ui/icons/Favorite';
import PhotoLibrary from '@material-ui/icons/PhotoLibrary';
import { withStyles } from '@material-ui/core/styles';
import { bindActionCreators } from 'redux';
import { connect, useSelector } from 'react-redux';
import {
  Cover,
  About,
  Connection,
  Favorites,
  Albums
} from 'dan-components';
import bgCover from 'dan-images/petal_bg.svg';
import styles from 'dan-components/SocialMedia/jss/cover-jss';
import data from '../../SampleApps/Timeline/api/timelineData';
import { fetchAction } from '../../SampleApps/Timeline/reducers/timelineActions';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { GetUserProjects } from './api';

function TabContainer(props) {
  const { children } = props;
  return (
    <div style={{ paddingTop: 8 * 3 }}>
      {children}
    </div>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

function UserProfile(props) {
  const title = brand.name + ' - Profile';
  const description = brand.desc;

  const { 
    classes,
  } = props;

  const [value, setValue] = useState(0);
  const [projects, setProjects] = useState([]);

  const history = useHistory();

  const {
    user,
    isAdmin,
  } = useSelector(state => state.user);

  const handleChange = (event, val) => {
    setValue(val);
  };

  const tabContainerData = [
    <About title='Информация' />,
    <Favorites items={projects} />,
  ];

  const buttonActionHandler = () => {
    history.push('/shop/chat');
  };

  const getUserPorjects = async () => {
    const projects = await GetUserProjects(user.id);
    
    if (projects && projects.data) {
      setProjects(projects.data);
    }
  };

  useEffect(() => {
    if (value) {
      getUserPorjects();
    }
  }, [value]);

  return (
    <div>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
      </Helmet>
      <Cover
        coverImg={bgCover}
        avatar={user.avatar && user.avatar.path}
        userId={user.id}
        name={`${user.first_name} ${user.last_name}`}
        desc={isAdmin ? 'Автор' : 'Пользователь'}
        button={isAdmin && {
          title: 'НАписать',
          action: buttonActionHandler,
        }}
      />
      <AppBar position="static" className={classes.profileTab}>
        <Hidden mdUp>
          <Tabs
            value={value}
            onChange={handleChange}
            variant="fullWidth"
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab icon={<AccountCircle />} />
            <Tab icon={<Favorite />} />
          </Tabs>
        </Hidden>
        <Hidden smDown>
          <Tabs
            value={value}
            onChange={handleChange}
            variant="fullWidth"
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab icon={<AccountCircle />} label="ИНформация" />
            <Tab icon={<Favorite />} label="МОИ ТРЕКИ" />
          </Tabs>
        </Hidden>
      </AppBar>
      <TabContainer>
        {tabContainerData[value]}
      </TabContainer>
    </div>
  );
}

UserProfile.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  ...state, // force state from reducer
  dataProps: state.socmed.dataTimeline
});

const constDispatchToProps = dispatch => ({
  fetchData: bindActionCreators(fetchAction, dispatch)
});

const UserProfileMapped = connect(
  mapStateToProps,
  constDispatchToProps
)(UserProfile);

export default withStyles(styles)(UserProfileMapped);
