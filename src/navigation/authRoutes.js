import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import AuthPageTemplate from 'components/template/AuthPageTemplate';
import Login from 'components/template/Login';

const AuthRoutes = () => (
  <Router>
    <AuthPageTemplate>
      <Route exact path="*" component={Login} />
    </AuthPageTemplate>
  </Router>
);

export default AuthRoutes;
