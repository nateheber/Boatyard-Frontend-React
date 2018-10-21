import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import PageTemplate from '../components/template/PageTemplate';
import Dashboard from '../components/template/Dashboard';

const MainRouter = () => (
  <Router>
    <PageTemplate>
      <Route exact path="/" component={Dashboard} />
      <Route exact path="/dashboard/" component={Dashboard} />
    </PageTemplate>
  </Router>
);

export default MainRouter;
