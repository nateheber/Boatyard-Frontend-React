import React from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import Auth0Lock from 'auth0-lock';
import { AUTH_CONFIG } from 'utils/auth0';
import { isAuthenticatedSelector } from 'store/selectors/auth';
import { Login, GetUserPermission, SetAuth0Token, Logout } from 'store/actions/auth';
import { LoginWithProvider } from 'store/actions/providers';
import BYLogo from 'resources/by_logo.png';
import axios from 'axios';

const Wrapper = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  p {
    width: 100%;
    font-size: 30px;
    color: #0D485F;
    padding-top: 60vh;
    text-align: center;
    font-weight: bold;
  }
`;

class LoginComponent extends React.Component {
  

  constructor(props) {
    super(props);
    if (!props.auth0Token) {
      this.lock = new Auth0Lock(AUTH_CONFIG.clientId, AUTH_CONFIG.domain, {
        closable: false,
        rememberLastLogin: false,
        auth: {
          responseType: 'token id_token',
        },
        languageDictionary: {
          title: 'Boatyard'
        },
        theme: {
          primaryColor: '#0D485F',
          logo: BYLogo,
        }
      });
      this.onAuthenticated = this.onAuthenticated.bind(this);
      this.onAuthenticated();
    } else {
      this.handleLogin(props.auth0Token);
    } 
  }

  onAuthenticated() {
    this.lock.on('authenticated', (authResult) => {
      this.props.SetAuth0Token({token: authResult.idToken});
      this.handleLogin(authResult.idToken);

    });
  }
  
  componentDidMount() {
    if ( !this.props.isAuthenticated && !(/access_token|id_token|error/.test(this.props.location.hash)) ) {
      this.lock.show();
    }
  }

  handleLogin = (auth0Token) => {
    // const that = this;
    const { Login, GetUserPermission, history } = this.props;
    Login({
      params: {
        auth0Token
      },
      success: (profileData) => {
        console.log(profileData);
        // if (profileData.email.indexOf('@marinemax.com') > -1) {
        //   // window.open('https://fs.marinemax.com/adfs/ls/?wa=wsignout1.0');
        //   document.getElementById('frame').src="https://fs.marinemax.com/adfs/ls/?wa=wsignout1.0";
        // }
        GetUserPermission({
          success: (res) => {
            console.log(res);
            window.setTimeout(() => history.push('/dashboard'), 50);
              // console.log(res);
              // const index = this.props.location.search.indexOf('redirect_url');
              // if (index > -1) {
              //   const redirectUrl = this.props.location.search.slice(index).replace(/redirect_url=/g, '');
              //   history.push(redirectUrl);
              // } else {
              //   history.push('/dashboard/');
              // }
          },
          error: (e) => {
            this.props.Logout();
            toastr.error('Error', e.message);
          }
        });
      },
      error: (e) => {
        this.props.Logout();
        toastr.error('Error', e.message);
      }
    });
  };

  render() {
    const { auth0Token } = this.props;
    return (
      <Wrapper>
        {
          auth0Token && <p>Loading...</p>
        }
      </Wrapper>
    );
  }
}

const mapStateToProps = (state) => ({
  errorMessage: state.auth.errorMessage,
  auth0Token: state.auth.auth0Token,
  isAuthenticated: isAuthenticatedSelector(state),
});

const mapDispatchToProps = {
  Login,
  GetUserPermission,
  LoginWithProvider,
  SetAuth0Token,
  Logout
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(LoginComponent)
);
