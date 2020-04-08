import React from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { toastr } from 'react-redux-toastr';
import Auth0Lock from 'auth0-lock';
import { AUTH_CONFIG } from 'utils/auth0';
import { isAuthenticatedSelector } from 'store/selectors/auth';
import { Login, GetUserPermission, SetAuth0Token, Logout } from 'store/actions/auth';
import { LoginWithProvider } from 'store/actions/providers';
import BYLogo from 'resources/by_logo.png';
import { OrangeButton } from 'components/basic/Buttons';

const Wrapper = styled.div`
  // position: fixed;
  // left: 0;
  // top: 0;
  // width: 100%;
  // height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  p {
    width: 100%;
    font-size: 30px;
    color: #0D485F;
    padding-top: 60vh;
    text-align: center;
    font-weight: bold;
  }
`;

const SideContent =styled.div`
  display: flex;
  width: 382px;
  min-height: 514px;
  background-color: #ECECEC;
  @media (max-width: 402px) {
    width: 100%;
    flex-direction: column;
  }
  &.welcome {
    min-height: initial;
  }
`;

const WelcomeWrapper = styled.div`
  padding: 45px 30px;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  @media (max-width: 402px) {
    padding: 20px;
    width: initial;
  }
`;

const Logo = styled.img`
  max-width: 100px;
  width: 100%;
  margin-bottom: 20px;
  object-fit: contain;
  object-position: center;
`;

const WelcomeTitle = styled.div`
  color: #0D485F;
  font-size: 30px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  margin-bottom: 30px;
  text-align: center;
`;

const WelcomeDescription = styled.div`
  color: #0D485F;
  font-size: 20px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
  text-align: center;
  line-height: 26px;
  margin-bottom: 30px;
  padding: 0 20px;
`;

const Button = styled(OrangeButton)`
  font-size: 16px;
  min-width: 180px;
  margin-top: 100px;
  height: 60px;
`;
class LoginComponent extends React.Component {
  state = {
    showConfirm: false
  }

  constructor(props) {
    super(props);
    const query = queryString.parse(props.location.search);
    if (!props.auth0Token) {
      this.lock = new Auth0Lock(AUTH_CONFIG.clientId, AUTH_CONFIG.domain, {
        closable: false,
        rememberLastLogin: false,
        configurationBaseUrl: 'https://cdn.auth0.com',
        initialScreen: query.action === 'signup' ? 'signUp' : '',
        prefill: {
          email: query.email ? query.email : ''
        },
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
    const { Login, GetUserPermission } = this.props;
    Login({
      params: {
        auth0Token
      },
      success: (profileData) => {
        // if (profileData.email.indexOf('@marinemax.com') > -1) {
        //   // window.open('https://fs.marinemax.com/adfs/ls/?wa=wsignout1.0');
        //   document.getElementById('frame').src="https://fs.marinemax.com/adfs/ls/?wa=wsignout1.0";
        // }
        GetUserPermission({
          success: (res) => {
            window.setTimeout(() => window.location.href = '/dashboard'); //history.push('/dashboard'), 50);
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
        if (e.message === 'Auth0 Profile Not Yet Verified') {
          this.setState({showConfirm: true});
        } else {
          toastr.error('Error', e.message);
        }
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
        {
          this.state.showConfirm && <SideContent>
            <WelcomeWrapper>
            <Logo src={BYLogo} />
            <WelcomeTitle>Welcome</WelcomeTitle>
            <WelcomeDescription>Please click the link in your email to verify your account.</WelcomeDescription>
            <Button onClick={() => document.location.reload(true)}>Login</Button>
          </WelcomeWrapper>
          </SideContent>
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