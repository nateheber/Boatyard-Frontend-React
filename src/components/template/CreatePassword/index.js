import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import queryString from 'query-string';
import { isEmpty } from 'lodash';
import { toastr } from 'react-redux-toastr';

import { CreatePassword, GetUserPermission } from 'store/actions/auth';
import { LoginWithProvider } from 'store/actions/providers';
import PasswordForm from '../Forms/PasswordForm';


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

class CreatePasswordComponent extends React.Component {
  handleCreatePassword = (password) => {
    const query = queryString.parse(this.props.location.search);
    if (query && !isEmpty(query) && Object.prototype.hasOwnProperty.call(query, 'token')) {
      const token = query.token;
      const { CreatePassword, GetUserPermission, LoginWithProvider } = this.props;
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
    } else {
      toastr.error('Error', 'Missing token to reset password');
    }
  };
  render() {
    return (
      <Wrapper>
        <SideContent>
          <PasswordForm isCreating onResetPassword={this.handleCreatePassword} />
        </SideContent>
      </Wrapper>
    );
  }
}

const mapDispatchToProps = {
  CreatePassword,
  GetUserPermission,
  LoginWithProvider
};

export default withRouter(connect(null, mapDispatchToProps)(CreatePasswordComponent)
);
