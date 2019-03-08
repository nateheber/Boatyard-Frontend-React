import React from 'react';
import styled from 'styled-components';

import FormFields from 'components/template/FormFields';

const Wrapper = styled.div`
  margin-bottom: 44px;
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

export default class ComanyInfo extends React.Component {
  getCompanyFieldInfo = () => {
    const { defaultValues: { name, street, city, state, zip, websiteUrl } } = this.props;
    return [
      {
        field: 'name',
        label: 'Company Name',
        type: 'text_field',
        defaultValue: name,
        errorMessage: 'Enter the company name',
        required: true,
        xs: 12,
        md: 3,
      },
      {
        field: 'street',
        label: 'Address',
        type: 'text_field',
        defaultValue: street,
        errorMessage: 'Enter the address',
        required: true,
        xs: 12,
        md: 4,
      },
      {
        field: 'city',
        label: 'City',
        type: 'text_field',
        defaultValue: city,
        errorMessage: 'Enter the city',
        required: true,
        xs: 12,
        md: 2,
      },
      {
        field: 'state',
        label: 'State',
        type: 'text_field',
        defaultValue: state,
        errorMessage: 'Enter the state',
        required: true,
        xs: 12,
        md: 2,
      },
      {
        field: 'zip',
        label: 'Zip',
        type: 'text_field',
        defaultValue: zip,
        errorMessage: 'Enter the zipcode',
        required: true,
        xs: 12,
        md: 1,
      },
      {
        field: 'websiteUrl',
        label: 'Website URL',
        type: 'text_field',
        defaultValue: websiteUrl,
        xs: 12,
        sm: 12,
        md: 5,
        lg: 5,
        xl: 5
      },
      {
        field: 'google_place_id',
        label: 'Google Place ID',
        type: 'text_field',
        xs: 12,
        sm: 12,
        md: 4,
        lg: 4,
        xl: 4
      },
      {
        field: 'subscriber',
        label: 'Subscriber',
        type: 'check_box',
        xs: 12,
        sm: 12,
        md: 1,
        lg: 1,
        xl: 1
      },
    ]
  }
  setRef = (ref) => {
    this.fields = ref;
  }
  getFieldValues = () => {
    return this.fields.getFieldValues();
  }
  validateFields = () => {
    return this.fields.validateFields();
  }
  render() {
    const fields = this.getCompanyFieldInfo();
    return (
      <Wrapper>
        <Title>Company Info</Title>
        <FieldWrapper>
          <FormFields ref={this.setRef} fieldSize="big" fields={fields} />
        </FieldWrapper>
      </Wrapper>
    )
  }
}