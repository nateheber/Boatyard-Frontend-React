import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Form, Field } from 'react-final-form'

import { login } from 'store/reducers/auth';
import { OrangeButton } from 'components/basic/Buttons';
import LogoImage from '../../../../resources/by_logo_2.png';

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
  margin-top: 20px;
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
  background: #fff;
  padding: 0 15px;
  border: 1px solid #dfdfdf;
  height: 40px;
  width: 100%;
  border-radius: 6px !important;
  outline: none;
  box-sizing: border-box;
  font-family: 'Source Sans Pro', sans-serif;
  font-size: 18px;
  margin-bottom: 20px;
  &:disabled {
    background: #f1f1f1;
  }
`;

const Button = styled(OrangeButton)`
  width: 100%;
  margin-bottom: 15px;
  height: 48px;
  font-family: Montserrat;
  font-weight: 900;
  font-size: 12px;
  color: #000000;
  text-align: center;
  background-color: #F38118;
  border-radius: 6px;
`;

const PasswordHint = styled.div`
  text-decoration: none;
  font-family: Montserrat;
  font-weight: 600;
  font-size: 12px;
  color: #0D485F;
  text-align: center;
  padding: 0 30px;
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

class PasswordForm extends React.Component {
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
    // const { onLogin } = this.props;
    // const { newPassword, confirmPassword } = values;
    // onLogin(email, password);
  };
  render() {
    return (
      <Form
        onSubmit={this.login}
        render={({ handleSubmit, submitting }) => (
          <Wrapper onSubmit={handleSubmit}>
            <Logo src={LogoImage} />
            <InputRow>
              <InputLabel>New Password</InputLabel>
              <InputField
                name="newPassword"
                type="password"
                component="input"
                placeholder="Password"
                validate={required}
              />
              <Error name="password" />
            </InputRow>
            <InputRow>
              <InputLabel>Confirm Password</InputLabel>
              <InputField
                name="confirmPassword"
                type="password"
                component="input"
                placeholder="Password"
                validate={required}
              />
              <Error name="password" />
            </InputRow>
            <ActionWrapper>
              <Button
                type="submit"
                disabled={submitting}
              >
                Reset Password
              </Button>
              <PasswordHint>*Passwords must be at least six characters long.</PasswordHint>
            </ActionWrapper>
          </Wrapper>
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
)(PasswordForm);
