import React from 'react';
import MainPageTemplate from 'components/template/MainPageTemplate';
import { Route, Redirect } from 'react-router-dom';
const PrivateRoute = ({ isAuthenticated, component: Component, ...rest }) => {
  console.log('privateroute....');
  return (
  <Route {...rest} render={(props) => (
    isAuthenticated ?   
      (
        <MainPageTemplate>
          <Component {...props} />
        </MainPageTemplate>
      ) :
      <Redirect to="/login" />
  )} />
)};

export default PrivateRoute;