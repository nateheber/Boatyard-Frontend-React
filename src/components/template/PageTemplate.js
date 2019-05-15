import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { isAuthenticatedSelector } from 'store/selectors/auth';
import AuthPageTemplate from './AuthPageTemplate';
import MainPageTemplate from './MainPageTemplate';

class PageTemplate extends React.Component {
  render() {
    const { isAuthenticated } = this.props;
    return (
      <React.Fragment>
        {isAuthenticated ? 
          <MainPageTemplate>
            {this.props.children}
          </MainPageTemplate>
        :
          <AuthPageTemplate>
            {this.props.children}
          </AuthPageTemplate>
        }
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: isAuthenticatedSelector(state)
});

export default withRouter(connect(mapStateToProps)(PageTemplate));
