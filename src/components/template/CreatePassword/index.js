import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Row, Col } from 'react-flexbox-grid';
import styled from 'styled-components';
import queryString from 'query-string';
import { get, isEmpty } from 'lodash';
import { toastr } from 'react-redux-toastr';

import { CreatePassword, CreateCustomerPassword, GetUserPermission } from 'store/actions/auth';
import { LoginWithProvider } from 'store/actions/providers';
import PasswordForm from '../Forms/PasswordForm';
import { validateUUID } from 'utils/basic';

import BoatYardLogoImage from '../../../resources/by_logo_2.png';
import MarineMaxLogoImage from '../../../resources/marinemax_logo.png';
import AppleStoreIcon from '../../../resources/icons/apple_store.png';
import PlayStoreIcon from '../../../resources/icons/google_play.png';

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
  max-width: 212px;
  width: 100%;
  margin-bottom: 20px;
  object-fit: contain;
  object-position: center;
`;

const WelcomeTitle = styled.div`
  color: #003247;
  font-size: 26px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  margin-bottom: 20px;
  text-align: center;
`;

const WelcomeDescription = styled.div`
  color: #333;
  font-size: 18px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
  text-align: center;
  line-height: 24px;
  margin-bottom: 30px;
`;

const StoreImage = styled.img`
  width: 100%;
  padding: 10px 0;
  object-fit: contain;
  object-position: center;
`;

class CreatePasswordComponent extends React.Component {
  constructor(props) {
    super(props);
    let token = null;
    let isCustomer = false;
    const query = queryString.parse(this.props.location.search);
    if (query && !isEmpty(query) && Object.prototype.hasOwnProperty.call(query, 'token')) {
      token = query.token;
      if (validateUUID(token)) {
        isCustomer = true;
      }
    }
    this.state = {
      token,
      isCustomer,
      isDoneByCustomer: true,
      isMarineMax: true,
      name: ''
    };
  }

  handleCreatePassword = (password) => {
    const { token, isCustomer } = this.state;
    if (token) {
      const { CreatePassword, CreateCustomerPassword, GetUserPermission, LoginWithProvider } = this.props;
      if (isCustomer) {
        CreateCustomerPassword({
          token,
          password,
          success: (user) => {
            const name = get(user, 'attributes.firstName') || '';
            const isMarineMax = get(user, 'attributes.providerId') === 5;
            this.setState({ isDoneByCustomer: true, name, isMarineMax });
          },
          error: (e) => {
            toastr.error('Error', e.message);
          }
        });
      } else {
        CreatePassword({
          token,
          password,
          success: () => {
            GetUserPermission({
              success: () => {
                this.props.history.push('/');
              },
              error: (e) => {
                LoginWithProvider({
                  success: () => {
                    this.props.history.push('/');
                  },
                  error: (e) => {
                    toastr.error('Error', e.message);
                  }
                });
              }
            });
          },
          error: (e) => {
            toastr.error('Error', e.message);
          }
        });
      }
    } else {
      toastr.error('Error', 'Missing token to reset password');
    }
  };
  render() {
    const { isCustomer, isDoneByCustomer, name, isMarineMax } = this.state;
    let welcomeText = 'Welcome Mykolas!';
    let iOSAppURL = 'https://apps.apple.com/us/app/boatyard/id930751133';
    let androidAppURL = 'https://play.google.com/store/apps/details?id=com.boatyard.clientapp';
    if (name.length > 0) {
      welcomeText = `Welcome ${name}!`
    }
    if (isMarineMax) {
      iOSAppURL = 'https://apps.apple.com/us/app/boatyard/id930751133';
      androidAppURL = 'https://play.google.com/store/apps/details?id=com.boatyard.clientapp';
    }
    return (
      <Wrapper>
        <SideContent className={isCustomer && 'welcome'}>
          {!isDoneByCustomer && <PasswordForm isCreating isCustomer={isCustomer} onResetPassword={this.handleCreatePassword} />}
          {isDoneByCustomer && <WelcomeWrapper>
            <Logo src={isMarineMax ? MarineMaxLogoImage : BoatYardLogoImage} />
            <WelcomeTitle>{welcomeText}</WelcomeTitle>
            <WelcomeDescription>You’ve set your password.<br/>Please use app to fill your information.</WelcomeDescription>
            <Row>
              <Col xs={12} sm={6}>
                <a href={iOSAppURL}>
                  <StoreImage src={AppleStoreIcon} />
                </a>
              </Col>
              <Col xs={12} sm={6}>
                <a href={androidAppURL}>
                  <StoreImage src={PlayStoreIcon} />
                </a>
              </Col>
            </Row>
          </WelcomeWrapper>}
        </SideContent>
      </Wrapper>
    );
  }
}

const mapDispatchToProps = {
  CreatePassword,
  CreateCustomerPassword,
  GetUserPermission,
  LoginWithProvider
};

export default withRouter(connect(null, mapDispatchToProps)(CreatePasswordComponent)
);
