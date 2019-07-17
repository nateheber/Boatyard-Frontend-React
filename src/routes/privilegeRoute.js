import React from 'react';
import MainPageTemplate from 'components/template/MainPageTemplate';
import { Route, Redirect } from 'react-router-dom';
const PrivateRoute = ({ isAuthenticated, loggedInPrivilege, privilege, component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    isAuthenticated ?   
      (
        loggedInPrivilege === privilege ?
        <MainPageTemplate>
          <Component {...props} />
        </MainPageTemplate> : <Redirect to="/dashboard" />
      ) :
      <Redirect to="/login/" />
  )} />
);

export default PrivateRoute;