import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

import LoginForm from './Forms/LoginForm';

import { login } from 'store/reducers/auth';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  padding: 42px 50px 45px;
  @media (max-width: 694px) {
    padding: 30px;
  }
`;

export const PageTitle = styled.h2`
  color: #004258;
  font-weight: 700;
  display: inline-block;
  margin: 0;
  padding: 5px 0 30px;
  font-family: 'Montserrat', sans-serif !important;
  font-size: 36px;
  &.centered {
    text-align: center;
  }
`;

class Login extends React.Component {
  login = (email, password) => {
    this.props.login({ email, password });
  };
  render() {
    return (
      <Wrapper>
        <PageTitle className="centered">Login</PageTitle>
        <LoginForm onLogin={this.login} />
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
  )(Login)
);
