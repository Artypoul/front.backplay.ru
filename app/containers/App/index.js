import React, { useCallback, useEffect, useState } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';

import NotFound from 'containers/Pages/Standalone/NotFoundDedicated';
import Application from './Application';
import Auth from './Auth';
import ThemeWrapper from './ThemeWrapper';
import { useSelector } from 'react-redux';

window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

function App() {
  const user = useSelector(state => state.user.user);
  const navigate = useHistory();

  const getRoute = () => {
    if (user) {
      return (
        <Route component={Application} />
      );
    }

    return (
      <Route component={Auth} />
    );
  };

  useEffect(() => {
    if (!user) {
      navigate.push('/login');

      return;
    }
  }, [user]);

  return (
    <ThemeWrapper>
      <Switch>
        {getRoute()}

        <Route component={NotFound} />
      </Switch>
    </ThemeWrapper>
  );
}

export default App;
