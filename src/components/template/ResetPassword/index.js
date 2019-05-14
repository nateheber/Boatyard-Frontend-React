import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

import { login } from 'store/reducers/auth';
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
  height: 514px;
  background-color: #ECECEC;
  @media (max-width: 402px) {
    width: 100%;
    flex-direction: column;
  }
`;

class ResetPassword extends React.Component {
  login = (email, password) => {
    this.props.login({ email, password });
  };
  render() {
    return (
      <Wrapper>
        <SideContent>
          <PasswordForm onLogin={this.login} />
        </SideContent>
      </Wrapper>
    );
  }
}

const mapStateToProps = ({ auth: { errorMessage } }) => ({
  errorMessage
});

const mapDispatchToProps = {
  login
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ResetPassword)
);
