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
  margin-bottom: 45px;
  object-fit: contain;
  object-position: center;
`;

const Title = styled.div`
  margin-bottom: 8px;
  line-height: 20px;
  font-weight: 700;
  font-family: 'Montserrat', sans-serif;
  font-size: 21px;
  color: #0D485F;
  text-align: center;
`;

const Description = styled.div`
  margin-top: 10px;
  padding: 0 20px;
  line-height: 20px;
  font-size: 14px;
  color: #0D485F;
  text-align: center;
  font-family: 'Montserrat', sans-serif;
  color: #0D485F;
  font-style: italic;
  text-align: center;
`;

const Divider = styled.div`
  border-bottom: 1px solid #C2C2C2;
  margin: 30px 0;
  width: 100%;
`;

const ActionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`;

const InputRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
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

const LoginLink = styled(Link)`
  text-decoration: none;
  font-family: Montserrat
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

class RequestForm extends React.Component {
  handleSubmit = (values) => {
    const { onSendRquest } = this.props;
    const { email } = values;
    onSendRquest(email);
  };

  render() {
    return (
      <Form
        onSubmit={this.handleSubmit}
        render={({ handleSubmit, submitting }) => (
          <Wrapper onSubmit={handleSubmit}>
            <Logo src={LogoImage} />
            <Title>Forgot Your Password?</Title>
            <Description>Not to worry. Enter your email, and we'll send you a link to create a new one.</Description>
            <Divider />
            <InputRow>
              <InputLabel>Your Email</InputLabel>
              <InputField
                name="email"
                component="input"
                type="email"
                validate={emailValidation}
              />
              <Error name="email" />
            </InputRow>
            <ActionWrapper>
              <Button
                type="submit"
                disabled={submitting}
              >
                Send Reset Link
              </Button>
              <LoginLink to="/login">Back to Log in</LoginLink>
            </ActionWrapper>
          </Wrapper>
        )}>
      </Form>
    );
  }
}

export default RequestForm;
