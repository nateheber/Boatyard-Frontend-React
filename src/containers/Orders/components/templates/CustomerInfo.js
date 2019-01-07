import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div``;

const Label = styled.div`
  font-family: 'Montserrat', sans-serif !important;
  font-size: 12px;
  color: #004258;
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
`;

export default ({ id, firstName, lastName, email, phoneNumber }) => (
  <Wrapper>
    <Label>Customer Info</Label>
    <Name>
      {firstName} {lastName}
    </Name>
    <FieldValue>{phoneNumber}</FieldValue>
    <FieldValue>{email}</FieldValue>
  </Wrapper>
);
