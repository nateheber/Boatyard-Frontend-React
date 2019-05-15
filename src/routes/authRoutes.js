import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import AuthPageTemplate from 'components/template/AuthPageTemplate';
import Login from 'components/template/Login';
import ForgotPassword from 'components/template/ForgotPassword';
import ResetPassword from 'components/template/ResetPassword';

const AuthRoutes = () => (
  <Router>
    <AuthPageTemplate>
      <Route exact path="/login" component={Login} />
      <Route exact path="/forgot-password" component={ForgotPassword} />
      <Route exact path="/reset-password" component={ResetPassword} />
    </AuthPageTemplate>
  </Router>
);

export default AuthRoutes;
