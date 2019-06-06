import React from 'react';
import styled from 'styled-components';
import { Form, Field } from 'react-final-form';
import { toastr } from 'react-redux-toastr';

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
  margin-bottom: 56px;
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
  line-height: 24px;
  font-weight: 500;
  font-family: 'Montserrat', sans-serif;
  font-size: 18px;
  color: #0D485F;
  text-align: center;
`;

const InputField = styled(Field)`
  position: relative;
  background: #fff;
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
`;

const Button = styled(OrangeButton)`
  width: 100%;
  margin-bottom: 15px;
  height: 48px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 900;
  font-size: 12px;
  color: #000000;
  text-align: center;
  background-color: #F38118;
  border-radius: 6px;
`;

const PasswordHint = styled.div`
  text-decoration: none;
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  font-size: 12px;
  color: #0D485F;
  text-align: center;
  padding: 0 30px;
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

const required = value => (value ? (value.length >= 6 ? undefined : 'less than 6 characters' ) : 'This field is required.');

class PasswordForm extends React.Component {
  handleSubmit = (values) => {
    const { onResetPassword } = this.props;
    const { newPassword, confirmPassword } = values;
    if (newPassword === confirmPassword) {
      onResetPassword(newPassword);
    } else {
      toastr.error('Error', 'Password does not match');
    }
  };

  render() {
    return (
      <Form
        onSubmit={this.handleSubmit}
        render={({ handleSubmit, submitting }) => (
          <Wrapper onSubmit={handleSubmit}>
            <Logo src={LogoImage} />
            <InputRow>
              <InputLabel>New Password</InputLabel>
              <InputField
                name="newPassword"
                type="password"
                component="input"
                validate={required}
              />
              <Error name="newPassword" />
            </InputRow>
            <InputRow>
              <InputLabel>Confirm Password</InputLabel>
              <InputField
                name="confirmPassword"
                type="password"
                component="input"
                validate={required}
              />
              <Error name="confirmPassword" />
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

export default PasswordForm;
