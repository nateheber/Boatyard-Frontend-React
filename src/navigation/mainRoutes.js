import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import PageTemplate from '../components/template/PageTemplate';
import Dashboard from '../components/template/Dashboard';
import Order from '../components/template/Order';
import Services from '../components/template/Services';
import ServiceDetails from '../components/template/ServiceDetails';
import Categories from '../components/template/Categories';
import CategoryDetails from '../components/template/CategoryDetails';
import Team from '../components/template/Team';
import Customers from '../components/template/Customers';
import Calendar from '../components/template/Calendar';
import Providers from '../components/template/Providers';
import CreateProvider from '../components/template/EditFlow/CreateProvider';
import UpdateProfile from '../components/template/UpdateProfile';
import Users from '../components/template/Users';
import UserDetails from '../components/template/UserDetails';
import { Inbox, QRBox, TemplateBox } from '../components/template/Message';

const MainRouter = () => (
  <Router>
    <PageTemplate>
      <Route exact path="/" component={Dashboard} />
      <Route exact path="/update-profile" component={UpdateProfile} />
      <Route exact path="/dashboard/" component={Dashboard} />
      <Route exact path="/inbox/" component={Inbox} />
      <Route exact path="/quick-replies/" component={QRBox} />
      <Route exact path="/templates/" component={TemplateBox} />
      <Route exact path="/orders/" component={Order} />
      <Route exact path="/providers/" component={Providers} />
      <Route exact path="/services/" component={Services} />
      <Route exact path="/service-details/" component={ServiceDetails} />
      <Route exact path="/categories/" component={Categories} />
      <Route exact path="/category-details/" component={CategoryDetails} />
      <Route exact path="/team/" component={Team} />
      <Route exact path="/customers/" component={Customers} />
      <Route exact path="/calendar/" component={Calendar} />
      <Route exact path="/users/" component={Users} />
      <Route exact path="/user-details/" component={UserDetails} />
      <Route exact path="/create-provider/" component={CreateProvider} />
    </PageTemplate>
  </Router>
);

export default MainRouter;
