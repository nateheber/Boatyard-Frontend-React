import React from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

import AuthRoutes from './authRoutes';
import MainRoutes from './mainRoutes';

class ApplicationRoutes extends React.Component {
  render() {
    const { authToken } = this.props;
    if (isEmpty(authToken)) {
      return <AuthRoutes />;
    }
    return <MainRoutes />;
  }
}

const mapStateToProps = ({ auth: { authToken } }) => ({
  authToken
});

export default connect(mapStateToProps)(ApplicationRoutes);
