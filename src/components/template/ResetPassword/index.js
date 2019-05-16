import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

import { Login } from 'store/actions/auth';
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

class ResetPassword extends React.Component {
  handleResetPassword = (password) => {
    console.log('------------password-------------', password);
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

const mapStateToProps = ({ auth: { errorMessage } }) => ({
  errorMessage
});

const mapDispatchToProps = {
  Login
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ResetPassword)
);
