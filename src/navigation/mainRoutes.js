import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import PageTemplate from 'components/template/PageTemplate';
import Dashboard from 'components/template/Dashboard';
import Order from 'containers/Orders/OrderList';
import Team from 'components/template/Team';
import Customers from 'components/template/Customers';
import Calendar from 'components/template/Calendar';
import Providers from 'containers/Providers/screens/Providers';
import ProviderDetails from 'containers/Providers/screens/ProviderDetails';
import ProviderEditor from 'containers/Providers/screens/ProviderEditor';
import UpdateProfile from 'containers/Profiles/screens/UpdateProfile';
import Services from 'containers/Services/screens/Services';
import ServiceDetails from 'containers/Services/screens/ServiceDetails';
import Categories from 'containers/Categories/screens/Categories';
import CategoryDetails from 'containers/Categories/screens/CategoryDetails';
import Users from 'components/template/Users';
import UserDetails from 'components/template/UserDetails';
import { Inbox, QRBox, TemplateBox } from 'components/template/Message';

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
      <Route exact path="/providers/:providerId/" component={ProviderDetails} />
      <Route exact path="/provider-details/" component={ProviderEditor} />
      <Route exact path="/services/" component={Services} />
      <Route exact path="/service-details/" component={ServiceDetails} />
      <Route exact path="/categories/" component={Categories} />
      <Route exact path="/category-details/" component={CategoryDetails} />
      <Route exact path="/team/" component={Team} />
      <Route exact path="/customers/" component={Customers} />
      <Route exact path="/calendar/" component={Calendar} />
      <Route exact path="/users/" component={Users} />
      <Route exact path="/user-details/" component={UserDetails} />
    </PageTemplate>
  </Router>
);

export default MainRouter;
