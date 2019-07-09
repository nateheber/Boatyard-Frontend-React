import React from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import Auth0Lock from 'auth0-lock';
import { AUTH_CONFIG } from 'utils/auth0';
import { Login, GetUserPermission, SetAuth0Token, Logout } from 'store/actions/auth';
import { LoginWithProvider } from 'store/actions/providers';
import BYLogo from 'resources/by_logo.png';

const Wrapper = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  p {
    width: 100%;
    font-size: 30px;
    color: #0D485F;
    padding-top: 40%;
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
      console.log('authenticated....');
      this.props.SetAuth0Token({token: authResult.idToken});
      this.handleLogin(authResult.idToken);
    });
  }
  
  componentDidMount() {
    if ( !(/access_token|id_token|error/.test(this.props.location.hash)) ) {
      this.lock.show();
    }
  }

  handleLogin = (auth0Token) => {
    console.log('.handleLogin.');
    const { Login, GetUserPermission, LoginWithProvider } = this.props;
    Login({
      params: {
        auth0Token
      },
      success: () => {
        GetUserPermission({
          success: (res) => {
            // if (res) {
              const index = this.props.location.search.indexOf('redirect_url');
              if (index > -1) {
                const redirectUrl = this.props.location.search.slice(index).replace(/redirect_url=/g, '');
                this.props.history.push(redirectUrl);
              } else {
                console.log('push...');
                this.props.history.push('/');
              }
            // } else {
            //   this.props.Logout();
            //   toastr.error("Error", "Something went wrong. Please login again.");
            // }
          },
          error: (e) => {
            LoginWithProvider({
              success: () => {
                const index = this.props.location.search.indexOf('redirect_url');
                if (index > -1) {
                  const index = this.props.location.search.indexOf('redirect_url');
                  const redirectUrl = this.props.location.search.slice(index).replace(/redirect_url=/g, '');
                  this.props.history.push(redirectUrl);
                } else {
                  this.props.history.push('/');
                }
              },
              error: (e) => {
                toastr.error('Error', e.message);
              }
            });
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
    console.log(auth0Token && 'LOADING>>>>');
    return (
      <Wrapper>
        {
          auth0Token && <p>Loading...</p>
        }
      </Wrapper>
    );
  }
}

const mapStateToProps = ({ auth: { errorMessage, auth0Token } }) => ({
  errorMessage,
  auth0Token
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
