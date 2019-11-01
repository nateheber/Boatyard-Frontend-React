import React, { useState, useEffect }from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Login from 'components/template/Login';
import ForgotPassword from 'components/template/ForgotPassword';
import ResetPassword from 'components/template/ResetPassword';
import CreatePassword from 'components/template/CreatePassword';
import ConfirmAccount from 'components/template/ConfirmAccount';

import Dashboard from 'components/template/Dashboard';
import Order from 'containers/Orders/OrderList';
import OrderDetails from 'containers/Orders/OrderDetails';
import { GeneralTeamList, TeamDetails } from 'containers/Teams/screens';
import Customers from 'containers/Customers/screens/Customers';
import CustomerDetails from 'containers/Customers/screens/CustomerDetails';
import Calendar from 'components/template/Calendar';
import Providers from 'containers/Providers/screens/Providers';
import ProviderEditor from 'containers/Providers/screens/ProviderEditor';
import UpdateProfile from 'containers/Profiles/screens/UpdateProfile';
import BoatShow from 'containers/Boats/BoatShow';
import BoatReservationDone from 'containers/Boats/BoatReservationDone';
import Services from 'containers/Services/screens/Services';
import AddService from 'containers/Services/screens/AddService';
import ServiceDetails from 'containers/Services/screens/ServiceDetails';
import Categories from 'containers/Categories/screens/Categories';
import CategoryDetails from 'containers/Categories/screens/CategoryDetails';
import ContractorDetails from 'containers/Contractors/screens/ContractorDetails';
import Inbox from 'containers/Message/Inbox';
import OpenedInvoices from 'containers/Invoices/OpenedInvoices';
import { QRBox, TemplateBox } from 'containers/Message';
import { Users, UserDetails } from 'containers/Users';
import { isAuthenticatedSelector } from 'store/selectors/auth';
import { SetRefreshFlag } from 'store/actions/auth';
import PrivateRoute from './privateRoute';
import PrivilegeRoute from './privilegeRoute';
import Intercom from 'components/basic/Intercom';
import { intercomAppId, mmIntercomAppId } from '../api/config';
import MainPageTemplate from 'components/template/MainPageTemplate';
import BackgroundImage from '../resources/auth/login-bg.png';
import IntercomProvider from './IntercomProvider';
const Wrapper = styled.div`
  background-image: url(${BackgroundImage});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
`;

const BoatShowWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
`;

const MainRoutes = ({refreshPage, SetRefreshFlag, ...props}) => {
  const [key, setKey] = useState('Wrapper');
  const { profile, isAuthenticated } = props;
  let isBoatShow = false;
  let WrapperComp = MainPageTemplate;
  if (isAuthenticated) {
    if (window.location.href.indexOf('login') > -1 ||
    window.location.href.indexOf('forgot-password') > -1 ||
    window.location.href.indexOf('reset-password') > -1 ||
    window.location.href.indexOf('create-password') > -1 ||
    window.location.href.indexOf('confirm-account') > -1) {
      WrapperComp = Wrapper;
    } else if (window.location.href.indexOf('onlineboat') > -1) {
      WrapperComp = BoatShowWrapper;
      isBoatShow = true;
    }
  } else {
    if (window.location.href.indexOf('onlineboat') > -1) {
      WrapperComp = BoatShowWrapper;
      isBoatShow = true;
    } else {
      WrapperComp = Wrapper;
    }
  }

  useEffect(() => {
    if (refreshPage) {
      SetRefreshFlag({
        flag: false,
        success: () => {
          setKey(Math.random());
        }
      });
    }
  });

  let user = {};

  if (isAuthenticated) {
    user = {
      user_id: profile.id,
      email: profile.email,
      name: `${profile.firstName} ${profile.lastName}`
    };
  }
  return (
  <>
  <Router>
    <IntercomProvider>
      <WrapperComp key={key}>
        <Route path="/login/" component={Login} />
        <Route path="/forgot-password/" component={ForgotPassword} />
        <Route path="/reset-password/" component={ResetPassword} />
        <Route path="/create-password/" component={CreatePassword} />
        <Route path="/confirm-account/" component={ConfirmAccount} />
        <Route path="/onlineboatshow" component={BoatShow} />
        <Route path="/onlineboat/done" component={BoatReservationDone} />

        <PrivateRoute exact path="/update-profile" component={UpdateProfile} isAuthenticated={isAuthenticated} />
        <PrivateRoute exact path="/dashboard/" component={Dashboard} isAuthenticated={isAuthenticated} />
        <PrivateRoute exact path="/inbox/" component={Inbox} isAuthenticated={isAuthenticated} />
        <PrivateRoute exact path="/quick-replies/" component={QRBox} isAuthenticated={isAuthenticated} />
        <PrivateRoute exact path="/templates/" component={TemplateBox} isAuthenticated={isAuthenticated} />
        <PrivateRoute exact path="/orders/:id/detail" component={OrderDetails} isAuthenticated={isAuthenticated} />
        <PrivateRoute exact path="/orders/" component={Order} isAuthenticated={isAuthenticated} />
        <PrivateRoute exact path="/order-details/" component={OrderDetails} isAuthenticated={isAuthenticated} />
        <PrivateRoute exact path="/team/:type/list" component={GeneralTeamList} isAuthenticated={isAuthenticated} />
        <PrivateRoute exact path="/team/member-details/" component={TeamDetails} isAuthenticated={isAuthenticated}  />
        <PrivilegeRoute exact path="/team/contractor-details/" component={ContractorDetails } privilege='provider' {...props} />

        <PrivateRoute exact path="/calendar/" component={Calendar} isAuthenticated={isAuthenticated} />

        <PrivilegeRoute exact path="/providers/" component={Providers} privilege='admin' {...props} />
        <PrivilegeRoute exact path="/provider-details/" component={ProviderEditor} privilege='admin' {...props}  />
        <PrivilegeRoute exact path="/invoices/" component={OpenedInvoices} privilege='provider' {...props} />
        <PrivilegeRoute exact path="/services/" component={Services} privilege='provider' {...props} />
        <PrivilegeRoute exact path="/services/new/" component={AddService} privilege='provider' {...props}  />
        <PrivilegeRoute exact path="/service-details/" component={ServiceDetails} privilege='provider' {...props}  />
        <PrivilegeRoute exact path="/categories/" component={Categories} privilege='admin' {...props} />
        <PrivilegeRoute exact path="/category-details/" component={CategoryDetails} privilege='admin' {...props} />
        <PrivilegeRoute exact path="/customers/" component={Customers } privilege='provider' {...props} />
        <PrivilegeRoute exact path="/customer-details/" component={CustomerDetails  } privilege='provider' {...props} />
        <PrivilegeRoute exact path="/users/" component={Users} privilege='admin' {...props} />
        <PrivilegeRoute exact path="/user-details/" component={UserDetails} privilege='admin' {...props} />
        <PrivateRoute exact path="/" component={Dashboard} {...props}  />
      </WrapperComp>
    </IntercomProvider>
  </Router>
  <Intercom appID={isBoatShow ? mmIntercomAppId : intercomAppId}  { ...user } />
  </>
)}
const mapStateToProps = (state) => ({
  isAuthenticated: isAuthenticatedSelector(state),
  loggedInPrivilege: state.auth.privilege,
  refreshPage: state.auth.refreshPage,
  profile: state.profile
});

const mapDispatchToProps = {
  SetRefreshFlag
};
export default connect(mapStateToProps, mapDispatchToProps)(MainRoutes);
