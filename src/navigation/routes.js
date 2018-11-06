import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import PageTemplate from '../components/template/PageTemplate';
import Dashboard from '../components/template/Dashboard';
import Order from '../components/template/Order';
import Services from '../components/template/Services';
import Team from '../components/template/Team';
import Customers from '../components/template/Customers';
import Calendar from '../components/template/Calendar';
import Providers from '../components/template/Providers';
import { Inbox, QRBox, TemplateBox } from '../components/template/Message';

const MainRouter = () => (
  <Router>
    <PageTemplate>
      <Route exact path="/" component={Dashboard} />
      <Route exact path="/dashboard/" component={Dashboard} />
      <Route exact path="/inbox/" component={Inbox} />
      <Route exact path="/quick-replies/" component={QRBox} />
      <Route exact path="/templates/" component={TemplateBox} />
      <Route exact path="/orders/" component={Order} />
      <Route exact path="/providers/" component={Providers} />
      <Route exact path="/services/" component={Services} />
      <Route exact path="/team/" component={Team} />
      <Route exact path="/customers/" component={Customers} />
      <Route exact path="/calendar/" component={Calendar} />
    </PageTemplate>
  </Router>
);

export default MainRouter;
