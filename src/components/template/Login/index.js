import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { toastr } from 'react-redux-toastr';
import queryString from 'query-string';

import LoginForm from '../Forms/LoginForm';
import { Login, GetUserPermission } from 'store/actions/auth';
import { LoginWithProvider } from 'store/actions/providers';
import WelcomeImage from '../../../resources/auth/welcome-bg.png';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px;
  @media (max-width: 800px) {
    flex-direction: column;
  }
  @media (max-width: 402px) {
    width: calc(100% - 20px);
  }
`;

const SideContent =styled.div`
  display: flex;
  width: 382px;
  min-height: 514px;
  background-color: #ECECEC;
  &.welcome {
    background-image: url(${WelcomeImage});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  @media (max-width: 800px) {
    &.welcome {
      display: none;
    }
  }
  @media (max-width: 402px) {
    width: 100%;
    flex-direction: column;
  }
`;

const WelcomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 54px;
`;

const WelcomeTitle = styled.h1`
  margin-bottom: 14px;
  color: #FFFFFF;
  font-family: Montserrat;
  font-size: 42px;
  font-weight: 700;
`;

const WelcomeBody = styled.div`
  margin-bottom: 14px;
  color: #FFFFFF;
  font-family: Montserrat;
  font-size: 14px;
`;

const WelcomeFooter = styled.div`
  margin-bottom: 14px;
  color: #FFFFFF;
  font-family: Montserrat;
  font-weight: 700;
  font-style: italic;
  font-size: 14px;
`;

class LoginComponent extends React.Component {
  handleLogin = (email, password) => {
    const { Login, GetUserPermission, LoginWithProvider } = this.props;
    const query = queryString.parse(this.props.location.search);
    Login({
      params: {
        email,
        password
      },
      success: () => {
        GetUserPermission({ success: () => {
          if (query.hasOwnProperty('redirect_url')) {
            this.props.history.push(query['redirect_url']);
          } else {
            this.props.history.push('/');
          }
        },
        error: (e) => {
          LoginWithProvider({
            success: () => {
              if (query.hasOwnProperty('redirect_url')) {
                this.props.history.push(query['redirect_url']);
              } else {
                this.props.history.push('/');
              }
            },
            error: (e) => {
              toastr.error('Error', e.message);
            }
          })
        }
      });
      },
      error: (e) => {
        toastr.error('Error', e.message);
      }
    });
  };

  render() {
    return (
      <Wrapper>
        <SideContent>
          <LoginForm onLogin={this.handleLogin} />
        </SideContent>
        <SideContent className="welcome">
          <WelcomeWrapper>
            <WelcomeTitle>Welcome<br /> to Boatyard</WelcomeTitle>
            <WelcomeBody>We're on a mission to connect our community of boaters, marine pros, dealers and marinas.</WelcomeBody>
            <WelcomeFooter>We’re happy to have you on board.</WelcomeFooter>
          </WelcomeWrapper>
        </SideContent>
      </Wrapper>
    );
  }
}

const mapStateToProps = ({ auth: { errorMessage } }) => ({
  errorMessage
});

const mapDispatchToProps = {
  Login,
  GetUserPermission,
  LoginWithProvider
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(LoginComponent)
);
