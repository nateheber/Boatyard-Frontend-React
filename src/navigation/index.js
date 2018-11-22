import React from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

import AuthRoutes from './authRoutes';
import MainRoutes from './mainRoutes';

class ApplicationRoutes extends React.Component {
  render() {
    const { adminToken, providerToken } = this.props;
    if (isEmpty(adminToken) && isEmpty(providerToken)) {
      return <AuthRoutes />;
    }
    return <MainRoutes />;
  }
}

const mapStateToProps = ({ auth: { adminToken, providerToken } }) => ({
  adminToken,
  providerToken
});

export default connect(mapStateToProps)(ApplicationRoutes);
