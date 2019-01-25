import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.div`
  font-family: 'Montserrat', sans-serif !important;
  font-size: 12px;
  font-weight: bold;
  color: #004258;
  margin: 10px 0px;
  text-transform: uppercase;
`;

const Name = styled.div`
  color: #004258 !important;
  font-family: 'Source Sans', sans-serif !important;
  font-size: 14px;
`;

const FieldValue = styled.div`
  font-family: 'Source Sans Pro';
  color: #898889;
  font-size: 14px;
  margin-top: 1px;
`;

export default ({ firstName, lastName, email, phoneNumber }) => (
  <Wrapper>
    <Label>Customer Info</Label>
    <Name>
      {firstName} {lastName}
    </Name>
    <FieldValue>{phoneNumber}</FieldValue>
    <FieldValue>{email}</FieldValue>
  </Wrapper>
);
