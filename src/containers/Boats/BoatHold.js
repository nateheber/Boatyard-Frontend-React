import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import { Form, Field } from 'react-final-form';
import { Row, Col } from 'react-flexbox-grid';
import { get, isEmpty } from 'lodash';
import { toastr } from 'react-redux-toastr';
import InputMask from 'react-input-mask';

import { apiBaseUrl } from 'api/config';
import { validateEmail } from 'utils/basic';
import LoadingSpinner from 'components/basic/LoadingSpinner';
import BackgroundImage from '../../resources/boatshow/boat_show_new_bg.png';
import MMLogo from '../../resources/boatshow/mm_color_logo.png';

const Wrapper = styled.div`
  background-image: url(${BackgroundImage});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: top;
  display: flex;
  width: 100vw;
  justify-content: center;
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ContentWrapper = styled.div`
  margin: 56px auto;
  box-shadow: 0 3px 20px 0 rgba(199, 199, 199, 0.5);
  width: 100%;
  max-width: 600px;
`;

const ContainerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background-color: #FFF;
`;

const Img = styled.img`
  margin: 30px auto 0;
`;

const TitleLabel = styled.div`
  font-family: 'Roboto', sans-serif;
  font-size: 42px;
  color: #3D485C;
  letter-spacing: -1.75px;
  text-align: center;
  padding: 0 50px;
`;

const DescLabel = styled.div`
  font-family: 'Roboto', sans-serif;
  font-size: 21px;
  color: #3D485C;
  text-align: center;
  line-height: 28px;
  margin-top: 5px;
  padding: 0 50px 30px;
`;

const SectionWrapper = styled.div`
  border-top: 2px solid #ECECEC;
  width: 100%;
`;

const SectionContainer = styled.div`
  padding: 25px 50px;
`;

const SectionTitle = styled.div`
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
  font-size: 20px;
  color: #3D4A5E;
  text-align: left;
  margin-bottom: 15px;
`;

const InputRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const InputField = styled(Field)`
  position: relative;
  height: 36px;
  width: 100%;
  background-color: #fff !important;
  padding: 0 10px;
  border: 1px solid #979797;
  border-radius: 8px;
  border-radius: 6px !important;
  outline: none;
  box-sizing: border-box;
  margin-bottom: 5px;
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  line-height: 19px;
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
    color: #C7C7C7;
  }
`;

const MaskInput = styled(InputMask)`
  position: relative;
  height: 36px;
  width: 100%;
  background-color: #fff !important;
  padding: 0 10px;
  border: 1px solid #979797;
  border-radius: 8px;
  border-radius: 6px !important;
  outline: none;
  box-sizing: border-box;
  margin-bottom: 5px;
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  line-height: 19px;
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
    color: #C7C7C7;
  }
`;

const ErrorMessage = styled.div`
  color: #f7941e;
  height: 15px;
  margin-bottom: 5px;
  font-size: 12px;
  font-weight: 600;
  text-transform: none;
`;

const Footer = styled.div`
  background: #FAFAFA;
  width: 100%;
`;

const FooterActionWrapper = styled.div`
  text-align: center;
  padding: 25px 0;
`;
const ActionButton = styled.button`
  background: #DA3128;
  border-radius: 38.5px;
  font-family: 'Roboto', sans-serif;
  font-weight: 900;
  font-size: 24px;
  color: #FFFFFF;
  text-align: center;
  width: 307px;
  height: 77px;
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

const emailValidation = value => (value ? (validateEmail(value) ? undefined : 'Invalid Email') : 'Required');
const required = value => (value ? undefined : 'Required');

class BoatHold extends React.PureComponent {

  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      loading: false
    };
  }

  handleSubmit = (values) => {
    const queryParams = queryString.parse(this.props.location.search);
    console.log(queryParams);
    console.log(values);
    if (queryParams && !isEmpty(queryParams)) {
      this.setState({ loading: true });
      axios.post(`${apiBaseUrl}/reservations`, { reservation: {
        ...queryParams,
        ...values
      }}).then(() => {
        this.setState({ loading: false });
        // toastr.success('Success', 'Boat Reservation Sent Successfully!');
        this.props.history.push('/onlineboat/done');
      }).catch(e =>  {
        this.setState({ loading: false });
        toastr.error('Error', get(e.response, 'data.message'));
      });
    } else {
      toastr.error('Error', 'Missing parameters');
    }
  };

  render() {
    const { loading } = this.state;
    return (
      <Wrapper>
        <ContentWrapper>
          <ContainerWrapper>
          <Form onSubmit={this.handleSubmit}
            render={({ handleSubmit, submitting }) => (
              <FormContainer onSubmit={handleSubmit}>
                <Img src={MMLogo} />
                <TitleLabel>{'Almost There!'}</TitleLabel>
                <DescLabel>{'Enter your information below to reserve years of memorable experiences on the water with a $3,000 deposit. A MarineMax sales professional will assist you, and you’ll have five days to complete your purchase of your new boat.'}</DescLabel>
                <SectionWrapper>
                  <SectionContainer>
                    <SectionTitle>{'Contact'}</SectionTitle>
                    <Row>
                      <Col xs={12} sm={6} md={6}>
                        <InputRow>
                          <InputField
                            name="first_name"
                            component="input"
                            placeholder="First Name"
                            validate={required}
                          />
                          <Error name="first_name" />
                        </InputRow>
                      </Col>
                      <Col xs={12} sm={6} md={6}>
                        <InputRow>
                          <InputField
                            name="last_name"
                            component="input"
                            placeholder="Last Name"
                            validate={required}
                          />
                          <Error name="last_name" />
                        </InputRow>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={12} sm={6} md={6}>
                        <InputRow>
                          <Field
                            name="phone"
                            validate={required}
                          >
                            {props => (
                            <div>
                                <MaskInput {...props.input} placeholder="Phone" mask={'(999) 999-9999'} />
                              </div>
                            )}
                          </Field>
                          <Error name="phone" />
                        </InputRow>
                      </Col>
                      <Col xs={12} sm={6} md={6}>
                        <InputRow>
                          <InputField
                            name="email"
                            type="email"
                            component="input"
                            placeholder="Email"
                            validate={emailValidation}
                          />
                          <Error name="email" />
                        </InputRow>
                      </Col>
                    </Row>
                  </SectionContainer>
                </SectionWrapper>
                <Footer>
                  <SectionWrapper>
                    <SectionContainer>
                      <FooterActionWrapper>
                        <ActionButton
                          type="submit"
                          disabled={submitting}
                        >{'Reserve My Boat'}</ActionButton>
                      </FooterActionWrapper>
                    </SectionContainer>
                  </SectionWrapper>
                </Footer>
              </FormContainer>
            )}>
            </Form>
          </ContainerWrapper>
        </ContentWrapper>
        {loading && <LoadingSpinner style={{ position: 'fixed' }} loading={loading} />}
      </Wrapper>
    );
  }
}

export default withRouter(BoatHold);