import StaffSiderLayout from 'Components/Layout/Staff/Sider';
import { u } from 'Models/user';
import {
  StaffPermissionType,
  STAFF_PERMISSION,
} from 'Models/user/staff.interface';
import React from 'react';
import Loadable from 'react-loadable';
import { Route, Router, useHistory, useLocation } from 'react-router';

const Home = Loadable({
  loader: () => import('Pages/Staff/Home'),
  loading: () => null,
});
const Reject = Loadable({
  loader: () => import('Pages/Staff/Reject'),
  loading: () => null,
});
const Accept = Loadable({
  loader: () => import('Pages/Staff/Accept'),
  loading: () => null,
});
const Drop = Loadable({
  loader: () => import('Pages/Staff/Drop'),
  loading: () => null,
});
const Wait = Loadable({
  loader: () => import('Pages/Staff/Wait'),
  loading: () => null,
});
const Forward = Loadable({
  loader: () => import('Pages/Staff/Forward'),
  loading: () => null,
});

const Login = Loadable({
  loader: () => import('Pages/Staff/Login'),
  loading: () => null,
});
const Logout = Loadable({
  loader: () => import('Pages/Staff/Logout'),
  loading: () => null,
});
const Task = Loadable({
  loader: () => import('Pages/Staff/Task'),
  loading: () => null,
});
const Calendar = Loadable({
  loader: () => import('Pages/Staff/Calendar'),
  loading: () => null,
});
const AreaList = Loadable({
  loader: () => import('Pages/Staff/AreaList'),
  loading: () => null,
});
const Area = Loadable({
  loader: () => import('Pages/Staff/Area'),
  loading: () => null,
});

const StaffRouter: React.FunctionComponent = () => {
  const location = useLocation();
  const history = useHistory();
  const validStaff = STAFF_PERMISSION.includes(
    u.GetUser().group as StaffPermissionType,
  );
  if (!validStaff && location.pathname !== '/staff/login') {
    console.warn('redirecting to login pages cuz invalid permission');
    history.push('/staff/login');
  }

  const currentLoginPage = location.pathname.match('/login');

  return (
    <Router history={history}>
      <Route path="/">{!currentLoginPage && <StaffSiderLayout />}</Route>

      <Route path="**/login">
        <Login />
      </Route>

      {/* Task */}
      <Route path="**/task/:id">
        <Task />
      </Route>

      {/* Calendar */}
      <Route path="**/calendar/">
        <Calendar />
      </Route>

      {/* Area list */}
      <Route path="**/areas/">
        <AreaList />
      </Route>

      {/* Area list */}
      <Route path="**/area/:id">
        <Area />
      </Route>

      {/* <Home /> */}
      <Route path="**/reject">
        <Reject />
      </Route>
      <Route path="**/accept">
        <Accept />
      </Route>
      <Route path="**/drop">
        <Drop />
      </Route>
      <Route path="**/wait">
        <Wait />
      </Route>
      <Route path="**/forward">
        <Forward />
      </Route>

      {/* home */}
      <Route path="/staff" exact>
        <Home />
      </Route>

      <Route path="**/logout">
        <Logout />
      </Route>
    </Router>
  );
};

export default StaffRouter;