import React from 'react';
import NotFound from 'containers/Pages/Standalone/NotFoundDedicated';
import { Route, Switch } from 'react-router-dom';
import Application from './Application';
import Auth from './Auth';
import ThemeWrapper from './ThemeWrapper';
window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

function App() {
  return (
    <ThemeWrapper>
      <Switch>
        <Route path="/shop" component={Application} />
        <Route component={Auth} />
        <Route component={NotFound} />
      </Switch>
    </ThemeWrapper>
  );
}

export default App;
