import React from 'react';
import { Route, Redirect } from 'react-router-dom';
const PrivateRoute = ({ isAuthenticated, loggedInPrivilege, privilege, component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    isAuthenticated ?   
      (
        (loggedInPrivilege === privilege || privilege.includes(loggedInPrivilege)) ? <Component {...props} /> : <Redirect to="/dashboard" />
      ) :
      <Redirect to="/login/" />
  )} />
);

export default PrivateRoute;