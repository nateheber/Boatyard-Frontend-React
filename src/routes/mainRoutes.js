import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { connect } from 'react-redux';
import Login from 'components/template/Login';
import ForgotPassword from 'components/template/ForgotPassword';
import ResetPassword from 'components/template/ResetPassword';
import CreatePassword from 'components/template/CreatePassword';
import Dashboard from 'components/template/Dashboard';
import Order from 'containers/Orders/OrderList';
import OrderDetails from 'containers/Orders/OrderDetails';
import { TeamList, TeamDetails } from 'containers/Teams/screens';
import Customers from 'containers/Customers/screens/Customers';
import CustomerDetails from 'containers/Customers/screens/CustomerDetails';
import Calendar from 'components/template/Calendar';
import Providers from 'containers/Providers/screens/Providers';
import ProviderEditor from 'containers/Providers/screens/ProviderEditor';
import UpdateProfile from 'containers/Profiles/screens/UpdateProfile';
import Services from 'containers/Services/screens/Services';
import AddService from 'containers/Services/screens/AddService';
import ServiceDetails from 'containers/Services/screens/ServiceDetails';
import Categories from 'containers/Categories/screens/Categories';
import CategoryDetails from 'containers/Categories/screens/CategoryDetails';
import Inbox from 'containers/Message/Inbox';
import OpenedInvoices from 'containers/Invoices/OpenedInvoices';
import { QRBox, TemplateBox } from 'containers/Message';
import { Users, UserDetails } from 'containers/Users';
import { isAuthenticatedSelector } from 'store/selectors/auth';
import PublicRoute from './publicRoute';
import PrivateRoute from './privateRoute';
import PrivilegeRoute from './privilegeRoute';

const MainRoutes = (props) => (
  <Router>
    <>
      <PublicRoute path="/login/" component={Login} />
      <PublicRoute path="/forgot-password/" component={ForgotPassword} />
      <PublicRoute path="/reset-password/" component={ResetPassword} />
      <PublicRoute path="/create-password/" component={CreatePassword} />

      <PrivateRoute exact path="/update-profile" component={UpdateProfile} isAuthenticated={props.isAuthenticated} />
      <PrivateRoute exact path="/dashboard/" component={Dashboard} isAuthenticated={props.isAuthenticated} />
      <PrivateRoute exact path="/inbox/" component={Inbox} isAuthenticated={props.isAuthenticated} />
      <PrivateRoute exact path="/quick-replies/" component={QRBox} isAuthenticated={props.isAuthenticated} />
      <PrivateRoute exact path="/templates/" component={TemplateBox} isAuthenticated={props.isAuthenticated} />
      <PrivateRoute exact path="/orders/:id/detail" component={OrderDetails} isAuthenticated={props.isAuthenticated} />
      <PrivateRoute exact path="/orders/" component={Order} isAuthenticated={props.isAuthenticated} />
      <PrivateRoute exact path="/order-details/" component={OrderDetails} isAuthenticated={props.isAuthenticated} />
      <PrivateRoute exact path="/team/" component={TeamList} isAuthenticated={props.isAuthenticated} />
      <PrivateRoute exact path="/team-details/" component={TeamDetails} isAuthenticated={props.isAuthenticated}  />
      <PrivateRoute exact path="/calendar/" component={Calendar} isAuthenticated={props.isAuthenticated} />

      <PrivilegeRoute exact path="/providers/" component={Providers} privilege='admin' {...props} />
      <PrivilegeRoute exact path="/provider-details/" component={ProviderEditor} privilege='admin' {...props}  />
      <PrivilegeRoute exact path="/invoices/" component={OpenedInvoices} privilege='provider' {...props} />
      <PrivilegeRoute exact path="/services/" component={Services} privilege='provider' {...props} />
      <PrivilegeRoute exact path="/services/new/" component={AddService} privilege='provider' {...props}  />
      <PrivilegeRoute exact path="/service-details/" component={ServiceDetails} privilege='provider' {...props}  />
      <PrivilegeRoute exact path="/categories/" component={Categories} privilege='admin' {...props} />
      <PrivilegeRoute exact path="/category-details/" component={CategoryDetails} privilege='admin' {...props} />
      <PrivilegeRoute exact path="/customers/" component={Customers } privilege='provider' />
      <PrivilegeRoute exact path="/customer-details/" component={CustomerDetails  } privilege='provider' {...props} />
      <PrivilegeRoute exact path="/users/" component={Users} privilege='admin' {...props} />
      <PrivilegeRoute exact path="/user-details/" component={UserDetails} privilege='admin' {...props} />
      <PrivateRoute exact path="/" component={Dashboard} {...props}  />
    </>
  </Router>
);
const mapStateToProps = (state) => ({
  isAuthenticated: isAuthenticatedSelector(state),
  loggedInPrivilege: state.auth.privilege,
});
export default connect(mapStateToProps, null)(MainRoutes);
