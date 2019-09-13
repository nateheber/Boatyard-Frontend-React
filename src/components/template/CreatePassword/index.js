import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import queryString from 'query-string';
import { get, isEmpty } from 'lodash';
import { toastr } from 'react-redux-toastr';

import { CreatePassword, CreateCustomerPassword, GetUserPermission } from 'store/actions/auth';
import PasswordForm from '../Forms/PasswordForm';
import LoadingSpinner from 'components/basic/LoadingSpinner';

import { validateUUID } from 'utils/basic';

import BoatYardLogoImage from '../../../resources/by_logo_2.png';

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

export const WelcomeWrapper = styled.div`
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

export const Logo = styled.img`
  max-width: 212px;
  width: 100%;
  margin-bottom: 20px;
  object-fit: contain;
  object-position: center;
`;

export const WelcomeTitle = styled.div`
  color: #003247;
  font-size: 26px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  margin-bottom: 30px;
  text-align: center;
`;

export const WelcomeDescription = styled.div`
  color: #333;
  font-size: 18px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
  text-align: center;
  line-height: 26px;
  margin-bottom: 30px;
  padding: 0 20px;
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
      isDoneByCustomer: false,
      name: '',
      loading: false
    };
  }

  handleCreatePassword = (password) => {
    const { token, isCustomer } = this.state;
    if (token) {
      const { CreatePassword, CreateCustomerPassword, GetUserPermission } = this.props;
      this.setState({ loading: true });
      if (isCustomer) {
        CreateCustomerPassword({
          token,
          password,
          success: (user) => {
            const name = get(user, 'attributes.firstName') || '';
            this.setState({ isDoneByCustomer: true, name, loading: false });
          },
          error: (e) => {
            this.setState({ loading: false });
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
                this.setState({ loading: false });
                this.props.history.push('/');
              },
              error: (e) => {
                this.setState({ loading: false });
                toastr.error('Error', e.message);
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
    const { isCustomer, isDoneByCustomer, name, loading } = this.state;
    let welcomeText = 'Thank you!';
    if (name.length > 0) {
      welcomeText = `Thank you. ${name}!`
    }
    return (
      <Wrapper>
        <SideContent>
          {!isDoneByCustomer && <PasswordForm isCreating isCustomer={isCustomer} onResetPassword={this.handleCreatePassword} />}
          {isDoneByCustomer && <WelcomeWrapper>
            <Logo src={BoatYardLogoImage} />
            <WelcomeTitle>{welcomeText}</WelcomeTitle>
            <WelcomeDescription>Your password is set.<br />You can now open your app to log in to your account.</WelcomeDescription>
          </WelcomeWrapper>}
        </SideContent>
        {loading && <LoadingSpinner loading={loading} />}
      </Wrapper>
    );
  }
}

const mapDispatchToProps = {
  CreatePassword,
  CreateCustomerPassword,
  GetUserPermission
};

export default withRouter(connect(null, mapDispatchToProps)(CreatePasswordComponent)
);
