import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { App } from '../../ui/layouts/app';
import { FlightDataActions } from '../../ui/pages/flight-data-actions';
import { FlightDataAnalytics } from '../../ui/pages/flight-data-analytics';
import { FlightsData } from '../../ui/pages/flights-data';
import { Index } from '../../ui/pages/index';
import { Login } from '../../ui/pages/login';
import { NotFound } from '../../ui/pages/not-found';
import { RecoverPassword } from '../../ui/pages/recover-password';
import { ResetPassword } from '../../ui/pages/reset-password';
import { Signup } from '../../ui/pages/signup';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MuiTheme from './mui-theme';

const requireAuth = (nextState, replace) => {
  if (!Meteor.loggingIn() && !Meteor.userId()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname },
    });
  }
};

Meteor.startup(() => {
  render(
    <MuiThemeProvider muiTheme={ MuiTheme }>
    <Router history={ browserHistory }>
      <Route path="/" component={ App }>

        <IndexRoute name="index" component={ Index } onEnter={ requireAuth } />

        <Route name="flights-data" path="/flights" onEnter={ requireAuth } component={ FlightsData } />
        <Route name="flight-data-actions"  path="/flights/:id/actions" onEnter={ requireAuth } component={ FlightDataActions } />
        <Route name="flight-data-analytics"  path="/flights/:id/analytics" onEnter={ requireAuth } component={ FlightDataAnalytics } />

        <Route name="login" path="/login" component={ Login } />
        <Route name="recover-password" path="/recover-password" component={ RecoverPassword } />
        <Route name="reset-password" path="/reset-password/:token" component={ ResetPassword } />
        <Route name="signup" path="/signup" component={ Signup } />
        <Route path="*" component={ NotFound } />

      </Route>
    </Router>
    </MuiThemeProvider>,
    document.getElementById('react-root')
  );
});
