import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

import { PageTitle } from 'components/basic/Typho';
import LoginForm from './Forms/LoginForm';

import { login } from 'reducers/auth';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  height: 100%;
  padding: 30px;
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
