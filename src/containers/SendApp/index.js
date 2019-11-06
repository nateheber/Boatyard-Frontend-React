import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { Row, Col } from 'react-flexbox-grid';
import { Form, Field } from 'react-final-form';
import InputMask from 'react-input-mask';

import BackgroundImage from '../../resources/sendapp/app_bg.png';
import MMLogo from '../../resources/sendapp/mm_logo_white.png';

const Wrapper = styled.div`
  background-image: url(${BackgroundImage});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  display: flex;
  width: 100vw;
  min-height: 100vh;
  justify-content: center;
`;

const ContentWrapper = styled.div`
  margin: auto;
  background-color: #ECECEC42;
  width: 100%;
  max-width: 382px;
`;

const ContainerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Img = styled.img`
  margin: 70px auto 0;
`;

const TitleLabel = styled.div`
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 24px;
  color: #FFFFFF;
  text-align: center;
  line-height: 29px;
  margin-bottom: 6px;
`;

const DescLabel = styled.div`
  font-family: 'Montserrat', sans-serif;
  color: #FFFFFF;
  font-size: 18px;
  font-weight: 500;
  line-height: 22px;
  text-align: center;
  margin-bottom: 36px;
`;

const SectionWrapper = styled.div`
  width: 100%;
`;

const SectionContainer = styled.div`
  padding: 50px 30px;
  text-align: center;
`;


const InputRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;


const MaskInput = styled(InputMask)`
  position: relative;
  height: 40px;
  width: 100%;
  background-color: #fff;
  padding: 0 10px;
  border-radius: 6px;
  outline: none;
  box-sizing: border-box;
  margin-bottom: 5px;
  font-family: 'Montserrat', sans-serif;
  font-size: 18px;
  font-weight: 500;
  line-height: 22px;
  text-align: center;
  border: none;
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
  &::placeholder {
    color: #CCCCCC;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  height: 15px;
  margin-bottom: 20px;
  font-size: 12px;
  font-weight: 600;
  text-transform: none;
  text-align: left;
`;

const ActionButton = styled.button`
  height: 51px;
  width: 273px;
  border-radius: 10px;
  background-color: #0767A7;
  font-family: 'Roboto', sans-serif;
  color: #F8F6ED;
  font-size: 20px;
  line-height: 26px;
  text-align: center;
  font-weight: 700;
  border: none;
  outline: none;
  text-transform: uppercase;
  cursor: pointer;
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

const required = value => (value ? undefined : 'Phone number cannot be blank.');

class SendApp extends React.PureComponent {
  handleSubmit = (values) => {
    document.location.href='http://marinemax.com/flibs';
  };

  render() {
    return (
      <Wrapper>
        <ContentWrapper>
          <ContainerWrapper>
          <Form onSubmit={this.handleSubmit}
            render={({ handleSubmit, submitting }) => (
              <FormContainer onSubmit={handleSubmit}>
                <Img src={MMLogo} />
                <SectionWrapper>
                  <SectionContainer>
                    <Row>
                      <Col xs={12}>
                        <TitleLabel>{'Welcome To MarineMax!'}</TitleLabel>
                        <DescLabel>{'Enter your phone number below, and we’ll text you a link to download our app.'}</DescLabel>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={12}>
                        <InputRow style={{ maxWidth: 273, margin: 'auto' }}>
                          <Field
                            name="phone"
                            validate={required}
                          >
                            {props => (
                            <div>
                                <MaskInput {...props.input} placeholder="enter phone number" mask={'(999) 999-9999'} />
                              </div>
                            )}
                          </Field>
                          <Error name="phone" />
                        </InputRow>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={12}>
                        <ActionButton
                          type="submit"
                          disabled={submitting}
                        >{'Text Me the app'}</ActionButton>
                      </Col>
                    </Row>
                  </SectionContainer>
                </SectionWrapper>
              </FormContainer>
            )}>
            </Form>
          </ContainerWrapper>
        </ContentWrapper>
      </Wrapper>
    );
  }
}

export default withRouter(SendApp);