import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Outer from '../Templates/Outer';
import {
  LockScreen,
  LoginV2,
  NotFound,
  ResetPassword
} from '../pageListAsync';

function Auth() {
  return (
    <Outer>
      <Switch>
        <Route path="/login" component={LoginV2} />
        <Route path="/reset-password" component={ResetPassword} />
        <Route path="/lock-screen" component={LockScreen} />
        <Route component={NotFound} />
      </Switch>
    </Outer>
  );
}

export default Auth;
