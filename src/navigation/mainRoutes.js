import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import PageTemplate from 'components/template/PageTemplate';
import Dashboard from 'components/template/Dashboard';
import Order from 'containers/Orders/OrderList';
import OrderDetails from 'containers/Orders/OrderDetails';
import Team from 'components/template/Team';
import Customers from 'containers/Customers/screens/Customers';
import CustomerDetails from 'containers/Customers/screens/CustomerDetails';
import Calendar from 'components/template/Calendar';
import Providers from 'containers/Providers/screens/Providers';
import ProviderDetails from 'containers/Providers/screens/ProviderDetails';
import ProviderEditor from 'containers/Providers/screens/ProviderEditor';
import UpdateProfile from 'containers/Profiles/screens/UpdateProfile';
import OpenedInvoices from 'containers/Invoices/OpenedInvoices';
import PaidInvoices from 'containers/Invoices/PaidInvoices';
import Services from 'containers/Services/screens/Services';
import AddService from 'containers/Services/screens/AddService';
import ServiceDetails from 'containers/Services/screens/ServiceDetails';
import Categories from 'containers/Categories/screens/Categories';
import CategoryDetails from 'containers/Categories/screens/CategoryDetails';
import Inbox from 'containers/Message/Inbox';
import { QRBox, TemplateBox } from 'containers/Message';
import { Users, UserDetails } from 'containers/Users';

const MainRoutes = ({ privilege }) => (
  <Router>
    <PageTemplate>
      <Route exact path="/" component={Dashboard} />
      <Route exact path="/update-profile" component={UpdateProfile} />
      <Route exact path="/dashboard/" component={Dashboard} />
      <Route exact path="/inbox/" component={Inbox} />
      <Route exact path="/quick-replies/" component={QRBox} />
      <Route exact path="/templates/" component={TemplateBox} />
      <Route exact path="/orders/" component={Order} />
      <Route exact path="/order-details/" component={OrderDetails} />
      <Route exact path="/providers/"
        render={() => {
          if(privilege === 'admin') {
            return (<Providers />);
          } else {
            return (<Redirect to="/dashboard"/>);
          }
        }}
      />
      <Route exact path="/providers/:providerId/" component={ProviderDetails} />
      <Route exact path="/provider-details/" component={ProviderEditor} />
      <Route exact path="/invoices/"
        render={() => {
          if(privilege === 'provider') {
            return (<Redirect to="/invoices/open"/>);
          } else {
            return (<Redirect to="/dashboard"/>);
          }
        }}
      />
      <Route exact path="/invoices/open"
        render={() => {
          if(privilege === 'provider') {
            return (<OpenedInvoices />);
          } else {
            return (<Redirect to="/dashboard"/>);
          }
        }}
      />
      <Route exact path="/invoices/paid"
        render={() => {
          if(privilege === 'provider') {
            return (<PaidInvoices />);
          } else {
            return (<Redirect to="/dashboard"/>);
          }
        }}
      />
      <Route exact path="/services/"
        render={() => {
          if(privilege === 'provider') {
            return (<Services />);
          } else {
            return (<Redirect to="/dashboard"/>);
          }
        }}
      />
      <Route exact path="/services/new"
        render={() => {
          if(privilege === 'provider') {
            return (<AddService />);
          } else {
            return (<Redirect to="/dashboard"/>);
          }
        }}
      />
      <Route exact path="/service-details/"
        render={() => {
          if(privilege === 'provider') {
            return (<ServiceDetails />);
          } else {
            return (<Redirect to="/dashboard"/>);
          }
        }}
      />
      <Route exact path="/categories/"
        render={() => {
          if(privilege === 'admin') {
            return (<Categories />);
          } else {
            return (<Redirect to="/dashboard"/>);
          }
        }}
      />
      <Route exact path="/category-details/"
        render={() => {
          if(privilege === 'admin') {
            return (<CategoryDetails />);
          } else {
            return (<Redirect to="/dashboard"/>);
          }
        }}
      />
      <Route exact path="/team/" component={Team} />
      <Route exact path="/customers/"
        render={() => {
          if(privilege === 'provider') {
            return (<Customers />);
          } else {
            return (<Redirect to="/dashboard"/>);
          }
        }}
      />
      <Route exact path="/customer-details/"
        render={() => {
          if(privilege === 'provider') {
            return (<CustomerDetails />);
          } else {
            return (<Redirect to="/dashboard"/>);
          }
        }}
      />
      <Route exact path="/calendar/" component={Calendar} />
      <Route exact path="/users/"
        render={() => {
          if(privilege === 'admin') {
            return (<Users />);
          } else {
            return (<Redirect to="/dashboard"/>);
          }
        }}
      />
      <Route exact path="/user-details/"
        render={() => {
          if(privilege === 'admin') {
            return (<UserDetails />);
          } else {
            return (<Redirect to="/dashboard"/>);
          }
        }}
      />
    </PageTemplate>
  </Router>
);

const mapStateToProps = ({ auth: { privilege } }) => ({
  privilege
});

export default connect(mapStateToProps)(MainRoutes);
