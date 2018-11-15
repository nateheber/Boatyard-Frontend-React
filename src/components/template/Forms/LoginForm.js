import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { InputRow, InputWrapper, InputLabel, Input } from '../../basic/Input';
import { OrangeButton } from '../../basic/Buttons';

import { login } from '../../../reducers/auth';

const Wrapper = styled.div`
  padding: 0px 15px;
`;

const ActionWrapper = styled.div`
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ForgotLink = styled(Link)`
  text-decoration: none;
  color: #004258;
  margin-top: 15px;
`;

const ErrorMessage = styled.div`
  color: #f7941e;
  margin-top: -0.75em;
  margin-bottom: 1em;
`;

class LoginForm extends React.Component {
  state = {
    email: '',
    emailError: '',
    password: '',
    passwordError: ''
  };
  changeEmail = evt => {
    this.setState({
      email: evt.target.value
    });
  };
  changePassword = evt => {
    this.setState({
      password: evt.target.value
    });
  };
  login = () => {
    const { email, password } = this.state;
    const regex = /^[\w-]+(\.[\w-]+)*@([a-z0-9-]+(\.[a-z0-9-]+)*?\.[a-z]{2,6}|(\d{1,3}\.){3}\d{1,3})(:\d{4})?$/;
    if (email === '') {
      this.setState({
        emailError: 'This field is required'
      });
      return;
    } else if (!email.match(regex)) {
      this.setState({
        emailError: 'Please enter a vaild email address'
      });
      return;
    }
    if (password === '') {
      this.setState({
        passwordError: 'This field is required'
      });
      return;
    }
    this.setState({
      emailError: '',
      passwordError: ''
    });
    this.props.onLogin({
      email,
      password
    });
  };
  render() {
    const { email, password, emailError, passwordError } = this.state;
    return (
      <Wrapper>
        <InputRow>
          <InputWrapper className="primary">
            <InputLabel>Email</InputLabel>
            <Input type="text" onChange={this.changeEmail} value={email} />
            {emailError && <ErrorMessage>{emailError}</ErrorMessage>}
          </InputWrapper>
        </InputRow>
        <InputRow>
          <InputWrapper className="primary">
            <InputLabel>Password</InputLabel>
            <Input
              type="text"
              onChange={this.changePassword}
              value={password}
            />
            {passwordError && <ErrorMessage>{passwordError}</ErrorMessage>}
          </InputWrapper>
        </InputRow>
        <ActionWrapper>
          <OrangeButton
            style={{ display: 'inline-block', width: '100px' }}
            onClick={this.login}
          >
            Login
          </OrangeButton>
          <ForgotLink to="/forgot-password/">Forgot Password?</ForgotLink>
        </ActionWrapper>
      </Wrapper>
    );
  }
}

const mapDispatchToProps = {
  login
};

export default connect(
  null,
  mapDispatchToProps
)(LoginForm);
