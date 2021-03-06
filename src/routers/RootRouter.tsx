import React, { Component } from 'react';
import Loadable from 'react-loadable';
import { Route, Router, Switch } from 'react-router';
import history from './history';

// const PageUserRouter = Loadable({
//   loader: () => import('./UserRouter'),
//   loading: () => null,
// });
const PageUserRouter = Loadable({
  loader: () => import('./UserRouter'),
  loading: () => null,
});

const PageStaffRouter = Loadable({
  loader: () => import('./StaffRouter'),
  loading: () => null,
});

export default class RootRouter extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          {/* staff zone */}
          <Route path="/staff">
            <PageStaffRouter />
          </Route>

          {/* user zone */}
          <Route path="/">
            <PageUserRouter />
          </Route>
        </Switch>
      </Router>
    );
  }
}
