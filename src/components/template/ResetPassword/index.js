import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import queryString from 'query-string';
import { isEmpty } from 'lodash';
import { toastr } from 'react-redux-toastr';
import { Logo, WelcomeTitle, WelcomeDescription, WelcomeWrapper, WelcomeMMDescription } from '../CreatePassword';
import BoatYardLogoImage from '../../../resources/by_logo_2.png';
import MMLogoImage from '../../../resources/mm-logo.png';
import { ResetPassword } from 'store/actions/auth';
import PasswordForm from '../Forms/PasswordForm';
import { BlueButton } from '../../basic/Buttons';


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
  @media (max-width: 402px) {
    width: 100%;
    flex-direction: column;
  }
`;

const MMButton = styled(BlueButton)`
  width: 100%;
  margin-bottom: 15px;
  height: 48px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 900;
  font-size: 12px;
  color: #000000;
  text-align: center;
  background-color: #0767A7;
  border-radius: 12px;
`;

class ResetPasswordComponent extends React.Component {
  state = {
    done: false,
    redirect: ''
  };

  componentDidMount = () => {
    let params = this.getParams(window.location.href);
    if (params.hasOwnProperty('redirect_uri')) {
      this.setState({redirect: params.redirect_uri});
    }
  }

  getParams = (url) => {
    var params = {};
    var parser = document.createElement('a');
    parser.href = url;
    var query = parser.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split('=');
      params[pair[0]] = decodeURIComponent(pair[1]);
    }
    return params;
  };

  handleResetPassword = (password) => {
    const query = queryString.parse(this.props.location.search);
    if (query && !isEmpty(query) && Object.prototype.hasOwnProperty.call(query, 'token')) {
      const token = query.token;
      const { ResetPassword } = this.props;
      ResetPassword({
        token,
        password,
        success: () => {
          toastr.success('Success', 'Your password has been reset!')
          this.setState({done: true});
        },
        error: (e) => {
          toastr.error('Error', e.message);
        }
      });
    } else {
      toastr.error('Error', 'Missing token to reset password');
    }
  };

  proceedToLogin = () => {
    const { redirect } = this.state;
    if (redirect !== '') {
      window.location.href = redirect;
    } else {
      this.props.history.push('/login');
    }
  }

  render() {
    const location = window.location.href.includes('marinemax') ? 'marine-max' : 'boatyard';
    return (
      <Wrapper>
        <SideContent>
          { !this.state.done && <PasswordForm onResetPassword={this.handleResetPassword} location={location}/> }
          {
            this.state.done &&
            <WelcomeWrapper>
              <Logo src={location === 'boatyard' ? BoatYardLogoImage : MMLogoImage} />
              <WelcomeTitle>Thank you!</WelcomeTitle>
              {location === 'marine-max' ? 
                <WelcomeDescription>Your password has been reset.<br />Please click the button below to log in to your account.</WelcomeDescription> :
                <WelcomeMMDescription>Your password has been reset.<br />You can now open your app to log in to your account.</WelcomeMMDescription>
              }
              {location === 'marine-max' && <MMButton
                type="submit"
                onClick={this.proceedToLogin}
              >
                Login
              </MMButton>}
            </WelcomeWrapper>
          }
        </SideContent>
      </Wrapper>
    );
  }
}

const mapDispatchToProps = {
  ResetPassword
};

export default withRouter(connect(null, mapDispatchToProps)(ResetPasswordComponent)
);
