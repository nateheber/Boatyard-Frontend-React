import React from 'react';
import styled from 'styled-components';

import FormFields from 'components/template/FormFields';

const Wrapper = styled.div`
  margin-bottom: 25px;
  width: 100%;
`

const Title = styled.div`
  font-family: Montserrat;
  font-size: 24px;
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #003247;
`;

const FieldWrapper = styled.div`
  box-sizing: border-box;
  width: 100%;
  background-color: #fafafa;
  margin-top: 25px;
  padding: 23px 25px 9px;
`

export default class ContactInfo extends React.Component {
  getContactInfoField = () => {
    return [
      {
        field: 'first_name',
        label: 'Fist Name',
        type: 'text_field',
        errorMessage: 'Enter first name',
        required: true,
        xs: 12,
        sm: 12,
        md: 2,
        lg: 2,
        xl: 2
      },
      {
        field: 'last_name',
        label: 'Last Name',
        type: 'text_field',
        errorMessage: 'Enter last name',
        required: true,
        xs: 12,
        sm: 12,
        md: 2,
        lg: 2,
        xl: 2
      },
      {
        field: 'email',
        label: 'Email',
        type: 'text_field',
        errorMessage: 'Enter email address',
        required: true,
        xs: 12,
        sm: 12,
        md: 4,
        lg: 4,
        xl: 4
      },
      {
        field: 'phone_number',
        label: 'Phone',
        type: 'text_field',
        errorMessage: 'Enter the phone number',
        mask: '(999)999-9999',
        required: true,
        xs: 12,
        sm: 12,
        md: 4,
        lg: 4,
        xl: 4
      },
    ]
  }
  render() {
    const fields = this.getContactInfoField();
    return (
      <Wrapper>
        <Title>Contact</Title>
        <FieldWrapper>
          <FormFields fieldSize="big" fields={fields} />
        </FieldWrapper>
      </Wrapper>
    )
  }
}