import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  padding: 8px 16px;
  cursor: pointer;
  
`;

const Name = styled.span`
  color: #184961;
  overflow: hidden;
  white-space: nowrap;
  display: inline-block;
  text-overflow: ellipsis;
  font-size: 14px;
  font-family: 'Open Sans', sans-serif;
  font-weight: 600;
  letter-spacing: 0.1px;
`;

const Email = styled.span`
  color: #B9B9B9;
  font-size: 12px;
  line-height: 10px;
  font-weight: 600;
  font-style: italic;
  display: inline-block;
  font-family: 'Open Sans';
`;

const NameEmail = styled.div`
  display: flex;
  flex-direction: column;
  width: 35%;
`
const CustomerIdDiv = styled.div`
  width: 35%;
`
const PhoneNumber = styled.div`
  width: 30%;
`
export default ({ data: { label, email, firstName, lastName, phoneNumber, customerId }, selectProps: {showAdditionalFields}, innerProps: { id, ...rest } }) => (
  <Wrapper {...rest} key={id}>
    <NameEmail>
      <Name>
        {label ? label : `${firstName} ${lastName}`}
      </Name>
      <Email>{email}</Email>
    </NameEmail>

    {
      showAdditionalFields && <CustomerIdDiv><Name>{customerId}</Name></CustomerIdDiv>
    }
    {
      showAdditionalFields && <PhoneNumber><Name>{phoneNumber}</Name></PhoneNumber>
    }
  </Wrapper>
);
export const ExternalCustomerOption = ({ data: {firstName, lastName, emailAddress, customerId, homePhoneNo, }, innerProps: { id, ...rest } }) => {
  
  return (
    <Wrapper {...rest} key={id}>
      <NameEmail>
        <Name>
          {firstName} {lastName}
        </Name>
        <Email>{emailAddress}</Email>
      </NameEmail>

      <CustomerIdDiv><Name>{customerId}</Name></CustomerIdDiv>
      <PhoneNumber><Name>{homePhoneNo}</Name></PhoneNumber>
    </Wrapper>
  );
}