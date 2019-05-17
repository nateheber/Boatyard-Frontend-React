import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import queryString from 'query-string';
import { isEmpty } from 'lodash';
import { toastr } from 'react-redux-toastr';

import { ResetPassword } from 'store/actions/auth';
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

class ResetPasswordComponent extends React.Component {
  handleResetPassword = (password) => {
    const query = queryString.parse(this.props.location.search);
    if (query && !isEmpty(query) && Object.prototype.hasOwnProperty.call(query, 'token')) {
      const token = query.token;
      const { ResetPassword } = this.props;
      ResetPassword({
        token,
        password,
        success: () => {
          toastr.success('Success', 'Updated successfully!')
          this.props.history.push('/login');
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
          <PasswordForm onResetPassword={this.handleResetPassword} />
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
