import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import PageTemplate from '../components/template/PageTemplate';
import Dashboard from '../components/template/Dashboard';
import { Inbox, QRBox, TemplateBox } from '../components/template/Message';

const MainRouter = () => (
  <Router>
    <PageTemplate>
      <Route exact path="/" component={Dashboard} />
      <Route exact path="/dashboard/" component={Dashboard} />
      <Route exact path="/inbox/" component={Inbox} />
      <Route exact path="/quick-replies/" component={QRBox} />
      <Route exact path="/templates/" component={TemplateBox} />
    </PageTemplate>
  </Router>
);

export default MainRouter;
