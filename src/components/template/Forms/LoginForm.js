import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Form, Field } from 'react-final-form'

import { login } from 'store/reducers/auth';
import { InputRow, InputWrapper, InputLabel } from 'components/basic/Input';
import { OrangeButton } from 'components/basic/Buttons';

const Wrapper = styled.div`
  padding: 0px 15px;
`;

const ActionWrapper = styled.div`
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Label = styled(InputLabel)`
  color: #004258;
  margin-bottom: 5px;
  line-height: 20px;
  font-weight: 600;
`;

const InputField = styled(Field)`
  position: relative;
  background: #fff;
  padding: 0 15px;
  margin-bottom: 15px;
  border: 1px solid #dfdfdf;
  height: 35px;
  width: 100%;
  border-radius: 6px !important;
  outline: none;
  box-sizing: border-box;
  font-family: 'Source Sans Pro', sans-serif;
  font-size: 14px;
  &:disabled {
    background: #f1f1f1;
  }
`;

const Button = styled(OrangeButton)`
  margin-bottom: 15px;
  padding: 10px 30px;
  min-width: initial;
  height: initial;
`;

const ForgotLink = styled(Link)`
  text-decoration: none;
  color: #004258;
  font-size: 14px;
`;

const ErrorMessage = styled.div`
  color: #f7941e;
  margin-top: -0.75em;
  margin-bottom: 1em;
  font-size: 14px;
  font-weight: 600;
  text-transform: none;
`;

const Error = ({ name }) => (
  <Field
    name={name}
    subscribe={{ touched: true, error: true }}
    render={({ meta: { touched, error } }) =>
      touched && error ? <ErrorMessage>{error}</ErrorMessage> : null
    }
  />
);

const required = value => (value ? undefined : 'This field is required.')

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
  login = (values) => {
    const { onLogin } = this.props;
    const { email, password } = values;
    onLogin(email, password);
  };
  render() {
    return (
      <Form
        onSubmit={this.login}
        render={({ handleSubmit, submitting }) => (
          <form onSubmit={handleSubmit}>
            <Wrapper>
              <InputRow>
                <InputWrapper className="primary">
                  <Label>Email</Label>
                  <InputField
                    name="email"
                    component="input"
                    type="email"
                    placeholder="Email"
                    validate={required}
                  />
                  <Error name="email" />
                </InputWrapper>
              </InputRow>
              <InputRow>
                <InputWrapper className="primary">
                  <Label>Password</Label>
                  <InputField
                    name="password"
                    type="password"
                    component="input"
                    placeholder="Password"
                    validate={required}
                  />
                  <Error name="password" />
                </InputWrapper>
              </InputRow>
              <ActionWrapper>
                <Button
                  type="submit"
                  disabled={submitting}
                >
                  Login
                </Button>
                <ForgotLink to="/forgot-password/">Forgot Password?</ForgotLink>
              </ActionWrapper>
            </Wrapper>
          </form>
        )}>
      </Form>
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
