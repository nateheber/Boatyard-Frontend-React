import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Form, Field } from 'react-final-form';

import { OrangeButton } from 'components/basic/Buttons';
import LogoImage from '../../../../resources/by_logo_2.png';
import { validateEmail } from 'utils/basic';

const Wrapper = styled.form`
  padding: 45px 54px;
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
  margin-bottom: 36px;
  object-fit: contain;
  object-position: center;
`;

const ActionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  margin-top: 10px;
`;

const InputRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const InputLabel = styled.div`
  margin-bottom: 8px;
  line-height: 20px;
  font-weight: 600;
  font-family: Montserrat;
  font-size: 18px;
  color: #0D485F;
  text-align: center;
`;

const InputField = styled(Field)`
  position: relative;
  background-color: #fff !important;
  padding: 0 15px;
  border: none;
  height: 40px;
  width: 100%;
  border-radius: 6px !important;
  outline: none;
  box-sizing: border-box;
  font-family: 'Source Sans Pro', sans-serif;
  font-size: 18px;
  margin-bottom: 5px;
  &:disabled {
    background: #f1f1f1;
  }
  &:-internal-autofill-selected,
  &:-webkit-autofill,
  &:-webkit-autofill:hover, 
  &:-webkit-autofill:focus {
    border: none;
    background-color: #fff !important;
  }
`;

const Button = styled(OrangeButton)`
  width: 100%;
  margin-bottom: 15px;
  height: 48px;
  font-family: Montserrat;
  font-size: 12px;
  color: #000000;
  text-align: center;
  background-color: #F38118;
  border-radius: 6px;
  font-weight: 900;
`;

const ForgotLink = styled(Link)`
  text-decoration: none;
  font-family: Montserrat;
  font-weight: 600;
  font-size: 12px;
  color: #0D485F;
  text-align: center;
`;

const ErrorMessage = styled.div`
  color: #f7941e;
  height: 20px;
  margin-bottom: 5px;
  font-size: 14px;
  font-weight: 600;
  text-transform: none;
`;

const Error = ({ name }) => (
  <Field
    name={name}
    subscribe={{ touched: true, error: true }}
    render={({ meta: { touched, error } }) =>
      touched && error ? <ErrorMessage>{error}</ErrorMessage> : <ErrorMessage />
    }
  />
);

const emailValidation = value => (value ? (validateEmail(value) ? undefined : 'Invalid Email') : 'This field is required.');
const required = value => (value ? (value.length >= 6 ? undefined : 'less than 6 characters' ) : 'This field is required.');
// const required = value => (value ? undefined : 'This field is required.')

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

  handleSubmit = (values) => {
    const { onLogin } = this.props;
    const { email, password } = values;
    onLogin(email, password);
  };

  render() {
    return (
      <Form
        onSubmit={this.handleSubmit}
        render={({ handleSubmit, submitting }) => (
          <Wrapper onSubmit={handleSubmit}>
            <Logo src={LogoImage} />
            <InputRow>
              <InputLabel>Email</InputLabel>
              <InputField
                name="email"
                component="input"
                type="email"
                validate={emailValidation}
              />
              <Error name="email" />
            </InputRow>
            <InputRow>
              <InputLabel>Password</InputLabel>
              <InputField
                name="password"
                type="password"
                component="input"
                validate={required}
              />
              <Error name="password" />
            </InputRow>
            <ActionWrapper>
              <Button
                type="submit"
                disabled={submitting}
              >
                Login
              </Button>
              <ForgotLink to="/forgot-password">Forgot Password?</ForgotLink>
            </ActionWrapper>
          </Wrapper>
        )}>
      </Form>
    );
  }
}

export default LoginForm;
