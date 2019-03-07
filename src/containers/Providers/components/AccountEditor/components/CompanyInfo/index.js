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
    return [
      {
        field: 'address',
        label: 'Address',
        type: 'text_field',
        errorMessage: 'Enter the address',
        required: true,
        xs: 12,
        sm: 12,
        md: 5,
        lg: 5,
        xl: 5
      },
      {
        field: 'city',
        label: 'City',
        type: 'text_field',
        errorMessage: 'Enter the city',
        required: true,
        xs: 12,
        sm: 12,
        md: 4,
        lg: 4,
        xl: 4
      },
      {
        field: 'state',
        label: 'State',
        type: 'text_field',
        errorMessage: 'Enter the state',
        required: true,
        xs: 12,
        sm: 12,
        md: 2,
        lg: 2,
        xl: 2
      },
      {
        field: 'zip',
        label: 'Zip',
        type: 'text_field',
        errorMessage: 'Enter the zipcode',
        required: true,
        xs: 12,
        sm: 12,
        md: 1,
        lg: 1,
        xl: 1
      },
      {
        field: 'website_url',
        label: 'Website URL',
        type: 'text_field',
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
  render() {
    const fields = this.getCompanyFieldInfo();
    return (
      <Wrapper>
        <Title>Company Info</Title>
        <FieldWrapper>
          <FormFields fieldSize="big" fields={fields} />
        </FieldWrapper>
      </Wrapper>
    )
  }
}