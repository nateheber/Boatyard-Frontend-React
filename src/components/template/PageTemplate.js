import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { isAuthenticatedSelector } from 'store/selectors/auth';
import Intercom from 'components/basic/Intercom';
import { intercomAppId } from '../../api/config';
import { SetRefreshFlag } from 'store/actions/auth';
import AuthPageTemplate from './AuthPageTemplate';
import MainPageTemplate from './MainPageTemplate';

class PageTemplate extends React.Component {
  constructor(props) {
    super(props);
    this.changeLocation();
    this.state = {
      key: Math.random()
    };
  }

  componentWillMount() {
    this.unlisten = this.props.history.listen((location, action) => {
      IntercomAPI('update', { page_changed_at: Date.now() });
    });    
  }

  componentWillUnmount() {
    this.unlisten();
  }

  componentDidUpdate(prevProps) {
    const { refreshPage, SetRefreshFlag } = this.props;
    if ((prevProps.isAuthenticated !== this.props.isAuthenticated) ||
      (prevProps.location.pathname !== this.props.location.pathname)) {
      this.changeLocation();
    }
    if (refreshPage) {
      SetRefreshFlag({
        flag: false,
        success: () => {
          this.setState({ key: Math.random() });
        }
      });
    }
  }

  changeLocation = () => {
    const { isAuthenticated, history, location } = this.props;
    if (!isAuthenticated) {
      if ((location.search !== null || location.search !== undefined) && location.search.indexOf('redirect_url') < 0) {
        if (!(location.pathname.indexOf('/login') > -1 ||
          location.pathname.indexOf('/forgot-password') > -1 ||
          location.pathname.indexOf('/reset-password') > -1 ||
          location.pathname.indexOf('/create-password') > -1)) {
          history.push({
            pathname: '/login/',
            // search: `?redirect_url=${location.pathname}${location.search}`
          });  
        }
      }
    } else {
      if (location.pathname.indexOf('/login') > -1 ||
        location.pathname.indexOf('/forgot-password') > -1 ||
        location.pathname.indexOf('/reset-password') > -1 ||
        location.pathname.indexOf('/create-password') > -1) {
        history.push('/');
      }
    }
  }

  render() {
    const { isAuthenticated, profile } = this.props;
    const { key } = this.state;
    let user = {};
    if (isAuthenticated) {
      user = {
        user_id: profile.id,
        email: profile.email,
        name: `${profile.firstName} ${profile.lastName}`
      };
    }
    return (
      <React.Fragment>
        {isAuthenticated ? 
          <MainPageTemplate key={key}>
            {this.props.children}
          </MainPageTemplate>
        :
          <AuthPageTemplate key={key}>
            {this.props.children}
          </AuthPageTemplate>
        }
        <Intercom appID={intercomAppId}  { ...user } />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: isAuthenticatedSelector(state),
  providerToken: state.auth.providerToken,
  adminToken: state.auth.adminToken,
  refreshPage: state.auth.refreshPage,
  profile: state.profile
});

const mapDispatchToProps = {
  SetRefreshFlag
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PageTemplate));
