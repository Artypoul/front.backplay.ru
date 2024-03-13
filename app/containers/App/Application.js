import { PropTypes } from 'prop-types';
import React, { Fragment, useContext } from 'react';
import { Route, Switch } from 'react-router-dom';

import { BOT, CHAT, CHECKOUT, CREATE_PROJECT, HOME, ORDER, ORDERS, PROFILE, PROJECT } from '../../utils/routes';
import Dashboard from '../Templates/Dashboard';
import {
  AdvancedTable,
  BotPage,
  Chat,
  CheckoutPage,
  NotFound,
  Photos,
  ProductPage,
  Profile
} from '../pageListAsync';
import { ThemeContext } from './ThemeWrapper';
import Outer from '../Templates/Outer';
import Success from '../SampleApps/Ecommerce/success';

function Application(props) {
  const { history } = props;

  const changeMode = useContext(ThemeContext);

  return (
    <Fragment>
      <Dashboard history={history} changeMode={changeMode}>
        <Switch>
          <Route exact path={HOME} component={Photos} />

          <Route path={ORDERS} component={AdvancedTable} />
          <Route path={`${ORDER}/:orderId`} component={BotPage} />

          <Route path={`${CHECKOUT}/:orderId`} component={CheckoutPage} />

          <Route path={`${PROJECT}/:id`} component={ProductPage} />
          <Route path={CREATE_PROJECT} component={ProductPage} />
          <Route path={`${PROJECT}/:id/edit`} component={ProductPage} />

          <Route path={CHAT} component={Chat} />

          <Route path={PROFILE} component={Profile} />

          <Route path={`${BOT}/:projectId/:type`} component={BotPage} />
          <Route path={`/payment/:id/success`} component={Success} />
          <Route component={NotFound} />
        </Switch>
      </Dashboard>

      {/* <Outer>
        <Switch>
          <Route path={`${CHECKOUT}/:id/success`} component={Success} />
        </Switch>
      </Outer> */}
    </Fragment>
  );
}

Application.propTypes = {
  history: PropTypes.object.isRequired,
};

export default Application;
