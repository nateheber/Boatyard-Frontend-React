import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { isAuthenticatedSelector } from 'store/selectors/auth';
import AuthPageTemplate from './AuthPageTemplate';
import MainPageTemplate from './MainPageTemplate';

class PageTemplate extends React.Component {
  constructor(props) {
    super(props);
    const { isAuthenticated, history, location } = props;
    if (!isAuthenticated) {
      if ((location.search !== null || location.search !== undefined) && location.search.indexOf('redirect_url') < 0) {
        if (!(location.pathname.indexOf('/login') > -1 ||
          location.pathname.indexOf('/forgot-password') > -1 ||
          location.pathname.indexOf('/reset-password') > -1)) {
          history.push({
            pathname: '/login/',
            search: `?redirect_url=${location.pathname}${location.search}`
          });  
        }
      }
    } else {
      if (location.pathname.indexOf('/login') > -1 ||
        location.pathname.indexOf('/forgot-password') > -1 ||
        location.pathname.indexOf('/reset-password') > -1) {
        history.push('/');
      }
    }
  }

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
